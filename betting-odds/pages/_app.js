import { useRouter } from 'next/router'

import useAdobeAnalytics from '/hooks/adobe-analytics';

import "slick-carousel/slick/slick.scss";
import '/styles/styles.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const analyticsData = {
   mainCategory: 'Commercial',
   language: 'English',
   subCategories: [],
   subVertical: '',
   vertical: 'Sport',
   country: '*GLOBAL*',
 }

   // Adobe Analytics Tracking
   useAdobeAnalytics(analyticsData)

  return ( <Component {...pageProps} key={router.asPath} /> )
}

 MyApp.getInitialProps = async (appContext) => {
    const res = appContext?.ctx.res;
    const req = appContext?.ctx.req;

    if (process.env.NODE_ENV === 'development') {
      // set HTTP headers for local/development.. prod uses maxmind
      res.setHeader('sbr-viewer-country-region', process.env.REGION_CODE)
      res.setHeader('sbr-viewer-country', process.env.COUNTRY_CODE)
    }
    else{
      var countryCode = req.headers['cloudfront-viewer-country']?.toUpperCase() ?? 'US'
      var regionCode = req.headers['cloudfront-viewer-country-region']?.toUpperCase() ?? 'NY'

      // if the user is not in a targeted region... default to CA
      if(countryCode != 'CA' && countryCode != 'US' && countryCode != 'GB'){
        countryCode = 'US'
        regionCode = 'NY'
      }

      res.setHeader('sbr-viewer-country-region', regionCode)
      res.setHeader('sbr-viewer-country', countryCode)
    }

    return {}
 }
export default MyApp
