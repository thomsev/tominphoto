import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ScrollTrigger } from './lib/animation'
import { videos } from './data/videos'

function Film({ film, index }: { film: (typeof videos)[number]; index: number }) {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [load, setLoad] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { setReduced(media.matches); video.current?.pause() }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoad(true); observer.disconnect() }
    }, { rootMargin: '100% 0px' })
    if (section.current) observer.observe(section.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element || !load || reduced) return
    let target = 0
    let frame = 0
    // Only one seek at a time; seeked catches up to the latest scroll position.
    const seek = () => {
      frame = 0
      if (!element.seeking && element.readyState >= 2 && Number.isFinite(element.duration)) {
        const time = target * Math.max(0, element.duration - 0.04)
        if (Math.abs(element.currentTime - time) > 0.025) element.currentTime = time
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(seek) }
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: 'top top', end: 'bottom bottom',
      onUpdate: self => {
        target = self.progress
        if (progress.current) progress.current.style.transform = `scaleX(${target})`
        schedule()
      },
    })
    target = trigger.progress
    element.addEventListener('loadeddata', schedule)
    element.addEventListener('seeked', schedule)
    schedule()
    return () => {
      trigger.kill()
      cancelAnimationFrame(frame)
      element.removeEventListener('loadeddata', schedule)
      element.removeEventListener('seeked', schedule)
    }
  }, [load, reduced])

  return <FilmSection ref={section} id={film.id} aria-label={`Film ${index + 1}: ${film.line}`}>
    <div className="film-stage">
      <video ref={video} src={load ? film.src : undefined} poster={film.poster} muted playsInline preload={load ? 'auto' : 'none'} controls={!!reduced} onError={() => setFailed(true)} aria-label={film.line} />
      <div className="film-shade" />
      <div className="film-caption"><span>MelingMedia / I bevegelse</span><p>{film.line}</p></div>
      <h3>{film.word}</h3>
      <div className="film-bottom"><span>{failed ? 'Videoen kunne ikke lastes.' : reduced ? 'Spill av filmen i ditt tempo.' : 'Scroll. Se øyeblikket bevege seg.'}</span><span>{String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}</span><a href="#arbeider">Til bildene ↗</a></div>
      <div ref={progress} className="film-progress" />
    </div>
  </FilmSection>
}

export default function VideoStory() {
  return <section id="filmer" aria-labelledby="films-title">
    <FilmIntro><span>02 — Film</span><h2 id="films-title">I BEVEGELSE.</h2><p>Et øyeblikk på reisen. Du bestemmer tempoet.</p><a href="#arbeider">Hopp til bildearkivet ↗</a></FilmIntro>
    {videos.map((film, index) => <Film key={film.id} film={film} index={index} />)}
  </section>
}

const FilmIntro = styled.div`
  padding:80px 6vw;background:#101211;position:relative;
  >span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#b4b7ab;}
  h2{font-family:'Barlow Condensed',Impact,sans-serif;font-size:clamp(60px,11vw,160px);font-weight:500;letter-spacing:-.03em;line-height:1;margin:25px 0;}
  p{color:#b4b7ab;font-size:16px;}a{display:inline-block;margin-top:20px;font-size:13px;border-bottom:1px solid #ffffff60;padding-bottom:8px;}
`
const FilmSection = styled.article`
  height:190svh;position:relative;background:#101211;
  .film-stage{position:sticky;top:0;height:100svh;overflow:hidden;}
  video{width:100%;height:100%;object-fit:cover;display:block;}
  .film-shade{position:absolute;inset:0;background:linear-gradient(#0005,transparent 35%,#0009);pointer-events:none;}
  .film-caption{position:absolute;top:16%;left:6vw;pointer-events:none;text-shadow:0 2px 20px #0008;}
  .film-caption>span{font-size:11px;letter-spacing:.16em;text-transform:uppercase;}.film-caption p{font-size:18px;}
  h3{position:absolute;bottom:14%;left:5vw;font-family:'Barlow Condensed',Impact,sans-serif;font-size:clamp(100px,22vw,340px);font-weight:600;line-height:.8;letter-spacing:-.035em;margin:0;pointer-events:none;}
  .film-bottom{position:absolute;bottom:32px;left:6vw;right:6vw;display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:12px;}
  .film-progress{position:absolute;bottom:0;width:100%;height:3px;background:var(--accent);transform:scaleX(0);transform-origin:left;}
  @media(max-width:700px){height:170svh;.film-caption p{font-size:16px;}.film-bottom{font-size:11px;bottom:24px;}.film-bottom>span:first-child{max-width:125px;}h3{font-size:24vw;bottom:18%;}}
  @media(prefers-reduced-motion:reduce){height:100svh;.film-stage{position:relative;} .film-progress{display:none;}.film-bottom{bottom:75px;}h3{bottom:23%;}.film-shade{pointer-events:none;}}
`
