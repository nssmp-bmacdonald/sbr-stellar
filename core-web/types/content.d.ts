export interface IContent {
  dateCreated: string;
  dateUpdated: string;
  urlPath: {
    path: string;
    name: string;
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  robots: string;
  canonical: string;
  openGraphImage: IImage;
  featureImage: IImage;
  content: string;
  faq: {
    header: string;
    questions: IFaq[];
  };
}
