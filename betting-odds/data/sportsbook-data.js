// This file is a data source for the sportsbook logos and associated click out links
const sportsbookData = [
    { "slug" : "888sport", "icon": `/images/sportsbook-logos/888sport.svg` },
    { "slug" : "betvictor", "icon": `/images/sportsbook-logos/betvictor.svg` },
    { "slug" : "bet365", "icon": `/images/sportsbook-logos/bet365.svg` },
    { "slug" : "draftkings", "icon": `/images/sportsbook-logos/draftkings.svg` },
    { "slug" : "betregal", "icon": `/images/sportsbook-logos/betregal.svg` },
    { "slug" : "sportsinteraction", "icon": `/images/sportsbook-logos/sportsinteraction.svg` },
    { "slug" : "williamhill", "icon": `/images/sportsbook-logos/williamhill.svg` },
    { "slug" : "betway", "icon": `/images/sportsbook-logos/betway.svg` },
    { "slug" : "coolbet", "icon": `/images/sportsbook-logos/coolbet.svg` },
    { "slug" : "fanduel", "icon": `/images/sportsbook-logos/fanduel.svg` },
    { "slug" : "pointsbet", "icon": `/images/sportsbook-logos/pointsbet.svg` },
    { "slug" : "betamerica", "icon": `/images/sportsbook-logos/betamerica.svg` },
    { "slug" : "mansion", "icon": `/images/sportsbook-logos/mansionbet.svg` }
]

// Find the sportsbook object based on the name and return the logo
// eslint-disable-next-line no-unused-vars
export async function getSportsbooks(res){
  // const sportsbookObject = sportsbookData.find(sportsbook => sportsbook.slug === sportsbookName);
  // if(sportsbookObject === undefined){
  //   return null;
  // }
  // return sportsbookObject;
  return sportsbookData;
}
