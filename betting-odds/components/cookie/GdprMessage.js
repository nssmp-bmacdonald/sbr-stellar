import { useState } from 'react';

import Link from 'next/link';

import { hasCookie, setCookie } from 'cookies-next';

const GdprMessage = () => {
  const cookies = hasCookie ("GDPR_consent");
  const [show, setShow] = useState(!cookies);

  const setConsent = () => {
      if (show) {
        setShow(false);
        // are we going to apply consent to gtag?
        // https://developers.google.com/tag-platform/devguides/consent
        setCookie('GDPR_consent', 'true')
      }
  }

  return (
    (show) ?
      <div id="consent" className="gdpr bckg-blue">
        <div className='container'>
          <p>This website uses cookies to provide, protect &amp; improve our services in
          accordance with our
          <Link href="/privacy-policy/">
              <a>Privacy Policy,</a>
          </Link>
          which details how you can modify these settings.</p>
          <button id="consent-btn" type="button" onClick={setConsent} className="btn btn-consent">ACCEPT &amp; CLOSE</button>
        </div>
      </div>
    : null
  )
}

export default GdprMessage;
