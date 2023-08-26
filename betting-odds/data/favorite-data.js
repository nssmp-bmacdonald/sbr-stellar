import { getCookie, setCookies } from 'cookies-next';

export function getFavoriteData(options) {
    var favoriteCookies = getCookie('favorites', options);
    return favoriteCookies ? JSON.parse(favoriteCookies) : [];
}

export function getFavoriteLeagueAndDates(options) {
    return getFavoriteData(options)
            .map(item => {
                return {
                    league: item.league,
                    date: item.date,
                };
            })
            .filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.league === value.league && t.date === value.date
                )
            ))
            .sort((a,b) => (new Date(b.date) - new Date(a.date)));
}

export function getFavoriteGameIds(league, date, options) {
    return getFavoriteData(options)
            .filter(item => item.league === league && item.date === date)
            .map(item => item.eventId);
}

export function getFavoriteByGameIds(gameIds, options) {
    return getFavoriteData(options)
            .filter(item => gameIds.includes(item.eventId));
}

export function isFavorite(gameId) {
    var favoriteArr = getFavoriteData();
    return favoriteArr.some(item => item.eventId === gameId);
}

export function saveFavorite(gameId, league, date) {
    var favoriteArr = getFavoriteData();
    favoriteArr.push({eventId: gameId, league: league, date: date.split('T')[0]});
    setCookies('favorites', favoriteArr);
}

export function deleteFavorite(gameId) {
    var favoriteArr = getFavoriteData().filter(item => item.eventId != gameId);
    setCookies('favorites', favoriteArr);
}