import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import getTimeHelpers from '/helpers/get-time-helpers';
import getUrlHelpers from '/helpers/get-url-helpers';

import Slider from "react-slick";

import BoxScore from '/components/odds-table/partials/BoxScore';
import OddsCells from '/components/odds-table/partials/OddsCells';
import WagersAndOpeners from '/components/odds-table/partials/WagersAndOpeners';
import FavoriteGame from '/components/odds-table/partials/FavoriteGame';
import style from '/styles/odds-table/OddsTableMobile.module.scss';
import { getRank } from '/helpers/model-helpers/general-helpers';
import { LOGOS_URL } from '/constants/seo';

function GameRowsMobile({ date, table, oddsFormat, showBoxScore, updateOddsTables, isBigSix }) {
  const isThreeWay = table.gameRows[0].openingLineViews[0]?.viewType === "ThreeWayDataOpeningAndLatestOddsDataView"
  return(
    <>
      <div className={style.eventsDate_header}>
        { date }
      </div>
      {
        table.gameRows.map((row, index) =>
          <GameRow key={index} row={row} index={index} sportsbooks={table.sportsbooks} showBoxScore={showBoxScore} oddsFormat={oddsFormat} updateOddsTables={updateOddsTables} isBigSix={isBigSix} isThreeWay={isThreeWay}/>
        )
      }
    </>
  );
}

const GameRow = ({ row, index, sportsbooks, showBoxScore, oddsFormat, updateOddsTables, isBigSix, isThreeWay }) => {
  const [ boxScore, setToggleBoxScore ] = useState(showBoxScore);
  const [ sliderPosition, setSliderPosition ] = useState(0);

  const toggleBoxScore = toggle => setToggleBoxScore(toggle);
  const updateSliderPosition = position => setSliderPosition(position);

  useEffect(() => {
    setToggleBoxScore(showBoxScore);
  },[showBoxScore]); //this code will run when the value of 'showBoxScore' changes

  return (
    <div key={index} id={`game-${row.gameView.gameId}`}>
        <div className={style.gameDescription}>
            <FavoriteGame gameId={row.gameView.gameId} league={row.gameView.leagueName} date={row.gameView.startDate} updateOddsTables={updateOddsTables} />
            <GameInfo data={row.gameView} isBigSix={isBigSix}/>
        </div>
        <div className='PlayByPlay'>
          <div className='progress'></div>
          <div className='score'></div>
        </div>
        <div className={style.eventGridContainer}>
            <HeaderControl data={row.gameView} showBoxScore={boxScore && sliderPosition === 0} isBigSix={isBigSix} isThreeWay={isThreeWay} />
            <BoxScore boxScore={boxScore && sliderPosition === 0} scoreDataList={row.liveScoreViews.viewdata?.GameTeamScoreDataList} gameView={row.gameView} isMobile={true} />
            <BettingNumbers data={row} logos={sportsbooks} toggleBoxScore={toggleBoxScore} updateSliderPosition={updateSliderPosition} showBoxScore={showBoxScore} oddsFormat={oddsFormat} isThreeWay={isThreeWay}/>
        </div>
    </div>
  )
}

const GameInfo = ({ data, isBigSix }) => {
  return (
    <>
    {
      isBigSix ?
        <Link
        href={ getUrlHelpers.getOddsUrl(data.gameId, data.leagueName) }
        passHref>
          <a>
          { getTimeHelpers.getTime(data.startDate) } |
          { data.venueName }{ (data.venueName !== undefined) ? ', ' : '' }
          { data.city }{ (data.city !== undefined) ? ', ' : '' }
          { data.state }
          <h3>{ data.awayTeam.fullName } vs { data.homeTeam.fullName }</h3>
          {
            (!!data.awayStarter && !!data.homeStarter) ?
            <>
                <div className={style.pitcher}>
                <span>Starting {data.leagueName === 'NHL' ? 'Goalies' : 'Pitchers'}: </span>
                <span>{data.awayStarter.firstInital ? data.awayStarter.firstInital + '. ' : ''} {data.awayStarter.lastName}{data.awayStarter.throwsShort? ' (' + data.awayStarter.throwsShort + ')' : ''}</span>
                <span> vs. </span>
                <span>{data.homeStarter.firstInital ? data.homeStarter.firstInital + '. ' : ''} {data.homeStarter.lastName}{data.homeStarter.throwsShort? ' (' + data.homeStarter.throwsShort + ')' : ''}</span>
                </div>
                </> :
                null
              }

            </a>
          </Link> :
          <div>
            { getTimeHelpers.getTime(data.startDate) } |
            { data.venueName }{ (data.venueName !== undefined) ? ', ' : '' }
            { data.city }{ (data.city !== undefined) ? ', ' : '' }
            { data.state }
            <h3>{ data.awayTeam.displayName } vs { data.homeTeam.displayName }</h3>
            {
              (!!data.awayStarter && !!data.homeStarter) ?
              <>
                  <div className={style.pitcher}>
                    <span>Starting {data.leagueName === 'NHL' ? 'Goalies' : 'Pitchers'}: </span>
                    <span>{data.awayStarter.firstInital ? data.awayStarter.firstInital + '. ' : ''} {data.awayStarter.lastName}{data.awayStarter.throwsShort? ' (' + data.awayStarter.throwsShort + ')' : ''}</span>
                    <span> vs. </span>
                    <span>{data.homeStarter.firstInital ? data.homeStarter.firstInital + '. ' : ''} {data.homeStarter.lastName}{data.homeStarter.throwsShort? ' (' + data.homeStarter.throwsShort + ')' : ''}</span>
                  </div>
                  </> :
                  null
                }

          </div>
        }
        </>
  )
}

const HeaderControl = ({ data, showBoxScore, isBigSix, isThreeWay }) => {
  return (
    <div className={`border-right ${style.leftBoxContainer}`}>
      <div className={`bckg-gray ${style.tableHeader}`}>
        {
          isBigSix ?
            <Link
            href={ getUrlHelpers.getMatchupUrl(data.gameId, data.leagueName) }
            passHref>
              <a rel="" className="text-red">H2H</a>
            </Link> : <></>
        }
      </div>
      <div className={`${style.bettingOptions} border-left`}
            data-horizontal-eid={data.gameId}>
            <div className={style.participantContainer}>
                <div className={`participantAwayTeam ${style.participantData}`}>
                    <div className={style.participantRot}>{data.awayTeamRotationNumber}</div>
                    {
                      isBigSix ?
                        <Link
                        href={getUrlHelpers.getOddsUrl(data.gameId, data.leagueName)}
                        passHref>
                          <a rel="" >
                            {getRank(data.awayTeam.Rank,data.leagueName)}
                            {data.awayTeam.shortName}
                          </a>
                        </Link> :
                        <div>
                          {getRank(data.awayTeam.Rank,data.leagueName)}
                          {data.awayTeam.shortName ?? data.awayTeam.displayName}
                        </div>
                    }
                    <span>
                    <i className={`${style.iconAction} ${style.smallFont}`}></i>
                    </span>
                    <div className={`${style.participantScore} ${showBoxScore || getTimeHelpers.isBeforeNow(data.startDate) ? 'hide' : ''}`}>
                      <div>{data.awayTeamScore}</div>
                    </div>
                </div>
                <div className={`participantHomeTeam ${style.participantData}`}>
                    <div className={style.participantRot}>{data.homeTeamRotationNumber}</div>
                    {
                    isBigSix ?
                      <Link
                      href={getUrlHelpers.getOddsUrl(data.gameId, data.leagueName)}
                      passHref>
                        <a rel="">
                            {getRank(data.homeTeam.rank,data.leagueName)}
                            {data.homeTeam.shortName}
                        </a>
                      </Link> :
                      <div>
                        {getRank(data.homeTeam.rank,data.leagueName)}
                        {data.homeTeam.shortName ?? data.homeTeam.displayName}
                      </div>
                    }
                    <span>
                    <i className={`${style.iconAction} ${style.smallFont}`}></i>
                    </span>
                    <div className={`${style.participantScore} ${showBoxScore || getTimeHelpers.isBeforeNow(data.startDate) ? 'hide' : ''}`}>
                      <div>{data.homeTeamScore}</div>
                    </div>
                </div>
                {
                  isThreeWay ?
                    <div className={`participantAwayTeam ${style.participantData}`}>
                      <div className={style.participantRot}></div>
                      <div className={`${style.participantScore}`}>
                        <div>Draw</div>
                      </div>
                    </div> : <></>
                }
            </div>
      </div>
  </div>
  )
}

const BettingNumbers = ({ data, logos, toggleBoxScore, updateSliderPosition, showBoxScore, oddsFormat, isThreeWay }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ],
    beforeChange: (current, next) => {
      updateSliderPosition(next);

      if (showBoxScore)
        toggleBoxScore(next == 0);
    },
  };

  return (
    <div className={`${style.oddsNumberContainer}`}>
      <Slider {...settings}>
        <div className={`${style.numbersContainer}`}>
          <div className={`${style.tableHeader} text-center bckg-gray`}><b>WAGERS</b></div>
          <WagersAndOpeners
              openingLineViews={data.openingLineViews}
              gameView={data.gameView}
              mobile={true}
              isThreeWay={isThreeWay} />
        </div>
        <div className={`${style.numbersContainer} border-left`}>
          <div className={`${style.tableHeader} text-center bckg-gray`}><b>OPENER</b></div>
          <OddsCells data={data.openingLineViews} id={0} isOdds={false} oddsFormat={oddsFormat} lineHistoryUrl={getUrlHelpers.getLineHistoryUrl(data.gameView.gameId, data.gameView.leagueName)} isThreeWay={isThreeWay}/>
        </div>
        {
          logos.slice(0, 7).map((sportsbook, index) =>
            <div key={index} className={`${style.numbersContainer} border-left`}>
                <div className={`${style.tableHeader} text-center bckg-gray`}>
                    <Link href={sportsbook.affiliateLink}>
                      <a
                        target="_blank"
                        rel="nofollow"
                        data-aatracker={`Odds Table - Visit Site CTA - ${sportsbook.name}`}>
                        <Image
                        alt={`${sportsbook.name} Logo`}
                        src={LOGOS_URL + sportsbook.iconColor.fileName}
                        width={75}
                        height={45} />
                      </a>
                    </Link>
                </div>
                <OddsCells data={data.oddsViews} id={index} isOdds={true} oddsFormat={oddsFormat} lineHistoryUrl={getUrlHelpers.getLineHistoryUrl(data.gameView.gameId, data.gameView.leagueName)} isThreeWay={isThreeWay}/>
            </div>
          )
        }
      </Slider>
    </div>
  )

}

export default GameRowsMobile;
