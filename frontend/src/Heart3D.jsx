import { useEffect, useRef } from 'react'
import * as THREE from 'three'
const V = (a) => new THREE.Vector3(...a)
export default function Heart3D({ onStage }) {
  const ref = useRef(), cb = useRef(onStage)
  cb.current = onStage
  useEffect(() => {
    const el = ref.current
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(40, 1, .1, 100)
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    r.setPixelRatio(Math.min(devicePixelRatio, 2)); el.appendChild(r.domElement)
    const fit = () => {
      const w = el.clientWidth || 300, h = el.clientHeight || 300
      r.setSize(w, h, false); cam.aspect = w / h
      cam.position.z = 10.5 * Math.max(1, 1.1 / cam.aspect); cam.updateProjectionMatrix()
    }
    fit(); const ro = new ResizeObserver(fit); ro.observe(el)
    const s = new THREE.Shape()
    s.moveTo(0,-2.2); s.bezierCurveTo(-3.4,.2,-2.4,2.6,0,1.3); s.bezierCurveTo(2.4,2.6,3.4,.2,0,-2.2)
    const geo = new THREE.ExtrudeGeometry(s,{depth:1.2,bevelEnabled:true,bevelSize:.5,bevelThickness:.6,bevelSegments:12,curveSegments:48}); geo.center()
    const mat = new THREE.MeshPhysicalMaterial({color:0x7a3a44,roughness:.3,metalness:.1,clearcoat:1,clearcoatRoughness:.15,emissive:0xff2a3d,emissiveIntensity:.1})
    const heart = new THREE.Mesh(geo, mat)
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:0x2ec4b6,wireframe:true,transparent:true,opacity:.07})); wire.scale.setScalar(1.08)
    const g = new THREE.Group(); g.add(heart, wire); scene.add(g)
    // empowerment path: orbits the heart and ends inside its glow
    const curve = new THREE.CatmullRomCurve3([[-5,-3,2],[-4.5,0,3.5],[-2,2.8,3],[1.5,3.4,2.5],[4.4,1.2,2],[4.2,-2,0],[1.5,-3.4,-2.5],[-2,-2.4,-3.5],[-3.2,.5,-1],[-1.5,1,2.4],[0,.2,2.6]].map(V))
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve,200,.03,8,false), new THREE.MeshBasicMaterial({color:0x2ec4b6,transparent:true,opacity:.45}))
    scene.add(tube)
    const nodes = [.04,.34,.64,.97].map(t => { const m = new THREE.Mesh(new THREE.SphereGeometry(.17,20,20), new THREE.MeshBasicMaterial({color:0x2c5560}))
      m.position.copy(curve.getPoint(t)); scene.add(m); return { t, m } })
    const comet = new THREE.Mesh(new THREE.SphereGeometry(.2,24,24), new THREE.MeshBasicMaterial({color:0xffffff})); scene.add(comet)
    const trail = Array.from({length:14},(_,i)=>{ const m = new THREE.Mesh(new THREE.SphereGeometry(.16*(1-i/16),12,12), new THREE.MeshBasicMaterial({color:0x3fe0cf,transparent:true,opacity:.6*(1-i/14)})); scene.add(m); return m })
    const N = 500, p = new Float32Array(N*3)
    for (let i=0;i<N;i++){const a=Math.random()*6.283,b=Math.acos(2*Math.random()-1),d=5.500+Math.random()*3; p.set([d*Math.sin(b)*Math.cos(a),d*Math.sin(b)*Math.sin(a)*.8,d*Math.cos(b)],i*3)}
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.BufferAttribute(p,3))
    const pts = new THREE.Points(pg,new THREE.PointsMaterial({color:0x2ec4b6,size:.05,transparent:true,opacity:.8})); scene.add(pts)
    scene.add(new THREE.AmbientLight(0xffffff,.6))
    const l1 = new THREE.PointLight(0xffffff,110,60); l1.position.set(5,5,9); scene.add(l1)
    const l2 = new THREE.PointLight(0x2ec4b6,70,60); l2.position.set(-6,-3,5); scene.add(l2)
    const m = {x:0,y:0}, mv = e => { m.x = e.clientX/innerWidth*2-1; m.y = e.clientY/innerHeight*2-1 }
    addEventListener('pointermove', mv)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const weak = new THREE.Color(0x7a3a44), strong = new THREE.Color(0xe0283b)
    const DUR = 10, HOLD = 2; let id, last = -1; const t0 = performance.now()
    const loop = () => {
      const t = (performance.now()-t0)/1000, c = t % (DUR+HOLD), pr = reduce ? 1 : Math.min(c/DUR,1)
      const pos = curve.getPoint(pr); comet.position.copy(pos)
      trail.forEach((tm,i)=>tm.position.copy(curve.getPoint(Math.max(0,pr-(i+1)*.008))))
      comet.visible = trail[0].visible = pr<1
      trail.forEach(x=>x.visible=pr<1)
      let st = 0; nodes.forEach((n,i)=>{ const on = pr>=n.t-.01; if(on) st = i
        n.m.material.color.set(on?0x3fe0cf:0x2c5560); n.m.scale.setScalar(on?1.4+.2*Math.sin(t*5):1) })
      if (st !== last) { last = st; cb.current && cb.current(st) }
      mat.color.lerpColors(weak, strong, pr); mat.emissiveIntensity = .1 + pr*.9
      const beat = reduce ? 1 : 1 + (.03+.05*pr)*Math.pow(Math.max(0,Math.sin(t*(2.6+1.2*pr))),6)
      g.scale.setScalar(beat)
      g.rotation.y += (m.x*.6 - g.rotation.y)*.05 + (reduce?0:.003)
      g.rotation.x += (m.y*.3 - g.rotation.x)*.05
      scene.rotation.y = Math.sin(t*.2)*.25
      pts.rotation.y = t*.04
      r.render(scene,cam); id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); ro.disconnect(); removeEventListener('pointermove',mv); r.dispose(); geo.dispose(); el.removeChild(r.domElement) }
  }, [])
  return <div ref={ref} className="heart3d" aria-hidden="true" />
}
