import { useState } from 'react';

import Image from 'next/image';

import getTimeHelpers from '/helpers/get-time-helpers';
import { numberToString } from '/helpers/string-helpers';
import { LOGOS_URL } from '/constants/seo';

import style from '/styles/pages/matchup-and-linehistory/GameMatchup.module.scss';
import modalStyle from '/styles/components/Modal.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';
import ddStyle from '/styles/components/Dropdown.module.scss';

import GameMarketSelector from '/components/matchup-and-linehistory/partials/GameMarketSelector';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from 'react-chartjs-2';
import Modal from 'react-modal';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const customStyles = {
    content: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: 'auto',
      bottom: 'auto',
      marginRight: '0',
      padding: '0',
      width: '100vw',
      height: '100vh'
    },
  };

const GameLineHistory = ({ isBreakpoint, lineHistoryModel }) =>{
    const [selectedSportbook, setSelectedSportbook] = useState(lineHistoryModel.sportsbooks[0]);
    const [gameMarket, setGameMarket] = useState('pointspread');
    const [modalIsOpen, setIsOpen] = useState(false);

    let oddsView = lineHistoryModel.lineHistory.oddsViews.find(oddView => oddView.sportsbook === selectedSportbook.machineName)
    let lineHistory = setHistory(oddsView, gameMarket);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const setSportBookChange = (e) => {
        oddsView = lineHistoryModel.lineHistory.oddsViews.find(oddView => oddView.sportsbook === e.slug)?.viewdata;
        lineHistory = setHistory(oddsView, gameMarket);

        setSelectedSportbook(e);
    }

    function setHistory(oddsView, selected)  {
        let history = oddsView?.spreadHistory;
        if (selected === 'money-line')
            history = oddsView?.moneyLineHistory;
        else if (selected === 'totals')
            history = oddsView?.totalHistory;

        return history;
    }

    return (
        <>
        <div id="LineHistory" className={`${style.mainColumn} ${style.LineHistory}`}>
            {
                 lineHistoryModel.sportsbooks && lineHistoryModel.sportsbooks.length > 0 ?
                    <>
                    <aside className={style.leftColumn}>
                        <div className={style.dropDownContainer}>
                            <SportbookDropdown
                                list={lineHistoryModel.sportsbooks}
                                selected={selectedSportbook}
                                setDropdown={setSportBookChange} />
                            {
                            (isBreakpoint) ?
                                    <div className={style.pageControl}>
                                        <GameMarketSelector market={gameMarket} setMarketSelector={setGameMarket} isBreakpoint={isBreakpoint} />
                                        <button onClick={openModal} className="no-button">
                                            <Image
                                                src="https://img.sportsbookreview.com/images/line-chart.svg"
                                                alt="Illustration of a chart graph"
                                                width={30}
                                                height={30}  />
                                                <span className="sr-only">View graph</span>
                                        </button>
                                    </div>
                                :
                                    null
                            }
                        </div>
                        <LineHistoryList
                            game={lineHistoryModel.lineHistory.gameView}
                            history={lineHistory}
                            gameMarket={gameMarket} />
                    </aside>
                    </>
                    : null
            }

            {
                 lineHistory && lineHistory.length > 0 ?
                    <hr />
                    : null
            }

            <div className={style.centerColumn}>
            {
                (!isBreakpoint) ?
                    <>
                        <GameMarketSelector market={gameMarket} setMarketSelector={setGameMarket} />
                        {
                            lineHistory && lineHistory.length > 0 ?
                                <LineHistoryChart
                                    game={lineHistoryModel.lineHistory.gameView}
                                    history={lineHistory}
                                    gameMarket={gameMarket} isBreakpoint={isBreakpoint} />
                            :
                            null
                        }
                    </>
                :
                <Modal
                    appElement={document.getElementById('LineHistory')}
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <section className={modalStyle.ModalWrapper} aria-describedby='modalDescription'>
                        <header className={modalStyle.ModalHeader}>
                            <h2>Line History Chart</h2>
                            <button type='button'
                                onClick={closeModal}
                                title='Close line history graph modal'
                                className="no-button">
                                <i className={`sbr-icon-close ${modalStyle.Close}`}></i> <span className='sr-only'>Close the graphical statistics modal</span>
                            </button>
                        </header>
                        <div className={modalStyle.ModalContent}>
                            <div className='sr-only' id='modalDescription'>
                                This is a dialog window which overlays the graphics information of the page. Pressing the Close Modal button at the top of the modal will close the modal and bring you back to where you were on the page.
                            </div>
                            <LineHistoryChart
                                game={lineHistoryModel.lineHistory.gameView}
                                history={lineHistory}
                                gameMarket={gameMarket} isBreakpoint={isBreakpoint} />
                        </div>
                    </section>
                </Modal>
            }

            </div>
        </div>
            {
                !lineHistory || lineHistory.length == 0 ?
                    <div className='noOdds'><h2>Currently there is no Line History for this event.</h2></div>
                : null
            }
        </>
    )
}

const SportbookDropdown = ({ list, selected, setDropdown }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const setDropdownSportbook = (e) => {
        let format = e.target.getAttribute("data-format");
        let index = list.findIndex(item => item.icon === format)
        setDropdown(list[index]);
        setIsOpen(false);
    }
    return (
        <div className={`${(list.length > 1) ? ddStyle.DropdownSportbook : 'text-center '} ${(isOpen) ? ddStyle.DropSportOpen : ''}`}>
            <button className={(list.length > 1) ? ddStyle.DropdownButton : 'no-button'}
                type="button"
                data-toggle={(list.length > 1) ? "dropdown" : ""}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={(list.length > 1) ? toggleDropdown : null}>
                    <Image
                        alt={`${selected.name} Logo`}
                        src={`${LOGOS_URL + selected.iconColor.fileName}`}
                        width={58}
                        height={30} />
            </button>
            { (list.length > 1) ?
            <ul className={ddStyle.DropdownList}>
                { list.map((item, index) =>
                  <li key={index}
                    className={`${(item.slug === selected.slug) ? ddStyle.Item +' '+ ddStyle.Selected : ddStyle.Item}`}
                    onClick={setDropdownSportbook}
                    data-format={item.icon}>
                    <button type="button" data-format={item.icon}>
                        <Image
                            alt={`${item.name} Logo`}
                            src={`${LOGOS_URL + item.iconColor.fileName}`}
                            width={75}
                            height={45}
                            data-format={item.icon} />
                    </button>
                  </li>
                  )
                }
            </ul>
            : null }
        </div>
    )
}

const LineHistoryList = ({ game, history, gameMarket }) => {
    // order content by desc date
    const lineHistory = [...history].sort((a,b) => (new Date(b.oddsDate) - new Date(a.oddsDate)));
    const lastHistory = lineHistory[lineHistory.length - 1];

    return (
        <div>
            {
            lineHistory && lineHistory.length > 0 ?
                <div className={`${style.list} ${rowStyle.Rows} ${rowStyle.SportbooksResult}`}>
                    <div className={rowStyle.Row}>
                        <div className={rowStyle.RowData}></div>
                        <div className={rowStyle.RowData}><small>Opener</small></div>
                        <div className={rowStyle.RowData}></div>
                    </div>
                    {
                        gameMarket === 'totals' ?
                        <>
                            <div className={rowStyle.Row} >
                                <div className={rowStyle.RowData}><b>Time</b></div>
                                <div className={rowStyle.RowData}><b>OVER</b></div>
                                <div className={rowStyle.RowData}><b>UNDER</b></div>
                            </div>
                            <div className={rowStyle.Row}>
                                <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(lastHistory.oddsDate)}</div>
                                <div className={rowStyle.RowData}>{lastHistory.Total} {numberToString(lastHistory.overOdds)}</div>
                                <div className={rowStyle.RowData}>{lastHistory.Total} {numberToString(lastHistory.underOdds)}</div>
                            </div>
                            <div className={rowStyle.Row} >
                                <div className={rowStyle.RowData}><b>Time</b></div>
                                <div className={rowStyle.RowData}><b>OVER</b></div>
                                <div className={rowStyle.RowData}><b>UNDER</b></div>
                            </div>
                             {
                                lineHistory.map((item, index) =>
                                    <div className={rowStyle.Row} key={index} >
                                        <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(item.oddsDate)}</div>
                                        <div className={rowStyle.RowData}>{item.Total} {numberToString(item.overOdds)}</div>
                                        <div className={rowStyle.RowData}>{item.Total} {numberToString(item.underOdds)}</div>
                                    </div>
                                )
                            }
                        </>
                        :
                        <>
                            <div className={rowStyle.Row}>
                                <div className={rowStyle.RowData}><b>Time</b></div>
                                <div className={rowStyle.RowData}><b>{game.awayTeam.shortName}</b></div>
                                <div className={rowStyle.RowData}><b>{game.homeTeam.shortName}</b></div>
                            </div>
                            <div className={rowStyle.Row}>
                                <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(lastHistory.oddsDate)}</div>
                                <div className={rowStyle.RowData}>{numberToString(lastHistory.awaySpread)} {numberToString(lastHistory.awayOdds)}</div>
                                <div className={rowStyle.RowData}>{numberToString(lastHistory.homeSpread)} {numberToString(lastHistory.homeOdds)}</div>
                            </div>
                            <div className={rowStyle.Row}>
                                <div className={rowStyle.RowData}><b>Time</b></div>
                                <div className={rowStyle.RowData}><b>{game.awayTeam.shortName}</b></div>
                                <div className={rowStyle.RowData}><b>{game.homeTeam.shortName}</b></div>
                            </div>
                            {
                                lineHistory.map((item, index) =>
                                    <div className={rowStyle.Row} key={index} >
                                        <div className={rowStyle.RowData}>{getTimeHelpers.getLineDate(item.oddsDate)}</div>
                                        <div className={rowStyle.RowData}>{numberToString(item.awaySpread)} {numberToString(item.awayOdds)}</div>
                                        <div className={rowStyle.RowData}>{numberToString(item.homeSpread)} {numberToString(item.homeOdds)}</div>
                                    </div>
                                )
                            }
                        </>
                    }
                </div>
            :
                null
            }
        </div>
    )
}

const LineHistoryChart = ({ game, history, gameMarket, isBreakpoint }) => {
    const datasetOptions = {
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: true,
    };
    const labels = history.map(item => getTimeHelpers.getLineDate(item.oddsDate));
    const data = {
        labels,
        datasets: [
        {
            ...datasetOptions,
            borderColor: 'rgb(38, 119, 215)',
            pointBorderColor: 'rgb(38, 119, 215)',
            pointHoverBackgroundColor: 'rgb(38, 119, 215)',
            label: gameMarket !== 'totals' ? game.awayTeam.shortName : '',
            data: history.map(item => item.awaySpread ? numberToString(item.awaySpread) : item.total ?? numberToString(item.awayOdds)),
        }
        ]
    };
    if (gameMarket !== 'totals')
        data.datasets = [...data.datasets, {
            ...datasetOptions,
            label: game.homeTeam.shortName,
            borderColor: 'rgb(46, 150, 61)',
            pointBorderColor: 'rgb(46, 150, 61)',
            pointHoverBackgroundColor: 'rgb(46, 150, 61)',
            data: history.map(item => numberToString(item.homeSpread ?? item.homeOdds)),
        } ]

    let maxMin = null;
    // Point Spreads data seems to be touching the top and bottom of the chart, adding extra padding by setting max and min
    if (gameMarket === 'pointspread')
    {
        const spreads = data.datasets
                        .map(item => item.data)
                        .flat();
        maxMin = {
            max: Math.max(...spreads) + 0.5,
            min: Math.min(...spreads) - 0.5,
        }
    }
    const mobileXLabels = isBreakpoint ? {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function(val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val).split(' ')[0] : '';
        },
    } : null;

    const options = {
        responsive: true,
        scales: {
            y: {
                ...maxMin,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value) {
                        return gameMarket !== 'totals' ? numberToString(value) : value.toFixed(1);
                    }
                }
            },
            x: {
                ticks: {
                    ...mobileXLabels
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                display: gameMarket !== 'totals',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const item = history[context.dataIndex];
                        const isAway = game.awayTeam.shortName === context.dataset.label;
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }

                        if(item.Spread)
                            label += `${context.dataset.data[context.dataIndex]} ${numberToString(isAway ? item.awayOdds : item.homeOdds)}`;
                        else if (item.Total)
                            label += `${context.dataset.data[context.dataIndex]} ${numberToString(isAway ? item.overOdds : item.underOdds)}`;
                        else
                            label += context.raw;

                        return label;
                    }
                }
            }
        }
    };

    return (
        <Line options={options} data={data} />
    )
}

export default GameLineHistory;
