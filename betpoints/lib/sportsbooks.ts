import { IncomingMessage } from 'node:http';
import { ISportsbook } from '../types/sportsbook';
import { getCountry, getCountryRegion } from './region';

export async function getSportsbooks(
  res: IncomingMessage,
  slug: string,
  urlPath?: string
): Promise<ISportsbook[]> {
  const url = `${process.env.API}/betting-articles${slug}${
    urlPath ? `/${urlPath}` : ''
  }/sportsbooks/`;

  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'sbr-viewer-country': getCountry(res),
      'sbr-viewer-country-region': getCountryRegion(res),
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
