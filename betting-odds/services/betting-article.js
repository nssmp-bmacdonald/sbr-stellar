export async function getBettingArticle(slug, path, league, res) {
    var regionCode = res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();
    var countryCode = res.getHeader(process.env.COUNTRY_CODE_HEADER).toLowerCase();

    let url = `${process.env.WEB_API}/betting-articles/${slug.toLowerCase()}?${path ? `&urlpath=${path.toLowerCase()}` : ''}${league ? `&league=${league.toLowerCase()}` : ''}`;
    let options = {
		headers: {
			'sbr-viewer-country-region': regionCode,
			'sbr-viewer-country': countryCode,
		}
    }

    return await fetch(url, options)
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
