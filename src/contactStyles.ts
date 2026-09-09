import styled from 'styled-components'

export const ContactPage = styled.main`
min-height:100svh;display:grid;grid-template-columns:46% 54%;background:#eae9e2;color:#20251e;
>nav {position:absolute;} >nav .nav-links{color:#20251e;} >nav .booking-link{border-color:#20251e55;}
@media(max-width:850px){display:block;>nav .nav-links{color:#fff;} >nav .booking-link{border-color:#ffffff80;}}
`
export const ContactVisual = styled.aside`
position:sticky;top:0;height:100svh;min-height:650px;overflow:hidden;color:#fffced;background:#30382f;
>img{position:absolute;width:100%;height:100%;object-fit:cover;object-position:65% 50%;}
.visual-shade{position:absolute;inset:0;background:linear-gradient(#0006,transparent 35%,#0009);}
.visual-copy{position:absolute;bottom:5vh;left:4vw;right:4vw;}.visual-copy>span{font-size:12px;letter-spacing:.12em;}
.visual-copy p{font-family:'Barlow Condensed',Impact,sans-serif;font-size:clamp(70px,8.2vw,145px);line-height:.91;letter-spacing:-.025em;font-weight:600;margin:30px 0 40px;}
em{font-style:normal;color:var(--accent);}.visual-bottom{display:flex;align-items:center;justify-content:space-between;gap:24px;font-size:14px;line-height:1.6;}
@media(max-width:850px){position:relative;height:70svh;min-height:520px;max-height:760px;.visual-copy{left:6vw;right:6vw;bottom:30px;}.visual-copy p{font-size:clamp(68px,15vw,115px);margin:20px 0;}.visual-copy>span{font-size:11px;}.visual-bottom{font-size:12px;}}
`
export const ContactContent = styled.section`
padding:160px 6vw 30px;min-width:0;scroll-margin-top:0;
.eyebrow{font-size:12px;letter-spacing:.13em;}
h1{font-size:clamp(45px,4.8vw,80px);line-height:1.06;letter-spacing:-.055em;font-weight:500;margin:27px 0;}
h1 em{font-family:Georgia,serif;font-weight:400;}
.lead,.thank-you>p{font-size:16px;line-height:1.8;color:#53594f;max-width:470px;margin-bottom:40px;}
.thank-you{padding-top:60px;min-height:65svh;}.success-icon{display:inline-flex;background:#d8ff62;padding:16px;border-radius:50%;}
.thank-you .small{font-size:14px;}.return-link{display:inline-flex;align-items:center;gap:24px;border-bottom:1px solid;padding-bottom:10px;}
@media(max-width:1100px){padding-right:4vw;padding-left:4vw;}
@media(max-width:850px){padding:60px 6vw 25px;h1{font-size:clamp(45px,10vw,70px);}.thank-you{padding-top:30px;}}
`
export const BookingForm = styled.form`
fieldset{padding:0;margin:0 0 34px;border:0;min-width:0;}
legend{font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:20px;font-weight:600;}
.choices{display:flex;gap:8px;flex-wrap:wrap;}.choices label{position:relative;cursor:pointer;}
.choices input{position:absolute;opacity:0;width:1px;height:1px;}
.choices span{display:block;border:1px solid #20251e50;border-radius:30px;font-size:14px;padding:12px 18px;transition:background .2s,color .2s;}
.choices input:checked+span{background:#20251e;color:#fffced;border-color:#20251e;}.choices input:focus-visible+span{outline:2px solid #20251e;outline-offset:4px;}
.fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:25px 20px;}.fields.single{grid-template-columns:1fr;}
.fields label{display:block;font-size:14px;line-height:1.5;min-width:0;}.fields label>span{color:#53594f;}.fields small{color:#63675f;font-size:12px;}
.fields input,.fields textarea{display:block;width:100%;min-width:0;border:0;border-bottom:1px solid #20251e50;border-radius:0;background:transparent;color:#20251e;font:16px 'DM Sans',sans-serif;padding:13px 0;outline-offset:4px;transition:border-color .2s;}
.fields textarea{resize:vertical;min-height:120px;}.fields input:focus,.fields textarea:focus{outline:2px solid #455637;outline-offset:5px;border-color:transparent;}
.fields input::placeholder,.fields textarea::placeholder{color:#757a70;opacity:1;}.fields input[type=date]{min-height:50px;appearance:none;}
.form-note{font-size:12px;color:#63675f;line-height:1.7;margin:0 0 24px;max-width:410px;}
>button{display:flex;justify-content:space-between;align-items:center;gap:20px;width:100%;padding:22px 25px;border:1px solid #20251e;background:#20251e;color:#fffced;font-size:16px;transition:background .2s,color .2s;}
>button:hover{background:#d8ff62;color:#20251e;}>button:disabled{opacity:.65;cursor:wait;}>button:focus-visible{outline-color:#20251e;}
.preview-note{font-size:14px;line-height:1.6;border-left:2px solid #455637;padding-left:15px;}
@media(max-width:450px){.fields{grid-template-columns:1fr;}.choices span{padding:11px 15px;}}
`
export const ContactFooter = styled.footer`
display:flex;justify-content:space-between;border-top:1px solid #20251e30;margin-top:65px;padding-top:24px;font-size:12px;color:#63675f;
`
