import styled from 'styled-components'

export const FilmStage = styled.section`
  position:relative;height:220svh;background:#101211;color:#f3f1e9;scroll-margin-top:0;
  .film-stage{position:sticky;top:0;height:100svh;overflow:hidden;isolation:isolate;}
  .film-window{position:absolute;inset:0;overflow:hidden;will-change:clip-path;}
  .film-window video{width:100%;height:100%;object-fit:cover;display:block;}
  .film-shade{position:absolute;inset:0;background:linear-gradient(180deg,#07100c55,transparent 32%,#07100c18 50%,#07100c99);pointer-events:none;}
  .film-title{position:absolute;left:5vw;bottom:15%;font:600 clamp(110px,23vw,350px)/.8 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.04em;margin:0;opacity:0;pointer-events:none;}
  .film-title span{color:var(--accent);font:inherit;margin:0;vertical-align:baseline;}
  .film-detail{position:absolute;left:6vw;top:23%;opacity:0;text-shadow:0 2px 25px #0005;}
  .film-detail>span{font-size:10px;letter-spacing:.17em;}.film-detail p{font-size:clamp(24px,3vw,44px);line-height:1.12;letter-spacing:-.035em;margin:18px 0;}
  .film-top,.film-bottom{position:absolute;left:6vw;right:6vw;display:flex;justify-content:space-between;align-items:center;gap:25px;font-size:11px;letter-spacing:.07em;z-index:3;}
  .film-top{top:32px;}.film-bottom{bottom:29px;}.film-signature{display:flex;align-items:center;gap:9px;}.film-signature i{width:5px;height:5px;border-radius:50%;background:currentColor;}
  .film-hint{font-size:9px;letter-spacing:.15em;text-align:right;}
  .film-controls{position:absolute;right:6vw;bottom:15%;display:flex;gap:8px;z-index:4;}
  .film-controls button{min-height:46px;min-width:46px;border:1px solid #ffffff65;background:#101211b3;backdrop-filter:blur(14px);color:#f3f1e9;border-radius:40px;padding:12px 20px;font:inherit;font-size:12px;cursor:pointer;transition:background .2s,color .2s,transform .2s;}
  .film-controls button:first-child{padding:12px;}.film-controls button:last-child span{margin-left:24px;color:var(--accent);}.film-controls button:disabled{opacity:.4;cursor:default;}
  @media(hover:hover){.film-controls button:hover{background:#eae9e2;color:#101211;transform:translateY(-2px);}.film-controls button:hover span{color:inherit;}}
  .film-progress{position:absolute;bottom:0;left:0;right:0;height:2px;background:#ffffff12;}.film-progress i{display:block;height:100%;background:var(--accent);transform:scaleX(0);transform-origin:left;}
  .pulse-word{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:.008em;font:600 37vw/.8 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.035em;color:#eae9e2;}
  .pulse-word>span{display:block;}.pulse-u{display:block;height:.70em;width:.40em;transform:translateY(.048em);fill:currentColor;flex-shrink:0;}.pulse-dot{color:var(--accent);}
  &.variant-pulse .film-window{clip-path:inset(50% 50%);}
  .clouds{position:absolute;inset:0;pointer-events:none;}.fog-veil{position:absolute;inset:0;background:#dce4e4;opacity:.62;}
  .clouds img{position:absolute;max-width:none;width:150%;height:150%;object-fit:cover;filter:drop-shadow(0 12px 24px #52697020);}
  .cloud-near{left:-34%;top:-18%;}.cloud-far{left:-10%;top:-35%;transform:rotate(175deg);}
  &.variant-fog{background:#dce3e3;.film-top{color:#263b3e;}}
  &.variant-water{background:#eae9e2;color:#1c201a;.film-window{clip-path:inset(33% 13%);}.film-detail{left:auto;right:6vw;text-align:right;top:27%;color:#f3f1e9;}.film-shade{opacity:0;}}
  .water-heading{position:absolute;left:6vw;top:9%;font:600 19vw/.8 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.04em;margin:0;pointer-events:none;}
  .water-reflection{position:absolute;top:67%;left:13%;width:74%;height:35%;object-fit:cover;transform:scaleY(-1);opacity:.13;filter:blur(3px);mask-image:linear-gradient(transparent,#000);pointer-events:none;}
  @media(max-width:700px){height:200svh;.film-top,.film-bottom{font-size:9px;}.film-top{top:25px;}.film-bottom{bottom:24px;align-items:flex-end;}.film-bottom>span:first-child{max-width:52%;line-height:1.7;}.film-hint{max-width:125px;font-size:8px;line-height:1.8;}.film-title{font-size:32vw;bottom:27%;}.film-detail{top:22%;}.film-detail>span{font-size:8px;}.film-controls{bottom:14%;}.film-controls button{padding:12px 16px;}.pulse-word{font-size:42vw;}.water-heading{top:18%;font-size:25vw;}&.variant-water .film-detail{top:40%;}.clouds img{width:200%;height:130%;}.cloud-near{left:-75%;}}
  @media(prefers-reduced-motion:reduce){height:100svh;.film-stage{position:relative;}.film-window,&.variant-pulse .film-window,&.variant-water .film-window{clip-path:none;will-change:auto;}.clouds,.pulse-word,.film-hint,.film-progress,.water-reflection{display:none;}.film-title,.film-detail{opacity:1;}&.variant-water .film-shade{opacity:1;}.water-heading,&.variant-water .film-top,&.variant-water .film-bottom,&.variant-fog .film-top{color:#f3f1e9;}}
  &.variant-panorama{background:#151513;background-image:radial-gradient(ellipse at 50% 45%,#88744e25,transparent 65%);.film-title{font-size:19vw;}.film-detail{top:21%;}.film-detail p{font-size:clamp(22px,2.7vw,40px);}.film-window{will-change:auto;}}
  .panorama-defs{position:absolute;pointer-events:none;}
  .panorama-rims{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;color:#fff3dc70;filter:drop-shadow(0 5px 18px #000a);}
  .panorama-word{position:absolute;left:50%;bottom:7%;transform:translateX(-50%);font:600 25vw/.8 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.045em;white-space:nowrap;color:transparent;-webkit-text-stroke:1px #e1d1ab30;pointer-events:none;}
  .panorama-intro{position:absolute;left:7%;top:11%;pointer-events:none;}.panorama-intro>span{font-size:9px;letter-spacing:.18em;color:#c5baa5;}.panorama-intro p{font-size:clamp(26px,3.6vw,58px);letter-spacing:-.05em;line-height:1.15;margin:13px 0;}.panorama-intro em{font-family:Georgia,serif;font-weight:400;color:#d6c5a4;}
  .panorama-notes{position:absolute;left:7%;right:7%;bottom:12%;display:flex;justify-content:space-between;pointer-events:none;font-size:9px;letter-spacing:.13em;color:#b6ae9d;}
  @media(max-width:700px){.panorama-intro{top:8%;left:7%;}.panorama-intro>span{font-size:7px;}.panorama-intro p{font-size:24px;margin-top:8px;}.panorama-word{font-size:29vw;bottom:23%;}.panorama-notes{display:none;}&.variant-panorama .film-title{font-size:24vw;bottom:28%;}}
  @media(prefers-reduced-motion:reduce){.panorama-rims,.panorama-word,.panorama-intro,.panorama-notes{display:none;}}

`

export const Cinema = styled.dialog`
  border:0;margin:0;padding:75px 5vw 30px;background:#101211;color:#f3f1e9;width:100vw;height:100dvh;max-width:none;max-height:none;
  &::backdrop{background:#101211f5;}&[open]{display:flex;flex-direction:column;justify-content:center;}
  video{width:100%;max-height:78vh;min-height:0;object-fit:contain;}
  .cinema-close{position:absolute;right:5vw;top:20px;background:none;color:inherit;border:1px solid #ffffff70;border-radius:30px;padding:12px 20px;font:inherit;cursor:pointer;}
  p{display:flex;justify-content:space-between;gap:20px;font-size:16px;}p span{font-size:12px;color:#b4b7ab;}
  @media(max-width:700px){p{flex-direction:column;gap:6px;}p span{font-size:11px;}}
`
