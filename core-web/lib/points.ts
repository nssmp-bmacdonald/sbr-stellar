import { IPoint } from '../types/point';
import { IPointBalance } from '../types/point-balance';

export async function getPointHistory(user?: string): Promise<IPoint[]> {
  const userParam = user ? `?user=${user}` : '';
  const url = `${process.env.API_CLASSIC}/points/history/${userParam}`;

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

export async function getClientPointHistory(user?: string): Promise<IPoint[]> {
  const userParam = user ? `?user=${user}` : '';
  const url = `/points/api/history/list/${userParam}`;

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

export async function getLeaderboard(): Promise<IPointBalance[]> {
  const url = `${process.env.API_CLASSIC}/points/balance/`;

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

export async function getPointBalance(user?: string): Promise<IPointBalance> {
  const url = `${process.env.API_CLASSIC}/points/balance/${user}/`;

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

export async function getClientBalanceId(
  userId?: number
): Promise<IPointBalance> {
  const url = `/points/api/balance/${userId}/`;

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
