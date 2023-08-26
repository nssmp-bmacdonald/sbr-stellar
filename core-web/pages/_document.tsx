import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us">
        <Head>
          <link
            crossOrigin=""
            rel="preconnect dns-prefetch"
            href="https://img.sportsbookreview.com/"
          />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
          <link
            rel="preconnect dns-prefetch"
            href="https://data.sportsbookreview.com/"
          />
          <link
            rel="preload"
            href="https://img.sportsbookreview.com/fonts/SBR/SBR-icons.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://img.sportsbookreview.com/fonts/Barlow/Barlow-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://img.sportsbookreview.com/fonts/Barlow/Barlow-SemiBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://img.sportsbookreview.com/fonts/Barlow/Barlow-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://img.sportsbookreview.com/fonts/Factoria/Factoria-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://img.sportsbookreview.com/fonts/Factoria/Factoria-BoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="shortcut icon"
            href="https://img.sportsbookreview.com/images/favicons/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://img.sportsbookreview.com/images/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://img.sportsbookreview.com/images/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://img.sportsbookreview.com/images/favicons/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="https://img.sportsbookreview.com/images/favicons/site.webmanifest"
          />
          <meta name="msapplication-TileColor" content="#025bff" />
          <meta name="theme-color" content="#21252d" />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}"
                  height="0"
                  width="0"
                  style="display: none,visibility:hidden">
                </iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
