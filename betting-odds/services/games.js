export async function getGameIds(league, startDate, pastFallback, returnGameIds = false) {
    var sDate = new Date(startDate);
    var date = `${sDate.getFullYear()}-${sDate.getMonth()+1}-${sDate.getDate()}`;
    var day = 'future';
    if (returnGameIds)
        day = 'exact';
    else if (pastFallback)
        day = 'any';

    var url = `${process.env.WEB_API}/games/ids?league=${league.toUpperCase()}&startDate=${date}&day=${day}`;
    return await fetch(url)
         .then(res => {
             if(!res.ok) {
                 return res.text().then(text => { throw new Error(text) })
             }
             else {
                 return res.json();
             }
         })
         .catch(err => {
             return null;
         });
}

export async function getGameViews(gameIds) {
    var queryStr = gameIds.join("&ids=");

    return await fetch(`${process.env.WEB_API}/games?ids=${queryStr}`).then(res => {
             if(!res.ok) {
                 return res.text().then(text => { throw new Error(text) })
             }
             else {
                 return res.json();
             }
         })
         .catch(err => {
             return null;
         });
}

export async function getGameView(gameId) {
    return await fetch(`${process.env.WEB_API}/games/${gameId}`).then(res => {
             if(!res.ok) {
                 return res.text().then(text => { throw new Error(text) })
             }
             else {
                 return res.json();
             }
         })
         .catch(err => {
             return null;
         });
}