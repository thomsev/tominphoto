import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import { useGSAP } from '@gsap/react'
import { gsap, Flip, ScrollTrigger } from './lib/animation'
import { photos, chapters, type Photo } from './data/photos'
import { Nav, Story, Stage, Panel, Rail, Intro, Archive, Grid, Tile, Footer, Viewer } from './styles'

const pad = (n:number) => String(n).padStart(2,'0')
export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const story = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const flip = useRef<gsap.core.Timeline | null>(null)
  const [active, setActive] = useState(0)
  const [compact, setCompact] = useState(false)
  const [selected, setSelected] = useState<Photo | null>(null)
  const reduced = useReducedMotion()

  const { contextSafe } = useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel')
      if (panels.length) {
        gsap.set(panels.slice(1), { clipPath:'inset(100% 0% 0% 0%)' })
        const timeline = gsap.timeline({scrollTrigger:{
          trigger:story.current, start:'top top', end:'bottom bottom', scrub:1,
          onUpdate:self => setActive(Math.max(0, Math.min(panels.length - 1, Math.floor(self.progress * (panels.length + .5) - .5)))),
        }})
        panels.forEach((panel,i) => {
          const photo = panel.querySelector('.scene-image')
          const type = panel.querySelector('.scene-type')
          const caption = panel.querySelector('.scene-caption')
          if (i > 0) {
            timeline.to(panel,{clipPath:'inset(0% 0% 0% 0%)',duration:1,ease:'power2.inOut'},i)
            timeline.fromTo(type,{yPercent:70,opacity:0},{yPercent:0,opacity:1,duration:.7},i+.25)
            timeline.fromTo(caption,{opacity:0,y:20},{opacity:1,y:0,duration:.5},i+.45)
          }
          timeline.fromTo(photo,{scale:1.14,yPercent:-3},{scale:1,yPercent:3,duration:1.8,ease:'none'},Math.max(0,i-.3))
          if(i < panels.length-1) timeline.to(type,{yPercent:-25,opacity:0,duration:.65},i+.9)
        })
        timeline.to('.story-progress',{scaleX:1,duration:timeline.duration(),ease:'none'},0)
      }
      gsap.from('.intro-line',{yPercent:110,stagger:.12,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.intro-copy',start:'top 85%',once:true}})
      gsap.utils.toArray<HTMLElement>('.tile-inner').forEach(tile => {
        gsap.from(tile,{y:70,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:tile,start:'top 95%',once:true}})
      })
      gsap.fromTo('.closing-image',{scale:1.15,yPercent:-6},{scale:1,yPercent:6,ease:'none',scrollTrigger:{trigger:'.closing',start:'top bottom',end:'bottom top',scrub:true}})
    })
    return () => media.revert()
  },{scope:root})

  useEffect(() => {
    if (selected) {
      if (!dialog.current?.open) dialog.current?.showModal()
    } else dialog.current?.close()
  },[selected])

  const changeLayout = () => {
    if (!grid.current) return
    flip.current?.progress(1)
    const state = Flip.getState(grid.current.children)
    flushSync(()=>setCompact(v=>!v))
    if (!reduced) flip.current = Flip.from(state,{duration:.8,ease:'power3.inOut',stagger:.02,onComplete:()=>ScrollTrigger.refresh()})
    else ScrollTrigger.refresh()
  }
  const goTo = (index:number) => {
    if(reduced) {
      document.querySelectorAll('.story-panel')[index]?.scrollIntoView()
      setActive(index)
      return
    }
    if(!story.current) return
    const top = window.scrollY + story.current.getBoundingClientRect().top
    const range = story.current.offsetHeight - window.innerHeight
    // Each wipe lasts one unit; move past its reveal to show the selected frame.
    const units = chapters.length + .5
    window.scrollTo({top:top + range * (index === 0 ? 0 : (index + .85)/units),behavior:'smooth'})
  }
  const step = (direction:number) => {
    const index = photos.findIndex(p=>p.id===selected?.id)
    setSelected(photos[(index + direction + photos.length)%photos.length])
  }

  return <div ref={root}>
    <a className="skip" href="#arbeider">Hopp til bildene</a>
    <Nav><a className="brand" href="#top" aria-label="Tomin Photo, forsiden">tomin<span>photo®</span></a><span className="nav-note">Et blikk. En historie.</span><a className="archive-link" href="#arbeider">Bildearkiv <span>({pad(photos.length)}) ↗</span></a></Nav>
    <main>
      <Story id="top" ref={story} $count={chapters.length}>
        <Stage ref={stage}>
          {chapters.map((chapter,i)=><Panel className="story-panel" key={chapter.number} $index={i} $position={chapter.position} $mobile={chapter.mobile}>
            <img className="scene-image" src={chapter.photo.full} srcSet={chapter.photo.src+' 1600w, '+chapter.photo.full+' 2560w'} sizes="100vw" alt={chapter.photo.alt} fetchPriority={i===0?'high':'auto'} loading={i<2?'eager':'lazy'} />
            <div className="shade" />
            <div className="scene-caption"><span>{chapter.eyebrow}</span><p>{chapter.line}</p></div>
            <div className="scene-type">{i===0?<h1>{chapter.word}</h1>:<h2>{chapter.word}</h2>}</div>
            <span className="scene-index">{pad(i+1)} <span>/ {pad(chapters.length)}</span></span>
          </Panel>)}
          <Rail aria-label="Bildekapitler">{chapters.map((c,i)=><button key={c.number} aria-label={'Vis kapittel '+pad(i+1)+': '+c.line} aria-current={active===i?'step':undefined} onClick={()=>goTo(i)}><span>{pad(i+1)}</span><i /></button>)}</Rail>
          <div className="stage-bottom"><span>Fotografi som kjennes.</span><a href="#introduksjon">Scroll for å utforske <span>↓</span></a><span className="edition">Utvalgte øyeblikk / {new Date().getFullYear()}</span></div>
          <div className="story-progress" />
        </Stage>
      </Story>
      <Intro id="introduksjon">
        <span className="section-tag">01 — Et blikk på verden</span>
        <div className="intro-copy"><div><p className="intro-line">Noen bilder ser du.</p></div><div><p className="intro-line">Andre <em>kjenner du.</em></p></div></div>
        <div className="intro-foot"><span className="asterisk" aria-hidden="true">✳</span><p>Fra hav som river til gater som lever.<br/>Mennesker, steder og de små øyeblikkene imellom.</p><a href="#arbeider">Se hele samlingen ↘</a></div>
      </Intro>
      <Archive id="arbeider">
        <div className="archive-heading"><div><span className="section-tag">02 — Bildearkivet</span><h2>ØYEBLIKK<span>({pad(photos.length)})</span></h2></div><button className="layout-button" aria-pressed={compact} onClick={()=>contextSafe(changeLayout)()}>{compact?'↗ Redaksjonell':'⊞ Kontaktark'}</button></div>
        <Grid ref={grid} $compact={compact}>
          {photos.map((photo,i)=><Tile key={photo.id} $compact={compact} $portrait={photo.height>photo.width}>
            <div className="tile-inner"><motion.button className="photo-button" onClick={()=>setSelected(photo)} aria-label={'Åpne '+photo.title} whileHover={reduced?undefined:{scale:.985}} transition={{duration:.35}}>
              <img src={photo.thumb} srcSet={photo.thumb+' 720w, '+photo.src+' 1600w'} sizes={compact?'(max-width: 700px) 50vw, 30vw':'(max-width: 700px) 90vw, 65vw'} alt={photo.alt} loading="lazy" width={photo.width} height={photo.height} />
              <span className="open-mark" aria-hidden="true">↗</span>
            </motion.button><div className="photo-caption"><span>{pad(i+1)} / {photo.title}</span><span>Se fotografi ↗</span></div></div>
          </Tile>)}
        </Grid>
      </Archive>
      <Footer className="closing">
        {photos.find(p=>p.number===21) && <img className="closing-image" src={photos.find(p=>p.number===21)!.full} alt="" loading="lazy"/>}
        <div className="closing-shade"/><div className="closing-copy"><span>Det neste øyeblikket venter.</span><p>SE LITT<br/><em>LENGER.</em></p><a href="#top">Tilbake til begynnelsen ↑</a></div>
        <div className="footer-line"><a className="brand" href="#top">tomin<span>photo®</span></a><span>© {new Date().getFullYear()} Tomin Photo</span></div>
      </Footer>
    </main>
    <Viewer ref={dialog} onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)setSelected(null)}} onKeyDown={event=>{if(event.key==='ArrowRight')step(1);if(event.key==='ArrowLeft')step(-1)}} aria-label={selected?.title ?? 'Fotografivisning'}>
      <button className="close" onClick={()=>setSelected(null)} autoFocus>Lukk ✕</button>
      {selected && <><img src={selected.full} alt={selected.alt}/><div className="viewer-bottom"><button onClick={()=>step(-1)} aria-label="Forrige fotografi">←</button><span>{selected.title} <small>{pad(photos.indexOf(selected)+1)} / {pad(photos.length)}</small></span><button onClick={()=>step(1)} aria-label="Neste fotografi">→</button></div></>}
    </Viewer>
  </div>
}

