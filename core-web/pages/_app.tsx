import { NextPageContext } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo, OrganizationJsonLd } from 'next-seo';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import '../🎨styles/sass/global.scss';

import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  props: IAppProps;
}

interface IAppProps {
  gtm: string;
  maxLength: string;
}

function MyApp({ Component, pageProps, props }: AppPropsWithLayout) {
  const router = useRouter();
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const organizationLd: any = {
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://www.sportsbookreview.com/#logo',
      inLanguage: 'en-US',
      url: 'https://img.sportsbookreview.com/images/sbr-logo.svg',
      contentUrl: 'https://img.sportsbookreview.com/images/sbr-logo.svg',
      width: 369,
      height: 145,
      caption: 'Sportsbook Review',
    },
  };

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(
        <>
          <DefaultSeo
            titleTemplate="%s | Sportsbook Review"
            defaultTitle="Sportsbook Review"
            openGraph={{
              type: 'website',
              url: `https://www.sportsbookreview.com${router.pathname}`,
              siteName: 'Sportsbook Review',
              images: [
                {
                  url: 'https://img.sportsbookreview.com/images/sbr-open-graph.png',
                  alt: 'The SBR logo with the bull at the top of the SBR letters',
                },
              ],
            }}
            twitter={{
              site: '@SBRreview',
              cardType: 'summary_large_image',
            }}
          />
          <OrganizationJsonLd
            type="Organization"
            name="Sportsbook Review"
            url="https://www.sportsbookreview.com/"
            sameAs={[
              'https://www.facebook.com/Sportsbookreview.SBR/',
              'https://www.instagram.com/sbrsportspicks',
              'https://www.youtube.com/user/SBRForum',
              'https://en.wikipedia.org/wiki/SBR_Odds',
              'https://twitter.com/SBRreview',
            ]}
            {...organizationLd}
          />
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${props.gtm}','${props.maxLength}');
        `}
          </Script>
          <Script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/39514430.js"
          ></Script>
          <Component {...pageProps} />
        </>,
        pageProps.menu,
        pageProps.region
      )}
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (
  Component: NextPageWithLayout,
  ctx: NextPageContext
) => {
  const props: IAppProps = {
    gtm: process.env.GTM_ID ?? '',
    maxLength: process.env.GTM_DataLayerMaxLength ?? '',
  };

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, props };
};

export default MyApp;
