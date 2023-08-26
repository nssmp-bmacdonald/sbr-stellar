import * as urls from '/constants/seo';
import { allLeagueData, getLeagueData } from '/data/parameter-data';
import { sanitizeHTML } from '/helpers/string-helpers';

const schema = urls.SCHEMA_ORG;

export const breadcrumbObject = (league, req, pathname, leagueInfo, gameInfo) => {
    // in production or UAT set the host to 'www.sportsbookreview.com' in order to avoid linking back to Cloudfront
    let hostString = req.headers.host;
    if (process.env.NODE_ENV === 'production') hostString = 'www.sportsbookreview.com';
    const host = hostString;
    const proto = req.headers["x-forwarded-proto"] || req.connection.encrypted ? "https://" : "http://";

    if (pathname[pathname.length-1] === '/') pathname = pathname.substring(0, pathname.length-1);
    const urlPaths = pathname.split('?')[0].split('/');
    const itemType = "BreadcrumbList";
    const sizePath = urlPaths.length;

    // used for contructing the URLs in the structured data - 'compare' is used on the today page in place of the league
    var leagueSlug = '';
    if (urlPaths[2] !== undefined && urlPaths[2] === "compare") {
        leagueSlug = "compare";
    }
    else if (leagueInfo !== undefined) {
        leagueSlug = leagueInfo.parameter;
    }

    const breadCrumbList = {
        "@context": `${schema}`,
        "@type": `${itemType}`,
        "itemListElement": []
    }
    breadCrumbList.itemListElement.push({
       "@type": "ListItem",
       "name": "Home",
       "item": `${urls.SBR_SITE}`,
       "position": 1
    });

    for (let i=1; sizePath > i; i++ ) {
      if (i === 1) {
        if ( urls.ODDS_URL.indexOf(urlPaths[i]) > -1  ) {
            (sizePath - 1 === i ) ?
                breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": "Odds", "position": i+1 })
            :
                breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": "Odds", "item": proto+host+urls.ODDS_URL, "position": i+1 })

        }else if ( urls.SCORES_URL.indexOf(urlPaths[i].split('/')) > -1  ) {

            if(sizePath - 1 === i){
                breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": league + " Scores", "position": i+1 })
            }
            else if(sizePath -1 != i && pathname.includes('matchups')){
                breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": league + " Scores", "position": i+1 })
            }
            else{
                breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": league + " Scores", "item": proto+host+urls.SCORES_URL+leagueInfo.parameter+urls.MATCHUPS_URL,
                "position": i+1 })
            }
        }
      }else if (i === 2) {
          if ( getLeagueData( urlPaths[i]) != null ) {
                if(sizePath -1 === i){
                    breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": league.replace("-", " ") +' Odds', "position": i+1 })
                }
                else if(sizePath -1 != i && pathname.includes('scores')){
                    ''
                }
                else{
                    breadCrumbList.itemListElement.push({ "@type": "ListItem", "name": league.replace("-", " ") +' Odds', "item": breadCrumbList.itemListElement[i-1].item+leagueInfo.parameter+'/',
                    "position": i+1 })
                }
          }else if ( urlPaths[i] === "user" && urlPaths[i+1] === "favorites") {
            breadCrumbList.itemListElement.push({
                "@type": "ListItem",
                "name": 'Favorites',
                "position": i+1
            })
          }
      }else if (i === 3) {
          if ( urlPaths[i] === "futures"  ) {
            breadCrumbList.itemListElement.push({
                "@type": "ListItem",
                "name": `${league} Futures`,
                "position": i+1
            })
          }else if ( urlPaths[i] === "consensus"  ) {
            breadCrumbList.itemListElement.push({
                "@type": "ListItem",
                "name": `${league} Consensus`,
                "position": i+1
            })
          }else if (urlPaths[i] === "matchup" && gameInfo !== undefined) {
            breadCrumbList.itemListElement.push({
                "@type": "ListItem",
                "name": gameInfo + ' Matchup',
                "position": i
            })
          }else if (urlPaths[i] === "line-history" && gameInfo !== undefined ) {
            breadCrumbList.itemListElement.push({
                "@type": "ListItem",
                "name": gameInfo + ' Line History',
                "position": i+1
            })
          }else if (urlPaths[i] === "pointspread" || urlPaths[i] === "money-line" || urlPaths[i] === "totals") {
            if (urlPaths[i] === "pointspread") {
                var element = {
                    "@type": "ListItem",
                    "name": 'Point Spread',
                    "position": i+1,
                }
            }else if (urlPaths[i] === "money-line") {
                var element = {
                    "@type": "ListItem",
                    "name": 'Money Line',
                    "position": i+1,
                }
            }else if (urlPaths[i] === "totals") {
                var element = {
                    "@type": "ListItem",
                    "name": 'Totals',
                    "position": i+1,
                }
            }
            if (urlPaths[i+1] !== undefined && urlPaths[i+1] !== 'full-game') {
                element["item"] = proto+host+urls.ODDS_URL+leagueSlug+'/'+urlPaths[i]+'/full-game/';
            }
            breadCrumbList.itemListElement.push(element)
          }
      }
    }

    return breadCrumbList;
}


export const sportsEventObject = (data, leagueName) => {
    const itemType = "SportsEvent";
    const leagueInfo = allLeagueData.find(league => league.leaguename === leagueName);

    // If matchupviewtype is not specified in the parameter data then pass the league page
    const sportsEventURL = leagueInfo.matchupviewtype.length == 0 || leagueInfo.matchupviewtype === ''
        ? `${urls.SBR_SITE}${urls.ODDS_URL}${leagueInfo.parameter}`
        : `${urls.SBR_SITE}${urls.SCORES_URL}${leagueInfo.parameter}/matchup/${data.gameId}`;

    const sportsEventInfo = {
        "@context": `${schema}`,
        "@type": `${itemType}`,
        "identifier": data.gameId,
        "eventStatus": `${schema}${(data.status !== undefined) ? urls.GAME_STAUTS[data.status] : 'EventScheduled'}`,
        "url": sportsEventURL,
        "name": `${data.homeTeam.name ?? data.homeTeam.displayName} vs ${data.awayTeam.name ?? data.awayTeam.displayName} Matchup`,
        "description": `${data.homeTeam.name ?? data.homeTeam.displayName} vs ${data.awayTeam.name ?? data.awayTeam.displayName} Matchup on ${data.venueName}`,
        "image":{
            "@type": "ImageObject",
            "url": "https://img.sportsbookreview.com/images/sbr-logo.svg"
        },
        "about": {
            "image": {
                "@type": "ImageObject",
                "url": "https://img.sportsbookreview.com/images/sbr-logo.svg"
            }
        },
        "startDate": `${data.startDate}`,
        "endDate": "",
        "location":{
            "@type": "Place",
            "name": `${data.venueName}`,
            "address":{
                "addressLocality": `${data.city}`,
                "addressRegion": `${data.state}`
            }
        },
        "homeTeam": {
            "@type": "SportsOrganization",
            "name": `${data.homeTeam.fullName}`,
            "sport": `${leagueName}`,
            "memberOf": {
                "@type": "SportsOrganization",
                "name": `${leagueName}${(data.homeTeam.conferenceName !== undefined ) ? ` - ${data.homeTeam.conferenceName}` : ''}`
            }
        },
        "awayTeam": {
            "@type": "SportsOrganization",
            "name": `${data.awayTeam.fullName}`,
            "sport": `${leagueName}`,
            "memberOf": {
                "@type": "SportsOrganization",
                "name": `${leagueName}${(data.awayTeam.conferenceName !== undefined ) ? ` - ${data.awayTeam.conferenceName}` : ''}`
            }
        }
    }
    return sportsEventInfo;
}

export const sportsListEvent = (oddsObject) => {

    let sportsEventList = '';
    oddsObject.map(row => {
        (row.oddsTableModel.gameRows.length > 0) ?
            row.oddsTableModel.gameRows.map(rowGames =>
                sportsEventList += '<script type="application/ld+json">'+JSON.stringify(sportsEventObject(rowGames.gameView, row.league))+'</script>'
            )
        : ''
    })
    return sportsEventList;
}

export const faqList = (faqsObject) => {
    const itemType = "FAQPage";
    const faqList = {
        "@context": `${schema}`,
        "@type": `${itemType}`,
        "mainEntity": []
    }

    let faqs = '';
    if (faqsObject?.questions && faqsObject.questions.length > 0) {
        faqsObject.questions.map(faq => {
            faqList.mainEntity.push({
                "@type": "Question",
                "name": `${faq.question}`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${sanitizeHTML(faq.answer)}`
                }
            })
        })
        faqs += '<script type="application/ld+json">'+JSON.stringify(faqList)+'</script>'
    }

    return faqs;
}
