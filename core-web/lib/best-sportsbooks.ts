export async function getBestSportsbooks(): Promise<any | null> {
  try {
    const res = await fetch(
      `${process.env.API}/betting-articles/best-sportsbooks?regionSlug=us&SponsoredSportsbooks=true&Sportsbooks=true&RelatedArticles=true&RegionSlug=us`
    );
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return await res.json();
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
