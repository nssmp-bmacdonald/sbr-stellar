/**
 * Filter the best sports books based off user preference
 * @param bestSportsbooks - Contains all the info for each sportsbooks
 * @param userSportsbooks - Contains the name of the users preferred sp
 */
export function extractFavouriteSportsbooks(
  bestSportsbooks: any[],
  userSportsbooks?: string
) {
  const bestBooks = bestSportsbooks.filter(
    (sp) => !userSportsbooks?.includes(sp.name)
  );

  const userBooks = bestSportsbooks.filter((sp) =>
    userSportsbooks?.includes(sp.name)
  );

  return {
    userBooks,
    bestBooks,
  };
}

export function extractPersonalizationNews(
  relatedArticles: any[],
  userLeague?: string
) {
  const phrases = userLeague?.split(' ');
  const recomNews: any[] = [];
  relatedArticles.map((nws) =>
    phrases?.map((term) =>
      nws.title?.includes(term) ? recomNews.push(nws) : ''
    )
  );

  return {
    recomNews,
  };
}

export function updateSession() {
  //next-auth listens for this event to update session
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
}
