export async function getOddsViews(gameIds, viewType, oddsScope) {
    var queryStr = gameIds.join("&ids=");

    return await fetch(`${process.env.WEB_API}/odds?viewType=${viewType}&oddsScope=${oddsScope}&ids=${queryStr}`)
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