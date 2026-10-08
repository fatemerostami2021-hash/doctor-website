import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Heart3D from './Heart3D.jsx'
import Logo from './Logo.jsx'
const LANGS = [['fa','فارسی'],['en','English'],['ar','العربية'],['tr','Türkçe']]
const ICONS = ['M3 12h4l3-8 4 16 3-8h4','M12 21s-8-5.5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.500-8 11-8 11z','M6 3v6a4 4 0 008 0V3M10 13v3a4 4 0 008 0v-2','M3 17l5-6 4 3 5-8 4 5']

function Tilt({ children, className }) {
  const ref = useRef()
  const mv = e => { const b = ref.current.getBoundingClientRect()
    const x = (e.clientX-b.left)/b.width-.5, y = (e.clientY-b.top)/b.height-.5
    ref.current.style.transform = `perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(8px)` }
  const lv = () => ref.current.style.transform = ''
  return <div ref={ref} className={className} onMouseMove={mv} onMouseLeave={lv}>{children}</div>
}

export default function App() {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(false), [stage, setStage] = useState(0), [sent, setSent] = useState(false)
  const lng = i18n.resolvedLanguage || 'en'
  useEffect(() => {
    document.documentElement.dir = ['fa','ar'].includes(lng) ? 'rtl' : 'ltr'
    document.documentElement.lang = lng
  }, [lng])
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  const ids = ['home','about','services','contact']
  const submit = e => { e.preventDefault(); setSent(true) }
  return (<>
    <header className="nav">
      <a className="logo" href="#home"><Logo /><span className="brand"><b>{t('brand')}</b><small>{t('tag')}</small></span></a>
      <nav>{t('nav').map((n,i)=><a key={i} href={'#'+ids[i]}>{n}</a>)}</nav>
      <div className="tools">
        <select value={lng} onChange={e=>i18n.changeLanguage(e.target.value)} aria-label="Language">
          {LANGS.map(([c,n])=><option key={c} value={c}>{n}</option>)}</select>
        <button className="ghost" onClick={()=>setDark(!dark)} aria-label="Theme">{dark?'☀':'☾'}</button>
        <a className="btn" href="#contact">{t('book')}</a>
      </div>
    </header>
    <main>
      <section id="home" className="hero">
        <div className="hero-text">
          <h1>{t('h1')}<span>{t('h2')}</span></h1>
          <p>{t('desc')}</p>
          <div className="row"><a className="btn big" href="#contact">{t('book')}</a><a className="btn big line" href="#services">{t('svc')}</a></div>
        </div>
        <div className="visual">
          <Heart3D onStage={setStage} />
          <ol className="path" style={{'--p':(stage+1)/4}}>{t('stages').map((n,i)=><li key={i} className={i<=stage?'on':''}>{n}</li>)}</ol>
        </div>
      </section>
      <section className="stats">{t('stats').map(([n,l],i)=><div key={i}><b>{n}</b><span>{l}</span></div>)}</section>
      <section id="services" className="sec">
        <h2>{t('svc')}</h2><p className="sub">{t('svcSub')}</p>
        <div className="grid">{t('s').map(([a,b],i)=>
          <Tilt key={i} className="card"><svg viewBox="0 0 24 24"><path d={ICONS[i]}/></svg><h3>{a}</h3><p>{b}</p></Tilt>)}</div>
      </section>
      <section id="about" className="sec about">
        <h2>{t('about')}</h2>
        <ol className="edu">{t('edu').map((d,i)=><li key={i}>{d}</li>)}</ol>
      </section>
      <section id="contact" className="sec contact">
        <div><h2>{t('contact')}</h2><p className="sub">{t('cSub')}</p>
          <dl><dt>{t('info.0')}</dt><dd>{t('addr')}</dd><dt>{t('info.1')}</dt><dd>{t('hrs')}</dd></dl></div>
        {sent ? <p className="ok">{t('ok')}</p> :
        <form onSubmit={submit}>
          <input required placeholder={t('name')} aria-label={t('name')}/>
          <input required type="tel" placeholder={t('phone')} aria-label={t('phone')}/>
          <input type="date" aria-label={t('date')}/>
          <select aria-label={t('svcSel')}>{t('s').map(([a],i)=><option key={i}>{a}</option>)}</select>
          <button className="btn big">{t('send')}</button>
        </form>}
      </section>
    </main>
    <footer>© {new Date().getFullYear()} · {t('rights')}</footer>
  </>)
}
