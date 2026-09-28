import styled from 'styled-components'

// Keep the reveal distance unchanged, followed by 90svh (75svh mobile) of viewing room.
export const FilmStage = styled.section`
  position:relative;height:310svh;background:#101211;color:#f3f1e9;scroll-margin-top:0;
  .film-stage{position:sticky;top:0;height:100svh;overflow:hidden;isolation:isolate;}
  .film-window{position:absolute;inset:0;overflow:hidden;will-change:clip-path;}
  .film-window video{width:100%;height:100%;object-fit:cover;display:block;}
  .film-shade{position:absolute;inset:0;background:linear-gradient(180deg,#030a1277,transparent 35%,#030a1220 53%,#030a12b3);pointer-events:none;}
  .film-title{position:absolute;left:5vw;bottom:15%;font:600 clamp(110px,23vw,350px)/.8 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.04em;margin:0;opacity:0;pointer-events:none;}
  .film-title span{color:var(--accent);font:inherit;margin:0;vertical-align:baseline;}
  .film-detail{position:absolute;left:6vw;top:23%;opacity:0;text-shadow:0 2px 4px #000c,0 4px 20px #000a;isolation:isolate;}
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
  @media(max-width:700px){height:275svh;.film-top,.film-bottom{font-size:9px;}.film-top{top:25px;}.film-bottom{bottom:24px;align-items:flex-end;}.film-bottom>span:first-child{max-width:52%;line-height:1.7;}.film-hint{max-width:125px;font-size:8px;line-height:1.8;}.film-title{font-size:32vw;bottom:27%;}.film-detail{top:22%;}.film-detail>span{font-size:8px;}.film-controls{bottom:14%;}.film-controls button{padding:12px 16px;}.pulse-word{font-size:42vw;}.water-heading{top:18%;font-size:25vw;}&.variant-water .film-detail{top:40%;}.clouds img{width:200%;height:130%;}.cloud-near{left:-75%;}}
  @media(prefers-reduced-motion:reduce){height:100svh;.film-stage{position:relative;}.film-window,&.variant-pulse .film-window,&.variant-water .film-window{clip-path:none;will-change:auto;}.clouds,.pulse-word,.film-hint,.film-progress,.water-reflection{display:none;}.film-title,.film-detail{opacity:1;}&.variant-water .film-shade{opacity:1;}.water-heading,&.variant-water .film-top,&.variant-water .film-bottom,&.variant-fog .film-top{color:#f3f1e9;}}
  &.variant-panorama{background:#11171b;background-image:radial-gradient(ellipse at 50% 45%,#567e9520,transparent 65%);.film-title{font-size:19vw;}.film-detail{top:21%;}.film-detail p{font-size:clamp(22px,2.7vw,40px);}.film-window{will-change:auto;}}
  .panorama-defs{position:absolute;pointer-events:none;}
  .panorama-rims{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;color:#e1f1fa70;filter:drop-shadow(0 5px 18px #000a);}
  .panorama-word{position:absolute;left:50%;bottom:7%;transform:translateX(-50%);font:600 25vw/.8 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.045em;white-space:nowrap;color:transparent;-webkit-text-stroke:1px #dbe8ee30;pointer-events:none;}
  .panorama-intro{position:absolute;left:7%;top:11%;pointer-events:none;}.panorama-intro>span{font-size:9px;letter-spacing:.18em;color:#b9c9d0;}.panorama-intro p{font-size:clamp(26px,3.6vw,58px);letter-spacing:-.05em;line-height:1.15;margin:13px 0;}.panorama-intro em{font-family:Georgia,serif;font-weight:400;color:#d5e4eb;}
  .panorama-notes{position:absolute;left:7%;right:7%;bottom:12%;display:flex;justify-content:space-between;pointer-events:none;font-size:9px;letter-spacing:.13em;color:#b4c4cb;}
  @media(max-width:700px){.panorama-intro{top:8%;left:7%;}.panorama-intro>span{font-size:7px;}.panorama-intro p{font-size:24px;margin-top:8px;}.panorama-word{font-size:29vw;bottom:23%;}.panorama-notes{display:none;}&.variant-panorama .film-title{font-size:24vw;bottom:28%;}}
  @media(prefers-reduced-motion:reduce){.panorama-rims,.panorama-word,.panorama-intro,.panorama-notes{display:none;}}

  .film-title{text-shadow:0 2px 4px #0008,0 8px 32px #0006;}
  .film-detail::before{content:'';position:absolute;inset:-22px -30px;z-index:-1;background:radial-gradient(ellipse,#030a1260,transparent 72%);pointer-events:none;}
  .film-top,.film-bottom{text-shadow:0 1px 3px #000c,0 2px 12px #0009;}
  &.variant-fog .film-top,&.variant-water .film-top,&.variant-water .film-bottom{text-shadow:0 1px 4px #0005;}
  .water-heading{text-shadow:0 3px 16px #0004;}
  &.variant-airplane{background:radial-gradient(ellipse at 50% 40%,#fff 0%,#dbe1e4 56%,#aebbc3 100%);color:#25323a;.film-window{clip-path:inset(50% 50%);}.film-detail,.film-title{color:#f3f1e9;}.film-top,.film-bottom{text-shadow:none;}.film-controls{bottom:12%;}.film-title{font-size:19vw;}}
  .air-measure,.air-frame{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:clamp(260px,34vw,470px);height:min(65svh,620px);border-radius:44% / 28%;pointer-events:none;}
  .air-measure{visibility:hidden;}.air-frame{box-shadow:inset 0 3px 12px #030b1266,0 0 0 3px #71828b,0 0 0 12px #c5cdd1,0 0 0 14px #f7fafb,0 0 0 26px #e5e9eb,0 15px 38px 30px #5d707633;}
  .air-shade{position:absolute;inset:0 0 20%;background:linear-gradient(100deg,#bcc8cd,#e9edef 36%,#f4f6f7 50%,#d5dee2 78%,#a6b7c0);box-shadow:0 8px 18px #0009;border-radius:0 0 12% 12%;z-index:1;}
  .air-handle{position:absolute;bottom:7%;left:50%;transform:translateX(-50%);width:76px;height:13px;border-radius:20px;background:linear-gradient(#8d9fa9,#d1dbe0);box-shadow:inset 0 2px 4px #3b4e5b99,0 2px 1px #fff;}
  .air-shade-label{position:absolute;top:52%;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:.2em;color:#657983;white-space:nowrap;}
  .air-cabin-copy{position:absolute;left:6vw;top:30%;pointer-events:none;}.air-cabin-copy>span{font-size:9px;letter-spacing:.14em;}.air-cabin-copy p{font-size:clamp(24px,3.3vw,48px);line-height:1.1;letter-spacing:-.04em;margin:14px 0;}.air-cabin-copy em{display:block;font-family:Georgia,serif;font-weight:400;}
  @media(max-width:700px){.air-measure,.air-frame{width:64vw;min-width:220px;height:53svh;top:46%;}.air-cabin-copy{top:9%;left:6vw;}.air-cabin-copy p{font-size:25px;margin:8px 0;}.air-cabin-copy em{display:inline;}.air-cabin-copy>span{font-size:7px;}&.variant-airplane .film-title{font-size:24vw;bottom:27%;}.air-shade{bottom:27%;}.air-shade-label{font-size:8px;top:51%;}.air-handle{width:60px;height:11px;}}
  @media(prefers-reduced-motion:reduce){.air-shade,.air-frame,.air-measure,.air-cabin-copy{display:none;}&.variant-airplane .film-window{clip-path:none!important;}&.variant-airplane .film-top,&.variant-airplane .film-bottom{color:#f3f1e9;text-shadow:0 2px 5px #000;}}

`

export const Cinema = styled.dialog`
  border:0;margin:0;padding:75px 5vw 30px;background:#101211;color:#f3f1e9;width:100vw;height:100dvh;max-width:none;max-height:none;
  &::backdrop{background:#101211f5;}&[open]{display:flex;flex-direction:column;justify-content:center;}
  video{width:100%;max-height:78vh;min-height:0;object-fit:contain;}
  .cinema-close{position:absolute;right:5vw;top:20px;background:none;color:inherit;border:1px solid #ffffff70;border-radius:30px;padding:12px 20px;font:inherit;cursor:pointer;}
  p{display:flex;justify-content:space-between;gap:20px;font-size:16px;}p span{font-size:12px;color:#b4b7ab;}
  @media(max-width:700px){p{flex-direction:column;gap:6px;}p span{font-size:11px;}}
`
