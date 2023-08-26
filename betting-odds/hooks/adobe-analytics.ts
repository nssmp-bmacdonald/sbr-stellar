import { useEffect, useState } from 'react'

const configureAnalytics = (
  aaConnector: AAConnector,
  {
    mainCategory,
    language,
    subCategories,
    subVertical,
    vertical,
    country,
  }: AnalyticsData
) => {
  const pageTags = {
    sbr_category: mainCategory,
    sbr_subcategories: (subCategories) ? subCategories : [],
    sbr_vertical: vertical,
    sbr_subvertical: subVertical,
    sbr_trivertical: '',
    sbr_country: country,
    sbr_language: language,
  };

  const userTags = {
    mobile: '',
    tablet: '',
    continentCode: '',
    countryCode: '',
    regionCode: '',
    cityCode: '',
  }

  window.aaTags = {
    ...pageTags,
  }

  return new aaConnector.default(SiteConfig)
};

const useAdobeAnalytics = (data: any) => {

  const [aaConnector, setAAConnector] = useState<AAConnector>()

  useEffect(() => {
     (async () =>
      setAAConnector(await import('@data-tribe/aa-connector'))
    )()
  }, [])

  useEffect(() => {
    (aaConnector) && configureAnalytics(aaConnector, data)
  }, [aaConnector])
};

export default useAdobeAnalytics;

interface AAConnector {
  [x: string]: any;
  emitPageView: () => void
}

type AnalyticsData = {
  mainCategory: string,
  language: string,
  subCategories: [],
  subVertical: string,
  vertical: string,
  country: string,
}

// Hard coding siteConfig as this data does not currently change based on template.
const SiteConfig = {
  externalScript: process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_URL,
  globalVariableName: 'aaTags',
  pageTagLocalNames: [
    'sbr_language',
    'sbr_country',
    'sbr_category',
    'sbr_subcategories',
    'sbr_vertical',
    'sbr_subvertical',
    'sbr_trivertical',
    'sbr_toplist',
    'sbr_primary_sub_category',
    'sbr_equivalent_page',
    'sbr_toplist_data_ids',
    'sbr_partner_data_ids',
    'sbr_variant',
    'sbr_state',
    'sbr_platform',
    'sbr_event',
    'sbr_site_section'
  ],
  userTagLocalNames: [
    'sbr_is_mobile',
    'sbr_is_tablet',
    'sbr_user_continent',
    'sbr_user_country',
    'sbr_user_state',
    'sbr_user_city'
  ],
  transactionIdSiteNumber: 4200,
  fullFunnelQueryParamName: 'sbrid',
  outboundLinkFolder: 'c.sportsbookreview.com',
  linkContainerDatasetName: "aatracker",              // link data-attribute name
  breadcrumbsSelector: ".breadcrumb-item",
  searchParam: " ",
  campaignParam: "",                                  // actual value to be provided by tracking team
  webVitalsVisibilityPercent: 10,
  linkContainersArray: [
      {
          linkContainerName: "footer",
          linkContainerSelectors: ["footer"]
      },
      {
          linkContainerName: "header",
          linkContainerSelectors: ["header"]
      }
  ],
  // Optional
  // linkContainerDatasetName: 'aaTracker',
  // breadcrumbsSelector: '.breadcrumb-item',
  // searchParam: 'q',
  // webVitalsVisibilityPercent: 10,
  debug: false,
}
