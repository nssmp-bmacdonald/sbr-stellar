export interface IBestSportsbook {
  affiliateLink: string;
  summary: {
    content: string;
    header: string;
  };
  rating: {
    grade: string;
    gradeIcon: string;
    gradeLogo: string;
  };
  prosCons: {
    cons: string[];
    pros: string[];
  };
  faq: {
    header: string;
    questions: IFaq[];
  };
}
