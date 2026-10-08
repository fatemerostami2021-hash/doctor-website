import { useEffect, useRef } from 'react'
import * as THREE from 'three'
export default function Heart3D() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current, w = () => el.clientWidth, h = () => el.clientHeight
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(40, w()/h(), .1, 100); cam.position.z = 9
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(w(), h()); el.appendChild(r.domElement)
    const s = new THREE.Shape()
    s.moveTo(0,-2.2); s.bezierCurveTo(-3.4,.2,-2.4,2.6,0,1.3); s.bezierCurveTo(2.4,2.6,3.4,.2,0,-2.2)
    const geo = new THREE.ExtrudeGeometry(s,{depth:1.2,bevelEnabled:true,bevelSize:.5,bevelThickness:.6,bevelSegments:12,curveSegments:48})
    geo.center()
    const heart = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({color:0xd62839,roughness:.25,metalness:.1,clearcoat:1,clearcoatRoughness:.15,emissive:0x3a0610}))
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:0x2ec4b6,wireframe:true,transparent:true,opacity:.07}))
    wire.scale.setScalar(1.08)
    const g = new THREE.Group(); g.add(heart, wire); scene.add(g)
    const N = 700, p = new Float32Array(N*3)
    for (let i=0;i<N;i++){const a=Math.random()*6.283,b=Math.acos(2*Math.random()-1),d=4+Math.random()*3
      p.set([d*Math.sin(b)*Math.cos(a),d*Math.sin(b)*Math.sin(a)*.8,d*Math.cos(b)],i*3)}
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.BufferAttribute(p,3))
    const pts = new THREE.Points(pg,new THREE.PointsMaterial({color:0x2ec4b6,size:.05,transparent:true,opacity:.8}))
    scene.add(pts)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4.2,.015,8,160),new THREE.MeshBasicMaterial({color:0x2ec4b6,transparent:true,opacity:.5}))
    ring.rotation.x = 1.2; scene.add(ring)
    scene.add(new THREE.AmbientLight(0xffffff,.6))
    const l1 = new THREE.PointLight(0xffffff,90,50); l1.position.set(5,5,8); scene.add(l1)
    const l2 = new THREE.PointLight(0x2ec4b6,60,50); l2.position.set(-6,-3,4); scene.add(l2)
    const m = {x:0,y:0}
    const mv = e => { m.x = e.clientX/innerWidth*2-1; m.y = e.clientY/innerHeight*2-1 }
    addEventListener('pointermove', mv)
    const rs = () => { cam.aspect = w()/h(); cam.updateProjectionMatrix(); r.setSize(w(),h()) }
    addEventListener('resize', rs)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let id, t0 = performance.now()
    const loop = () => {
      const t = (performance.now()-t0)/1000
      const beat = reduce ? 1 : 1 + .06*Math.pow(Math.max(0,Math.sin(t*3.2)),6) + .03*Math.pow(Math.max(0,Math.sin(t*3.2-.9)),6)
      g.scale.setScalar(beat)
      g.rotation.y += (m.x*.7 - g.rotation.y)*.05 + (reduce?0:.004)
      g.rotation.x += (m.y*.35 - g.rotation.x)*.05
      pts.rotation.y = t*.05; ring.rotation.z = t*.2
      r.render(scene,cam); id = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(id); removeEventListener('pointermove',mv); removeEventListener('resize',rs)
      r.dispose(); geo.dispose(); el.removeChild(r.domElement) }
  }, [])
  return <div ref={ref} className="heart3d" aria-hidden="true" />
}
