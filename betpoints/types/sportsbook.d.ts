import { IFaq } from './faq';
import { IImage } from './layout/image';

export interface IPromo {
  headline: string;
  startDate?: Date;
  endDate?: Date;
  content: string;
  terms: string;
  claim: string;
  buttonText: string;
}

export interface IProvider {
  type: string;
  name: string;
  providerLogo: string;
  category: string;
  maxDeposit: string;
  processTime: string;
  providerValue: string;
  minimumDeposit: string;
  fees: string;
}

export interface ICurrency {
  slug: string;
  shortName: string;
  symbol: string;
}

export interface ISportsbook {
  name: string;
  slug: string;
  text: string;
  affiliateLink: string;
  reviewBody: string;
  dateUpdated: Date | undefined;
  updatedDate: Date | undefined;
  region: {
    id: number;
    name: string;
    slug: string;
    country: {
      id: number;
      name: string;
      slug: string;
      xCountryCode: string;
      flag: string;
    };
    xRegionCode: string;
  };
  playbook: {
    headline: string;
    playNowButton: string;
    reviewButton: string;
    reviewLink: string;
    tagLine: string;
    logo?: string;
    icon?: string;
    intro?: string;
    bonusIntro?: string;
    featuresFilter?: string[];
    signupBonusFilter?: string[];
    gamblingOptionsFilter?: string[];
    iconMonochrome?: IImage;
    iconColor?: IImage;
  };
  banking: {
    header: string;
    depositHeader: string;
    depositContent: string;
    withdrawalHeader: string;
    withdrawalContent: string;
    providers: IProvider[];
    currencies: ICurrency[];
  };
  bonus: {
    header: string;
    content: string;
    primaryPromo: IPromo;
    additionalPromos: IPromo[];
  };
  faq: {
    header: string;
    questions: IFaq[];
  };
  info: {
    phone: string;
    address: string;
    email: string;
    url: string;
    onlineSince: string;
    serviceHours: string;
    liveChat: string;
  };
  prosCons: {
    pros: string[];
    cons: string[];
  };
  rating: {
    grade: string;
    gradeLogo: string;
    gradeIcon: string;
  };
  summary: {
    content: string;
    contentJson: any;
    header: string;
  };
  author: {
    firstName: string;
    lastName: string;
    slug: string;
  };
}
