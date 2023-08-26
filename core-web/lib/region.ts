import { IncomingMessage } from 'node:http';
import { IRegion } from '../types/region';

/**
 * Pulls in the country
 */
export function getCountry(req: IncomingMessage): string {
  const countryHeader = req.headers['cloudfront-viewer-country'];

  let country = process.env.COUNTRY_CODE ?? 'US';
  if (countryHeader != undefined) {
    if (Array.isArray(countryHeader)) {
      country = countryHeader[0];
    } else {
      country = countryHeader;
    }
  }

  return country;
}

/**
 * Pulls in the country region
 */
export function getCountryRegion(req: IncomingMessage): string {
  const countryRegionHeader = req.headers['cloudfront-viewer-country-region'];

  let region = process.env.REGION_CODE ?? 'NY';
  if (countryRegionHeader != undefined) {
    if (Array.isArray(countryRegionHeader)) {
      region = countryRegionHeader[0];
    } else {
      region = countryRegionHeader;
    }
  }

  return region;
}

export async function getRegion(req: IncomingMessage): Promise<IRegion> {
  const url = `${process.env.API}/regions/${getCountryRegion(req)}/${getCountry(
    req
  )}`;

  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .catch(() => {
      return null;
    });
}
