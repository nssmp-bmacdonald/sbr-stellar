const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  assetPrefix: '/sbr-odds',
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // ... rest of the configuration.
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 60,
    domains: ['wpi.sportsbookreview.com', 'directus.sbrfeeds.com', 'sbr-newage-assets.s3.amazonaws.com', 'img.sportsbookreview.com'],
  },
  rewrites: async () => {
    return [
      {
        source: '/healthz',
        destination: '/api/health',
      },
      {
        source: '/sbr-odds/_next/:path*',
        destination: '/_next/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/scores/:league*',
        has: [
          {
            type: 'query',
            key: 'date',
            value: '(?<year>\\d{4})(?<month>\\d{2})(?<day>\\d{2})',
          },
        ],
        destination: '/scores/:league*/?date=:year-:month-:day',
        permanent: true,
      },
      {
        source: '/betting-odds/:league*',
        has: [
          {
            type: 'query',
            key: 'date',
            value: '(?<year>\\d{4})(?<month>\\d{2})(?<day>\\d{2})',
          },
        ],
        destination: '/betting-odds/:league*/?date=:year-:month-:day',
        permanent: true,
      },
      {
        source: '/betting-odds/today/merged/',
        destination: '/betting-odds/',
        permanent: true,
      },
      {
        source: '/betting-odds/today/merged/:oddsScope/',
        destination: '/betting-odds/compare/pointspread/:oddsScope',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/matchups/',
        destination: '/scores/:league/matchups/',
        permanent: true,
      },
      {
        source: '/betting-odds/today/:oddsType/',
        destination: '/betting-odds/compare/:oddsType/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/today/:oddsType/:oddsScope/',
        destination: '/betting-odds/compare/:oddsType/:oddsScope/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/:id/matchup/',
        destination: '/scores/:league/matchups/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/:id/line-history/',
        destination: '/scores/:league/matchups/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/:id/odds/',
        destination: '/scores/:league/matchups/',
        permanent: true,
      },
      {
        source: '/betting-odds/nfl-football/totals/',
        destination: '/betting-odds/nfl-football/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/nfl-football/pointspread/',
        destination: '/betting-odds/nfl-football/',
        permanent: true,
      },
      {
        source: '/betting-odds/college-football/pointspread/',
        destination: '/betting-odds/college-football/',
        permanent: true,
      },
      {
        source: '/betting-odds/nba-basketball/pointspread/',
        destination: '/betting-odds/nba-basketball/',
        permanent: true,
      },
      {
        source: '/betting-odds/ncaa-basketball/pointspread/',
        destination: '/betting-odds/ncaa-basketball/',
        permanent: true,
      },
      {
        source: '/betting-odds/nhl-hockey/money-line/',
        destination: '/betting-odds/nhl-hockey/',
        permanent: true,
      },
      {
        source: '/betting-odds/mlb-baseball/money-line/',
        destination: '/betting-odds/mlb-baseball/',
        permanent: true,
      },
      {
        source: '/betting-odds/nfl-football/money-line/',
        destination: '/betting-odds/nfl-football/money-line/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/college-football/money-line/',
        destination: '/betting-odds/college-football/money-line/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/nba-basketball/money-line/',
        destination: '/betting-odds/nba-basketball/money-line/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/ncaa-basketball/money-line/',
        destination: '/betting-odds/ncaa-basketball/money-line/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/nfl-football/totals/',
        destination: '/betting-odds/nfl-football/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/college-football/totals/',
        destination: '/betting-odds/college-football/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/nba-basketball/totals/',
        destination: '/betting-odds/nba-basketball/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/nhl-hockey/totals/',
        destination: '/betting-odds/nhl-hockey/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/mlb-baseball/totals/',
        destination: '/betting-odds/mlb-baseball/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/ncaa-basketball/totals/',
        destination: '/betting-odds/ncaa-basketball/totals/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/nhl-hockey/pointspread/',
        destination: '/betting-odds/nhl-hockey/pointspread/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/mlb-baseball/pointspread/',
        destination: '/betting-odds/mlb-baseball/pointspread/full-game/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/:team/:year/stats/',
        destination: '/betting-odds/:league/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/today/merged/',
        destination: '/betting-odds/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/today/merged/:oddsScope/',
        destination: '/betting-odds/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league/matchups/:year/',
        destination: '/scores/:league/matchups/',
        permanent: true,
      },
      {
        source: '/betting-odds/compare/pointspread/full-game/',
        destination: '/betting-odds/',
        permanent: true,
      },
      {
        source: '/betting-odds/:league(soccer|england-championship|eredivisie|friendly-international|liga-mexicana|liga-zon-sagres|european-championship-qualification|uefa-nations-league|wcuefaq|england-national-*|russia-cup|ukraine-premier-league|mexico-ascenso-league|honduras-primera-division|argentina-primera-b|chile-primera-division|ecuadorian-serie-a|uruguay-primera-division|indian-super-league|indonesia-league-one|kazakhstan-premier-league|vietnam-league-one|morocco-botola-pro|npl-queensland|urvalsdeild-karla|icelandic-league-cup|iceland-league-cup-women|argentina-copa-de-la-superliga|turkish-super-lig|nigerian-professional-league|gaza-strip-cup)/',
        destination: '/picks/soccer',
        permanent: true,
      },
      {
        source: '/betting-odds/:league(great-britain-bbl|argentina-liga-nacional-de-basquet|uruguay-lub|german-bundesliga-basketball|german-bundesliga-basketball|french-pro-a-basketball)/',
        destination: '/picks/nba',
        permanent: true,
      },
      {
        source: '/betting-odds/:league(russia-mhl|russia-vhl|hockey-allsvenskan)/',
        destination: '/picks/nhl',
        permanent: true,
      },
      {
        source: '/betting-odds/:league(bellator|boxing|pga-tour|horse-racing|politics)/',
        destination: '/picks/more-sports/',
        permanent: true
      },
      {
        source: '/betting-odds/:league(ufc)/',
        destination: '/picks/ufc/',
        permanent: false,
      },
      {
        source: '/betting-odds/:league(xfl)/',
        destination: '/picks/more-sports/',
        permanent: false,
      },
      {
        source: '/betting-odds/:league(.*)-tennis/',
        destination: '/picks/more-sports/',
        permanent: false,
      },
      {
        source: '/betting-odds/:league(world-cup)/',
        destination: '/picks/soccer/',
        permanent: false,
      }
    ]
  },
});
