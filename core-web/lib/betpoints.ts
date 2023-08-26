import { IncomingMessage } from 'node:http';
import { IBetPoints } from '../types/betpoints';
import { getCountry, getCountryRegion } from './region';

export async function getBetPoints(
  res: IncomingMessage,
  slug: string
): Promise<IBetPoints> {
  const url = `${process.env.API}/betpoints/${slug}/`;

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
