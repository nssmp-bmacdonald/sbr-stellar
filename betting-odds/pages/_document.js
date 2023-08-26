import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GTM_ID, GTM_DataLayerMaxLength } from '/constants/seo';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us">
        <Head>
          <link crossOrigin="" rel="preconnect dns-prefetch" href="https://img.sportsbookreview.com"/>
          <script defer dangerouslySetInnerHTML={{ __html: `function createDL(a){var b=[],c=[];return b.push=function(){return this.length>=a?!!c[1]&&(this.splice(c[0],c[1]),c.splice(1,1),this.push.apply(this,arguments)):(this.constructor.prototype.push.apply(this,arguments),c.push(arguments.length),this)},b}(function(i,a,b,c,d,e){i[c]=i[c]||createDL(e),i[c].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var j=a.getElementsByTagName(b)[0],e=a.createElement(b),g="dataLayer"==c?"":"&l="+c;e.async=!0,e.src="https://www.googletagmanager.com/gtm.js?id="+d+g,j.parentNode.insertBefore(e,j)})(window,document,"script","dataLayer","${GTM_ID}","${GTM_DataLayerMaxLength}");`,}}></script>
          <link rel="shortcut icon" href="https://img.sportsbookreview.com/images/favicons/favicon.ico" />
          <link
            href="https://img.sportsbookreview.com/fonts/OpenSans/OpenSans-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            href="https://img.sportsbookreview.com/fonts/OpenSans/OpenSans-Bold.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            href="https://img.sportsbookreview.com/fonts/OpenSans/OpenSans_Condensed-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            href="https://img.sportsbookreview.com/fonts/OpenSans/OpenSans_Condensed-Bold.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                  height="0"
                  width="0"
                  style="display: none,visibility:hidden">
                </iframe>`
            }}>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
