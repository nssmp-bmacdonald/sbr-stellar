import Head from 'next/head';
import { useRouter } from 'next/router'

import { useState } from 'react';

import parse from 'html-react-parser';

import Modal from 'react-modal';

import MediaQuery from '/components/MediaQuery';

import getTimeHelpers from '/helpers/get-time-helpers';
import { buildOddsTable } from '/helpers/model-helpers/general-helpers';
import { getLeagueData } from '/data/parameter-data';
import leagueData from '/data/parameter-data';
import { formatDateParameter } from '/helpers/date-helpers';
import * as query from '/helpers/query-helpers';
import { breadcrumbObject, faqList } from '/helpers/data-structure-helpers';

import { getBettingArticle } from '/services/betting-article';
import { getGameIds, getGameViews } from '/services/games';
import { getOddsViews } from '/services/odds';
import { getSportsbooks } from '/services/sportsbooks';

import Header from '/components/header/Header';
import Footer from '/components/footer/Footer';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';
import Breadcrumbs from '/components/page-controls/Breadcrumbs';
import DateControls from '/components/page-controls/DateControls.js';
import PageTitle from '/components/page-controls/PageTitle.js';
import CMSContent from '/components/cms/Content'

import cardStyle from '/styles/components/Card.module.scss';
import modalStyle from '/styles/components/Modal.module.scss';

import Slider from "react-slick";

import styles from '/styles/odds-table/OddsTableMobile.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';
import styleConsensus from '/styles/pages/consensus/Consensus.module.scss';

import { numberToString } from '/helpers/string-helpers';

import { SBR_SITE } from '/constants/seo';

const customStyles = {
    content: {
      position: 'fixed',
      top: '10vh',
      left: '10vw',
      right: 'auto',
      bottom: 'auto',
      marginRight: '0',
      padding: '0',
      width: '80vw',
      height: '80vh',
      WebkitOverflowScrolling: 'touch',
    },
  };

const Consensus = ( props ) => {
    const { asPath, query } = useRouter();
    const [breakpoint, setBreakpoint] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [sliderPosition, setSliderPosition] = useState(0);

    const updateSliderPosition = position => setSliderPosition(position);


    const isBreakpoint = MediaQuery(1024);
    if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

    const openModal = (e) => {
        e.preventDefault();
        let propsIndex = e.target.getAttribute("data-id");

        setModalContent(props.oddsTableModel.gameRows[propsIndex]);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
            },
            {
            breakpoint: 960,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
            },
            {
            breakpoint: 720,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            }
        ],
        beforeChange: (current, next) => {
            updateSliderPosition(next);
        },
    };

    return (
        <>
          <Head>
            <title>{props.league} Consensus</title>
            <meta name="description" content="Consensus description" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${props.league} Consensus`} />
            <meta property="og:description" content="Consensus description" />
            <meta property="og:url" content={`${SBR_SITE}${asPath.split('?')[0]}`} />
            <meta property="og:image" content="" />
            <meta property="og:image:alt" content="The SBR logo with the bull at the top of the SBR letters" />
            <meta property="og:site_name" content="Sportsbook Review" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@SBRreview" />
            <meta name="twitter:title" content={`${props.league} Consensus`} />
            <meta name="twitter:description" content="Consensus description" />
            <meta name="twitter:image" content="" />

            {query.date == undefined || query.date == null ?
            <link rel="canonical" href={`${SBR_SITE}${asPath}`} /> : ''
            }

            {(props.breadcrumbListObject !== "") ? parse('<script type="application/ld+json">' + JSON.stringify(props.breadcrumbListObject) + '</script>'): ''}
            {parse(props.schemaFAQ)}
          </Head>
          <Header league={props.league} isBreakpoint={breakpoint} asPath={asPath} />
          <div id={`consensus-${props.header}`} className="container content bckg-white">
                <div className="controls padding-container">
                    <Breadcrumbs breadcrumbList={props.breadcrumbListObject} />
                    <DateControls />
                </div>
                <PageTitle league={props.league} scopes={query} pageName={`${props.league} Consensus`} />

                {
                    props.oddsTableModel.gameRows.length == 0 ?
                      <div className='noOdds py-3'>No odds available at this time for this league</div>
                  :
                    <div className='padding-container py-3'>
                        {props.oddsTableModel.gameRows.map((item, index) =>
                        <GameConsenus item={item} key={index} index={index} openModal={openModal} settings={settings} />
                        )}
                    </div>
                }
                <CMSContent bettingArticle={props.bettingArticle} />
          </div>
          <Modal
            isOpen={modalIsOpen}
            aria={{
                labelledby: "heading",
                describedby: "modalDescription"
            }}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Consensus History">
            {(modalIsOpen) ?
                <section className={modalStyle.ModalWrapper} aria-describedby='modalDescription'>
                    <header className={modalStyle.ModalHeader}>
                        <h2 id="heading">Consensus History</h2>
                        <button type='button'
                            onClick={closeModal}
                            title='Close consensus history modal'
                            className="no-button">
                            <i className={`sbr-icon-close ${modalStyle.Close}`}></i> <span className='sr-only'>Close the graphical statistics modal</span>
                        </button>
                    </header>
                    <div className={`${modalStyle.ModalContent} ${modalStyle.Large}`}>
                        <div className='sr-only' id='modalDescription'>
                            This is a dialog window which overlays the consensus information of the page. Pressing the Close Modal button at the top of the modal will close the modal and bring you back to where you were on the page.
                        </div>
                        <PopulateModal gameData={modalContent} />
                    </div>
                </section>

                : null }
          </Modal>
          {
            isBreakpoint ?
            <FooterFlyoutMobile /> :
            null
          }
          <Footer region={props.header}  />
        </>
    )
}

const GameConsenus = ({ item, index, openModal, settings }) => {
    let consensus = item.gameView.consensus;
    let oddsView = item.oddsViews.filter(item => !!item)[0];
    const lastHistory = oddsView?.spreadHistory[oddsView.spreadHistory.length - 1];

    return (
        <>
        <div key={index} id={item.gameView.gameId} className={`${cardStyle.Card}`}>
            <div className={`${cardStyle.CardTitle} ${cardStyle.CardTitle_Large}`}>
                <h2 className='h4'>{item.gameView.awayTeam.displayName} vs {item.gameView.homeTeam.displayName}<br />
                <small>{item.gameView.venueName}, {item.gameView.city}, {item.gameView.state}, {item.gameView.country}<br />
                {getTimeHelpers.getTime(item.gameView.startDate)} </small></h2>
            </div>
            <div className={`${styles.eventGridContainer} ${styles.tableContainer}`}>
                <div className={`border-right ${styles.leftBoxContainer}`}>
                    <div className={`bckg-gray ${styles.tableHeader} border-bottom`}>
                        <button type="button" className='no-button text-red' onClick={openModal} data-id={index}>Consensus History</button>
                    </div>
                    <div className={`${styles.bettingOptions}`}>
                        <div className={`participantAwayTeam ${styles.participantContainer}`}>
                            <div className={`participantAwayTeam ${styles.participantData}`}>
                                <span className={styles.participantRot}>{item.gameView.awayTeamRotationNumber}</span>
                                {item.gameView.awayTeam.displayName}
                            </div>
                            <div className={`participantHomeTeam ${styles.participantData}`}>
                                <span className={styles.participantRot}>{item.gameView.homeTeamRotationNumber}</span>
                                {item.gameView.homeTeam.displayName}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.oddsNumberContainer}`}>
                    <Slider {...settings}>
                        <div className={`${styles.numbersContainer}`}>
                            <div className={`${styles.tableHeader} text-center bckg-gray border-bottom`}>Odds</div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{oddsView ? numberToString(lastHistory.awaySpread) : '-'}</span>
                            </div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{oddsView ? numberToString(lastHistory.homeSpread) : '-'}</span>
                            </div>
                        </div>
                        <div className={`border-left`}>
                            <div className={`${styles.tableHeader} text-center bckg-gray border-bottom`}>Spread</div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{!!consensus && !!consensus.awaySpreadPickPercent ? Math.round(consensus.awaySpreadPickPercent) + "%" : '-'}</span>
                            </div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{!!consensus && !!consensus.awaySpreadPickPercent ? Math.round(consensus.homeSpreadPickPercent) + "%" : '-'}</span>
                            </div>
                        </div>
                        <div className={`border-left`}>
                            <div className={`${styles.tableHeader} text-center bckg-gray border-bottom`}>Total</div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{!!consensus && !!consensus.overPickPercent ? Math.round(consensus.overPickPercent) + "% O"  : '-'}</span>
                            </div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{!!consensus && !!consensus.underPickPercent ? Math.round(consensus.underPickPercent) + "% U"  : '-'}</span>
                            </div>
                        </div>
                        <div className={`border-left`}>
                            <div className={`${styles.tableHeader} text-center bckg-gray border-bottom`}>Money Line</div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{!!consensus && !!consensus.awayMoneyLinePickPercent ? Math.round(consensus.awayMoneyLinePickPercent) + "%"  : '-'}</span>
                            </div>
                            <div className={`${styles.oddsNumber}`}>
                                <span>{!!consensus && !!consensus.homeMoneyLinePickPercent ? Math.round(consensus.homeMoneyLinePickPercent) + "%"  : '-'}</span>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
      </>
    )
  }

const PopulateModal = ({ gameData }) => {
    const oddsView = gameData.oddsViews.filter(item => !!item)[0];
    if (!oddsView)
        return null;

    const spreadHistory = [...oddsView.spreadHistory].sort((a,b) => (new Date(b.oddsDate) - new Date(a.oddsDate)));
    const moneylineHistory = [...oddsView.moneyLineHistory].sort((a,b) => (new Date(b.oddsDate) - new Date(a.oddsDate)));
    const totalHistory = [...oddsView.totalHistory].sort((a,b) => (new Date(b.oddsDate) - new Date(a.oddsDate)));

    return (
        (gameData.gameView) ?
            <>
                <h2 className='text-center'>
                    {gameData.gameView.awayTeam.displayName} vs {gameData.gameView.homeTeam.displayName}</h2>
                    <div className={styleConsensus.mainColumn}>
                        <div className={`${cardStyle.Card} columns-three`}>
                            <h3 className='text-center'>Point Spreads</h3>
                            <div className={`${rowStyle.Rows}`}>
                                <div className={rowStyle.Row}>
                                    <div className={rowStyle.RowLabel}>Time</div>
                                    <div className={rowStyle.RowLabel}>{gameData.gameView.awayTeam.shortName}</div>
                                    <div className={rowStyle.RowLabel}>{gameData.gameView.homeTeam.shortName}</div>
                                </div>
                            </div>
                            <div className={`${rowStyle.Consensus} ${rowStyle.Rows}`}>
                            {
                                spreadHistory.map((item, index) =>
                                    <div className={rowStyle.Row} key={index} >
                                        <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(item.oddsDate)}</div>
                                        <div className={rowStyle.RowData}>{numberToString(item.awaySpread)} {numberToString(item.awayOdds)}</div>
                                        <div className={rowStyle.RowData}>{numberToString(item.homeSpread)} {numberToString(item.homeOdds)}</div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        <div className={`${cardStyle.Card} columns-three`}>
                            <h3 className='text-center'>Money Lines</h3>
                            <div className={`${rowStyle.Rows}`}>
                                <div className={rowStyle.Row}>
                                    <div className={rowStyle.RowLabel}>Time</div>
                                    <div className={rowStyle.RowLabel}>{gameData.gameView.awayTeam.shortName}</div>
                                    <div className={rowStyle.RowLabel}>{gameData.gameView.homeTeam.shortName}</div>
                                </div>
                            </div>
                            <div className={`${rowStyle.Consensus} ${rowStyle.Rows}`}>
                            {
                                moneylineHistory.map((item, index) =>
                                    <div className={rowStyle.Row} key={index} >
                                        <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(item.oddsDate)}</div>
                                        <div className={rowStyle.RowData}>{numberToString(item.awaySpread)} {numberToString(item.awayOdds)}</div>
                                        <div className={rowStyle.RowData}>{numberToString(item.homeSpread)} {numberToString(item.homeOdds)}</div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        <div className={`${cardStyle.Card} columns-three`}>
                            <h3 className='text-center'>Totals</h3>
                            <div className={`${rowStyle.Rows}`}>
                                <div className={rowStyle.Row}>
                                    <div className={rowStyle.RowLabel}>Time</div>
                                    <div className={rowStyle.RowLabel}>Over</div>
                                    <div className={rowStyle.RowLabel}>Under</div>
                                </div>
                            </div>
                            <div className={`${rowStyle.Consensus} ${rowStyle.Rows}`}>
                            {
                                totalHistory.map((item, index) =>
                                    <div className={rowStyle.Row} key={index} >
                                        <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(item.oddsDate)}</div>
                                        <div className={rowStyle.RowData}>{item.total} {numberToString(item.overOdds)}</div>
                                        <div className={rowStyle.RowData}>{item.total} {numberToString(item.underOdds)}</div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
            </>
        : null
    )
}

export default Consensus;

export async function getServerSideProps(context) {
    // Get the date string for querying the games
    const date = formatDateParameter(context.query.date);
    // Get the league param and map it to its DB friendly name
    const leagueObject = getLeagueData(context.params.league);
    // If its not a valid league 404
    if(leagueObject === null){
        return {
        notFound: true,
        }
    }
    const league = leagueObject.leaguename;
    var oddsView = 'SportsbookGameOddsHistoryDataView';
    var oddsScope = 'Competition';

    // we only want to allow league specific odds pages to fallback to the past
    // for data (if date isn't selected)
    var pastFallback = false;
    if(!context.query.date)
        pastFallback = true;

    // Retrieve gameIds for today and associated gameviews and oddsviews
    const gameIds = await getGameIds(league, date, pastFallback);
    const gameViews = await getGameViews(gameIds);

    const liveScoreViews = await query.getLiveScoreViews(gameIds, getLiveViewType(league));
    const oddsViews = await getOddsViews(gameIds, oddsView, oddsScope);
    const sportsbooks = await getSportsbooks(context.res);

    // Create 'models' for the odds tables so its easier to pass around
    const oddsTableModel = buildOddsTable(oddsViews, gameViews, sportsbooks, liveScoreViews);

    const leagueInfo = leagueData.find(leagues => leagues.leaguename === league);
    const breadcrumbListObject = breadcrumbObject(league, context.req, context.resolvedUrl, leagueInfo);

    const pathnameArr = context.resolvedUrl.substring(1).split('/');
    const slug = (pathnameArr.length > 1 ? pathnameArr[pathnameArr.length - 1] : pathnameArr[0]).split('?')[0];
    const urlPath = pathnameArr.length > 1 ? pathnameArr[0] : null;
    const bettingArticle = await getBettingArticle(slug, urlPath, leagueObject.parameter, context.res);
    const schemaFAQ =  (bettingArticle?.faqs?.questions && bettingArticle.faqs.questions.length > 0) ? await faqList( bettingArticle.faqs) : '';

    const header = context.res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();

    return {props: {header, oddsTableModel, league, breadcrumbListObject, bettingArticle, schemaFAQ } }
}

function getLiveViewType(value){
    switch (value) {
        case 'NHL': return 'HockeyLivescoreDetailsDataView';
        case 'NFL':
        case 'NCAAF': return 'FootballLivescoreDetailsDataView';
        case 'MLB': return 'BaseballLivescoreDetailsDataView';
        case 'NBA':
        case 'NCAAB': return 'BasketballLivescoreDetailsDataView';
        default: return null;
    }
}
