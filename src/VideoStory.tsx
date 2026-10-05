import { useEffect, useId, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from './lib/animation'
import { videos } from './data/videos'
import { FilmStage, Cinema } from './filmStyles'

const panoramaShapes = [
  '.07,.32 .31,.23 .31,.75 .07,.84',
  '.365,.17 .635,.17 .635,.81 .365,.81',
  '.69,.23 .93,.32 .93,.84 .69,.75',
]
const panoramaAligned = [
  '.07,.18 .345,.18 .345,.82 .07,.82',
  '.363,.18 .637,.18 .637,.82 .363,.82',
  '.655,.18 .93,.18 .93,.82 .655,.82',
]
const panoramaOpen = [
  '0,0 .334,0 .334,1 0,1',
  '.333,0 .667,0 .667,1 .333,1',
  '.666,0 1,0 1,1 .666,1',
]

type Variant = 'fog' | 'pulse' | 'water' | 'panorama' | 'airplane'
export default function VideoStory({ variant = 'fog' }: { variant?: Variant }) {
  const index = variant === 'fog' ? 0 : variant === 'pulse' ? 1 : variant === 'water' ? 2 : variant === 'panorama' ? 3 : 4
  const film = videos[index]
  const clipId = `panorama-${useId().replace(/:/g, '')}`
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const cinema = useRef<HTMLVideoElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [opened, setOpened] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const nearby = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoaded(true); nearby.disconnect() }
    }, { rootMargin: '60% 0px' })
    const onscreen = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (root.current) { nearby.observe(root.current); onscreen.observe(root.current) }
    return () => { nearby.disconnect(); onscreen.disconnect() }
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return
    const sync = () => {
      if (loaded && visible && !paused && !reduced && !opened && !document.hidden) {
        void element.play().catch(() => setPlaying(false))
      } else element.pause()
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => { document.removeEventListener('visibilitychange', sync); element.pause() }
  }, [loaded, visible, paused, reduced, opened])

  useEffect(() => {
    let disposed = false
    const context = gsap.context(() => {
      if (reduced) return
      const stage = root.current!.querySelector<HTMLElement>('.film-stage')!
      const initialCup = () => {
        const cup = stage.querySelector('.pulse-u')!.getBoundingClientRect()
        const box = stage.getBoundingClientRect()
        const left = cup.left - box.left + cup.width * .3
        const top = cup.top - box.top
        const right = box.width - (cup.left - box.left + cup.width * .7)
        const bottom = box.height - (top + cup.height * 295 / 350)
        return `inset(${top}px ${right}px ${bottom}px ${left}px round 0px 0px ${cup.width * .2}px ${cup.width * .2}px)`
      }
      const initialAirWindow = () => {
        const frame = stage.querySelector('.air-measure')!.getBoundingClientRect()
        const box = stage.getBoundingClientRect()
        return `inset(${frame.top - box.top}px ${box.right - frame.right}px ${box.bottom - frame.bottom}px ${frame.left - box.left}px round ${frame.width * .44}px / ${frame.height * .28}px)`
      }
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: .55, invalidateOnRefresh: true,
      } })
      // Reveals finish at 1.0; the last 0.75 holds the full-screen composition.
      timeline.to('.film-progress i', { scaleX: 1, duration: 1.75, ease: 'none' }, 0)
      if (variant === 'airplane') {
        timeline.fromTo('.air-shade', { yPercent: 0 }, { yPercent: -105, duration: .5, ease: 'power2.inOut' }, .04)
        timeline.to('.air-frame', { opacity: 0, duration: .18 }, .58)
        timeline.fromTo('.film-window', { clipPath: initialAirWindow }, { clipPath: 'inset(0px 0px 0px 0px round 0px / 0px)', duration: .36, ease: 'power2.inOut' }, .59)
        timeline.fromTo('.film-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .2 }, .77)
      } else if (variant === 'panorama') {
        panoramaShapes.forEach((shape, i) => {
          timeline.fromTo(`.panorama-pane-${i}`, { attr: { points: shape } }, { attr: { points: panoramaAligned[i] }, duration: .33, ease: 'power2.inOut' }, .05)
          timeline.to(`.panorama-pane-${i}`, { attr: { points: panoramaOpen[i] }, duration: .38, ease: 'power3.inOut' }, .38)
        })
        timeline.fromTo('.film-window video', { scale: 1.1 }, { scale: 1, duration: .76, ease: 'power1.inOut' }, 0)
        timeline.to('.panorama-word', { yPercent: 35, opacity: 0, duration: .4 }, .18)
        timeline.to('.panorama-rims', { opacity: 0, duration: .15 }, .55)
        timeline.fromTo('.film-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .25 }, .6)
      } else if (variant === 'pulse') {
        timeline.fromTo('.film-window', { clipPath: initialCup }, { clipPath: 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)', duration: .56, ease: 'power3.inOut' }, .12)
        timeline.to('.pulse-word', { opacity: 0, duration: .28 }, .3)
        timeline.fromTo('.film-title', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: .22 }, .52)
      } else if (variant === 'fog') {
        timeline.fromTo('.cloud-near', { xPercent: -3, yPercent: 0, opacity: 1 }, { xPercent: -28, yPercent: -12, opacity: 0, duration: .7, ease: 'power1.inOut' }, 0)
        timeline.fromTo('.cloud-far', { xPercent: 3, opacity: .95 }, { xPercent: 23, opacity: 0, duration: .75 }, .05)
        timeline.to('.fog-veil', { opacity: 0, duration: .65 }, .05)
        timeline.fromTo('.film-window video', { scale: 1.06 }, { scale: 1, duration: 1, ease: 'none' }, 0)
        timeline.fromTo('.film-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .3 }, .35)
      } else {
        timeline.fromTo('.film-window', { clipPath: 'inset(33% 13% 33% 13%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .7, ease: 'power2.inOut' }, .08)
        timeline.to('.water-reflection', { opacity: 0, duration: .25 }, .22)
        timeline.to('.water-heading', { color: '#f3f1e9', duration: .45 }, .25)
        timeline.fromTo('.film-shade', { opacity: 0 }, { opacity: 1, duration: .4 }, .35)
      }
    }, root)
    // The U opening is measured from the actual letter, including after font load and resize.
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; context.revert() }
  }, [reduced, variant])

  const closeCinema = () => { cinema.current?.pause(); dialog.current?.close(); setOpened(false); opener.current?.focus({ preventScroll: true }) }
  const toggle = () => {
    if (playing) { setPaused(true); video.current?.pause() }
    else { setPaused(false); void video.current?.play().catch(() => setPlaying(false)) }
  }

  return <>
    <FilmStage ref={root} id={variant === 'fog' ? 'filmer' : `film-${variant}`} className={`variant-${variant}`} aria-labelledby={`film-title-${variant}`}>
      <div className="film-stage">
        {variant === 'panorama' && <>
          <svg className="panorama-defs" width="0" height="0" aria-hidden="true"><defs><clipPath id={clipId} clipPathUnits="objectBoundingBox">{panoramaShapes.map((points, i) => <polygon key={i} className={`panorama-pane-${i}`} points={points} />)}</clipPath></defs></svg>
          <div className="panorama-word" aria-hidden="true">UTSIKT.</div>
        </>}
        {variant === 'pulse' && <div className="pulse-word" aria-hidden="true"><span>P</span><svg className="pulse-u" viewBox="0 0 200 350"><path d="M10 0H60V245Q60 295 100 295Q140 295 140 245V0H190V245Q190 350 100 350Q10 350 10 245Z" /></svg><span>LS<span className="pulse-dot">.</span></span></div>}
        {variant === 'water' && <img className="water-reflection" src={film.poster} alt="" loading="lazy" />}
        <div className="film-window" style={variant === 'panorama' ? { clipPath: reduced ? 'none' : `url(#${clipId})` } : undefined}>
          <video ref={video} src={loaded ? film.src : undefined} poster={film.poster} muted playsInline loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label={film.line} />
          <div className="film-shade" />
          {variant === 'airplane' && <div className="air-shade" aria-hidden="true"><span className="air-handle" /></div>}
          {variant !== 'water' && <h2 className="film-title" id={`film-title-${variant}`}>{film.word.slice(0, -1)}<span>.</span></h2>}
        </div>
        {variant === 'panorama' && <svg className="panorama-rims" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">{panoramaShapes.map((points, i) => <polygon key={i} className={`panorama-pane-${i}`} points={points} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}</svg>}
        {variant === 'fog' && <div className="clouds" aria-hidden="true"><div className="fog-veil" /><img className="cloud-far" src="/textures/clouds.svg" alt="" /><img className="cloud-near" src="/textures/clouds.svg" alt="" /></div>}
        {variant === 'airplane' && <><div className="air-measure" aria-hidden="true" /><div className="air-frame" aria-hidden="true" /></>}
        {variant === 'water' && <h2 className="water-heading" id={`film-title-${variant}`}>STILLE.</h2>}
        <div className="film-controls"><button onClick={toggle} disabled={!loaded || failed} aria-label={playing ? 'Pause video' : 'Spill av video'}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span></button><button ref={opener} onClick={() => { setLoaded(true); setOpened(true); dialog.current?.showModal() }}>Se filmen <span aria-hidden="true">↗</span></button></div>
        {failed && <div className="film-bottom" role="status">Filmen kunne ikke lastes.</div>}
        <div className="film-progress" aria-hidden="true"><i /></div>
      </div>
    </FilmStage>
    <Cinema ref={dialog} onCancel={closeCinema} onClose={() => { cinema.current?.pause(); setOpened(false) }} onClick={event => { if (event.target === event.currentTarget) closeCinema() }} aria-label={film.word + ' – ' + film.line}>
      <button className="cinema-close" onClick={closeCinema} autoFocus>Lukk ×</button>
      {opened && <video ref={cinema} src={film.src} poster={film.poster} controls autoPlay playsInline />}
      <p>{film.word}</p>
    </Cinema>
  </>
}
