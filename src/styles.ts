import styled from 'styled-components'

export const Nav = styled.nav`
position:absolute;z-index:20;top:0;left:0;width:100%;display:flex;align-items:center;justify-content:space-between;padding:32px 4vw;color:white;
.brand{font-size:30px;font-weight:600;letter-spacing:-1.6px;line-height:.85;display:flex;flex-direction:column;}
.brand span{font-size:15px;letter-spacing:-.3px;margin-top:5px;}
.nav-note{font-size:13px;letter-spacing:.03em;}
.archive-link{font-size:14px;} .archive-link span{margin-left:12px;font-size:12px;opacity:.7;}
@media(max-width:700px){padding:25px 6vw;.nav-note{display:none}.brand{font-size:26px}.archive-link span{margin-left:5px;}}
`
export const Story = styled.section<{ $count:number }>`
position:relative;height:${p=>Math.max(1,p.$count)*125}svh;background:#151919;
@media(prefers-reduced-motion:reduce){height:auto;}
`
export const Stage = styled.div`
position:sticky;top:0;height:100svh;overflow:hidden;
.stage-bottom{position:absolute;bottom:32px;left:4vw;right:4vw;z-index:10;display:flex;justify-content:space-between;align-items:center;font-size:12px;letter-spacing:.02em;}
.stage-bottom a{display:flex;align-items:center;gap:35px;}.stage-bottom a span{font-size:24px;}
.story-progress{position:absolute;bottom:0;left:0;width:100%;height:3px;background:var(--accent);z-index:12;transform:scaleX(0);transform-origin:left;}
@media(max-width:700px){.stage-bottom{left:6vw;right:6vw;bottom:24px;}.edition{display:none;}.stage-bottom>a{gap:12px;}.stage-bottom>span:first-child{max-width:100px;line-height:1.6;}}
@media(prefers-reduced-motion:reduce){height:auto;position:relative;overflow:visible;.stage-bottom,.story-progress{display:none;}}
`
export const Panel = styled.article<{ $index:number;$position:string;$mobile:string }>`
position:absolute;inset:0;z-index:${p=>p.$index+1};overflow:hidden;background:#151919;
.scene-image{width:100%;height:100%;object-fit:cover;object-position:${p=>p.$position};display:block;}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,#0006,transparent 28%,#0001 45%,#0009 100%);}
.scene-caption{position:absolute;left:4vw;top:27%;text-shadow:0 2px 20px #0008;}
.scene-caption>span{text-transform:uppercase;letter-spacing:.17em;font-size:12px;}.scene-caption p{font-size:18px;font-weight:400;margin:15px 0;}
.scene-type{position:absolute;left:3.3vw;bottom:12%;}h1,h2{font-family:'Barlow Condensed','Arial Narrow',Impact,sans-serif;font-size:clamp(100px,23vw,380px);font-weight:600;letter-spacing:-.035em;line-height:.8;margin:0;color:#fffced;}
.scene-index{position:absolute;right:4vw;bottom:18%;font-size:16px;}.scene-index span{opacity:.5;font-size:12px;margin-left:10px;}
@media(max-width:700px){.scene-image{object-position:${p=>p.$mobile};}.scene-caption{left:6vw;top:24%;max-width:75%;}.scene-caption p{font-size:16px;}.scene-type{left:5vw;bottom:19%;}h1,h2{font-size:23vw;}.scene-index{right:6vw;bottom:13%;}}
@media(prefers-reduced-motion:reduce){position:relative;height:100svh;clip-path:none!important;transform:none!important;.scene-type,.scene-caption{opacity:1!important;transform:none!important;}.scene-image{transform:none!important;}}
`
export const Rail = styled.nav`
position:absolute;z-index:10;right:4vw;top:40%;display:flex;flex-direction:column;gap:8px;
button{background:none;border:0;display:flex;align-items:center;justify-content:flex-end;gap:13px;height:32px;min-width:50px;padding:4px 0;}
span{font-size:11px;opacity:0;transition:opacity .3s;}i{display:block;width:18px;height:2px;background:#ffffff70;transition:width .4s,background .4s;}
button[aria-current=step] span,button:hover span,button:focus-visible span{opacity:1;}button[aria-current=step] i{width:40px;background:var(--accent);}
@media(max-width:700px){right:6vw;top:36%;button[aria-current=step] i{width:25px;}i{width:12px;}}
@media(prefers-reduced-motion:reduce){display:none;}
`
export const Intro = styled.section`
padding:120px 6vw 90px;background:#eae9e2;color:#1c201a;
.section-tag{font-size:12px;text-transform:uppercase;letter-spacing:.12em;}
.intro-copy{margin:70px 0 55px;}.intro-copy>div{overflow:hidden;padding-bottom:8px;}
.intro-copy p{font-size:clamp(35px,6.2vw,100px);letter-spacing:-.055em;line-height:1.1;margin:0;}
em{font-family:Georgia,serif;font-weight:400;}
.intro-foot{display:flex;align-items:center;justify-content:space-between;gap:25px;}.asterisk{font-size:70px;}
.intro-foot p{font-size:16px;line-height:1.8;max-width:420px;}.intro-foot a{font-size:14px;border-bottom:1px solid #1c201a;padding-bottom:8px;}
@media(max-width:700px){padding:75px 6vw;.intro-copy{margin:45px 0 30px;}.intro-foot{flex-wrap:wrap;}.asterisk{display:none;}.intro-foot p{font-size:14px;}}
`
export const Archive = styled.section`
padding:100px 5vw 140px;background:#101211;
.archive-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:65px;}
.section-tag{font-size:12px;color:#b4b7ab;text-transform:uppercase;letter-spacing:.12em;}
h2{font-family:'Barlow Condensed',Impact,sans-serif;font-size:clamp(65px,11vw,170px);letter-spacing:-.03em;font-weight:500;line-height:1;margin:22px 0 0;}h2 span{font:14px 'DM Sans',sans-serif;vertical-align:top;display:inline-block;margin:15px;}
.layout-button{background:none;border:1px solid #ffffff50;border-radius:50px;padding:14px 20px;font-size:13px;white-space:nowrap;}
@media(max-width:700px){padding:75px 6vw;.archive-heading{align-items:flex-start;flex-direction:column;margin-bottom:35px;}h2 span{margin:6px;font-size:12px;}}
`
export const Grid = styled.div<{ $compact:boolean }>`
display:grid;grid-template-columns:repeat(${p=>p.$compact?3:12},minmax(0,1fr));column-gap:3vw;row-gap:${p=>p.$compact?'35px':'110px'};align-items:start;
@media(max-width:700px){grid-template-columns:repeat(${p=>p.$compact?2:1},minmax(0,1fr));column-gap:15px;row-gap:40px;}
`
export const Tile = styled.article<{ $compact:boolean;$portrait:boolean }>`
min-width:0;grid-column:${p=>p.$compact?'auto':'span 7'};
${p=>!p.$compact && '&:nth-child(4n+2){grid-column:9 / span 4;margin-top:150px;}&:nth-child(4n+3){grid-column:1 / span 4;}&:nth-child(4n+4){grid-column:6 / span 7;margin-top:120px;}'}
.photo-button{border:0;padding:0;background:#212521;width:100%;display:block;position:relative;overflow:hidden;text-align:left;}
img{width:100%;height:auto;aspect-ratio:${p=>p.$compact?'4/5':p.$portrait?'3/4':'4/3'};object-fit:cover;display:block;transition:filter .4s;}
.photo-button:hover img{filter:brightness(1.07);}
.open-mark{position:absolute;right:15px;bottom:15px;display:grid;place-content:center;width:45px;height:45px;border-radius:50%;background:#eae9e2;color:#101211;font-size:22px;opacity:0;transform:translateY(8px);transition:.3s;}
.photo-button:hover .open-mark,.photo-button:focus-visible .open-mark{opacity:1;transform:none;}
.photo-caption{display:flex;justify-content:space-between;gap:12px;font-size:12px;color:#b4b7ab;padding:17px 0;line-height:1.5;}.photo-caption>span:last-child{white-space:nowrap;opacity:.6;}
@media(max-width:700px){&&{grid-column:auto;margin-top:0;}.photo-caption>span:last-child{display:none;}.photo-caption{font-size:12px;}.open-mark{opacity:1;width:32px;height:32px;font-size:18px;}}
`
export const Footer = styled.footer`
height:100svh;min-height:600px;position:relative;overflow:hidden;
.closing-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 55%;}
.closing-shade{position:absolute;inset:0;background:linear-gradient(#0003,#0004 40%,#000b);}
.closing-copy{position:absolute;left:5vw;top:18%;}.closing-copy>span{font-size:14px;}
.closing-copy p{font-family:'Barlow Condensed',Impact,sans-serif;font-size:clamp(90px,15vw,230px);font-weight:600;line-height:.85;letter-spacing:-.035em;margin:40px 0;}.closing-copy em{font-style:normal;color:var(--accent);}
.closing-copy>a{font-size:14px;border-bottom:1px solid #fff8;padding-bottom:8px;}
.footer-line{position:absolute;bottom:30px;left:5vw;right:5vw;border-top:1px solid #fff5;padding-top:25px;display:flex;justify-content:space-between;align-items:center;font-size:12px;}
.brand{font-size:24px;letter-spacing:-1px;}.brand span{font-size:14px;margin-left:5px;}
`
export const Viewer = styled.dialog`
border:0;background:#0a0c0bf5;color:#fff;width:100vw;height:100dvh;max-width:none;max-height:none;padding:70px 5vw 90px;margin:0;
&::backdrop{background:#000d;} &[open]{display:flex;align-items:center;justify-content:center;}
>img{max-width:100%;max-height:100%;object-fit:contain;}
button{background:transparent;border:1px solid #ffffff50;padding:12px 20px;border-radius:30px;}
.close{position:absolute;top:20px;right:5vw;font-size:14px;}
.viewer-bottom{position:absolute;bottom:22px;left:5vw;right:5vw;display:flex;align-items:center;justify-content:space-between;gap:15px;}
.viewer-bottom>span{text-align:center;font-size:14px;}.viewer-bottom small{display:block;color:#aaa;font-size:12px;margin-top:6px;}
`

