import { ILoyaltyTransfer } from '../types/loyalty-transfer';

export async function getLoyaltyBalance(
  jwtToken?: string
): Promise<ILoyaltyTransfer> {
  const url = '/points/api/loyalty-balance/';

  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
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

export async function sendLoyaltyCredit(
  amount: number,
  jwtToken?: string
): Promise<ILoyaltyTransfer | string> {
  const url = `/points/api/loyalty-credit/${amount}/`;

  return await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return null;
    });
}

export async function sendLoyaltyDebit(
  amount: number,
  jwtToken?: string
): Promise<ILoyaltyTransfer | string> {
  const url = `/points/api/loyalty-debit/${amount}/`;

  return await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return null;
    });
}
