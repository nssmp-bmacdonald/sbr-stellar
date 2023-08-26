export interface IRegion {
  id: number;
  name: string;
  parentRegion: IRegion;
  slug: string;
  country: ICountry;
  xRegionName: string;
  xRegionCode: string;
  disclaimer: string;
  authority: string;
}

interface ICountry {
  slug: string;
  xCountryCode: string;
}
