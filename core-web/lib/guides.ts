export interface IHowToBet {
  slug: string;
  intro: string;
  sidebar: {
    bricks: IBrick[];
  };
}

export interface IBrick {
  desc: string;
  excerpt: string;
  code: string;
}

export async function getGuide(): Promise<IHowToBet | null> {
  try {
    const res = await fetch('/api/hubspot/guide');

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return await res.json();
  } catch (err: any) {
    return null;
  }
}
