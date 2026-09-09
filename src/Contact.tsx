import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Icon } from './Icon'
import { photos } from './data/photos'
import { Nav } from './styles'
import { ContactPage, ContactVisual, ContactContent, BookingForm, ContactFooter } from './contactStyles'

export default function Contact({ thanks = false }: { thanks?: boolean }) {
  const reduced = useReducedMotion()
  const [preview, setPreview] = useState(false)
  const [sending, setSending] = useState(false)
  const photo = photos.find(p => p.number === 7)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Vite cannot receive Netlify Forms submissions. Never claim a local send succeeded.
    if (import.meta.env.DEV || ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
      event.preventDefault()
      setPreview(true)
      return
    }
    setSending(true)
  }

  return <ContactPage>
    <a className="skip" href="#kontakt">Hopp til kontaktskjemaet</a>
    <Nav aria-label="Hovedmeny">
      <a className="brand" href="/" aria-label="Tomin Photo, forsiden">tomin<span>photo®</span></a>
      <div className="nav-links"><a className="archive-link" href="/#arbeider">Bildearkiv</a><a className="booking-link" href="/kontakt/" aria-current="page">Book fotograf <Icon size={16} /></a></div>
    </Nav>
    <ContactVisual>
      {photo && <img src={photo.src} srcSet={`${photo.src} 1600w, ${photo.full} 2560w`} sizes="(max-width: 850px) 100vw, 46vw" alt={photo.alt} fetchPriority="high" />}
      <div className="visual-shade" />
      <div className="visual-copy"><span>TOMIN PHOTO / LA OSS SKAPE NOE</span><p>DITT<br/>NESTE<br/><em>ØYEBLIKK.</em></p><div className="visual-bottom"><span>De beste bildene begynner<br/>med en god samtale.</span><Icon name="downRight" size={32}/></div></div>
    </ContactVisual>
    <ContactContent id="kontakt">
      <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: 'easeOut' }}>
        <span className="eyebrow">KONTAKT / BOOK FOTOGRAF</span>
        {thanks ? <div className="thank-you"><span className="success-icon"><Icon name="check" size={32}/></span><h1>Takk for<br/><em>historien din.</em></h1><p>Forespørselen er sendt. Vi tar kontakt på e-post for å snakke videre om fotograferingen.</p><p className="small">Dette er en forespørsel. Dato og oppdrag avtales sammen.</p><a className="return-link" href="/#arbeider">Tilbake til bildene <Icon /></a></div> : <>
          <h1>Hva har du<br/><em>i tankene?</em></h1>
          <p className="lead">Et menneske. En stor dag. En idé som fortjener å bli sett. Fortell litt om det du ønsker å forevige.</p>
          <BookingForm name="booking" method="POST" action="/takk/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={onSubmit} aria-busy={sending}>
            <input type="hidden" name="form-name" value="booking" />
            <p hidden><label>La dette feltet stå tomt<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            <fieldset className="type-picker"><legend>01 / Hva vil du fotografere?</legend><div className="choices">{['Portrett', 'Bryllup', 'Bedrift', 'Noe annet'].map((type,i)=><label key={type}><input type="radio" name="session-type" value={type} required defaultChecked={i===0}/><span>{type}</span></label>)}</div></fieldset>
            <fieldset><legend>02 / Litt om deg</legend><div className="fields">
              <label>Navn <span>*</span><input name="name" autoComplete="name" placeholder="Ditt navn" required maxLength={120}/></label>
              <label>E-post <span>*</span><input name="email" type="email" autoComplete="email" placeholder="deg@eksempel.no" required maxLength={254}/></label>
              <label>Telefon <small>(valgfritt)</small><input name="phone" type="tel" autoComplete="tel" placeholder="Telefonnummer" maxLength={40}/></label>
              <label>Sted <small>(valgfritt)</small><input name="location" autoComplete="address-level2" placeholder="Hvor ser du for deg?" maxLength={160}/></label>
            </div></fieldset>
            <fieldset><legend>03 / Øyeblikket ditt</legend><div className="fields single">
              <label>Ønsket dato <small>(valgfritt)</small><input name="date" type="date"/></label>
              <label>Fortell om det du ser for deg <span>*</span><textarea name="message" placeholder="Anledning, stemning, ideer … Det er helt lov å ikke ha alt klart ennå." rows={4} required minLength={10} maxLength={5000}/></label>
            </div></fieldset>
            <p className="form-note">En uforpliktende forespørsel. Ingen booking før vi har avtalt detaljene. Felter merket * må fylles ut.</p>
            <button type="submit" disabled={sending}>{sending ? 'Sender forespørsel …' : 'La oss lage noe fint'}<Icon name="diagonal" size={24}/></button>
            {preview && <p role="status" className="preview-note">Lokal forhåndsvisning: Ingenting er sendt. Innsending blir tilgjengelig på Netlify når skjemamottak er aktivert.</p>}
          </BookingForm>
        </>}
        <ContactFooter><a href="/">Tomin Photo</a><span>© {new Date().getFullYear()}</span></ContactFooter>
      </motion.div>
    </ContactContent>
  </ContactPage>
}
