export async function getSportsbooks(res, league) {

    var regionCode = res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();
    var countryCode = res.getHeader(process.env.COUNTRY_CODE_HEADER).toLowerCase();

    let url = `${process.env.WEB_API}/sportsbooks?contentSlug=betting-odds&condensed=true`

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
