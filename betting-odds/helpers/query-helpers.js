import { prisma } from '/lib/prisma';

export async function getMatchupView(gameId, viewType){
  // Using the list of gameids query for the oddsviews
  return prisma.matchupview.findFirst({
    orderBy: {
      lasteventdate: 'desc',
    },
    select: {
      viewdata: true,
      viewtype: true,
    },
    where: {
      gameid: gameId,
      viewtype: viewType,
    },
  })
}

export async function getLiveScoreViews(gameIds, viewType){
  if (!gameIds || !viewType)
    return;
  // Using the list of gameids query for the boxviews
  return await prisma.livescoreview.findMany({
    // Order the games by oldest-newest so upcoming games are on top
    orderBy: {
      lasteventdate: 'asc',
    },
    select: {
      viewdata: true,
    },
    // Only return one row per gameid
    distinct: ['gameid'],
    where: {
      gameid: { in: gameIds },
      viewtype: viewType,
    },
  })
}

export async function getOddsEventsByLeague(league){
  return await prisma.oddseventlookup.findMany({
    orderBy: {
      sortorder: 'asc',
    },
    select: {
      oddseventid: true,
      oddseventname: true,
      startdate: true,
      enddate: true,
    },
    where: {
      active: true,
      OR: [
        { leaguename: league.toUpperCase() },
        { leaguename: league.toLowerCase() },
      ]
    },
  })
}

export async function getTeamFutureOddsViews(oddsEventIds, viewType){
  // Using the list of gameids query for the oddsviews
  return prisma.teamfutureoddsview.findMany({
    orderBy: {
      lasteventdate: 'desc',
    },
    select: {
      viewdata: true,
      sportsbook: true,
    },
    where: {
      oddseventid: { in: oddsEventIds },
      viewtype: viewType
    },
  })
}
