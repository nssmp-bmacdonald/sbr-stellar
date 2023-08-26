import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Slider from "react-slick";

import FutureCells from '/components/futures/partials/FutureCells';

import style from '/styles/odds-table/OddsTableMobile.module.scss';
import { LOGOS_URL } from '/constants/seo';

function TeamRowsMobile({ rows, oddsFormat, sportsbooks }) {
  return(
    <>
      {
        rows.map((row, index) =>
          <TeamRow key={index} row={row} index={index} sportsbooks={sportsbooks} oddsFormat={oddsFormat} />
        )
      }
    </>
  );
}

const TeamRow = ({ row, index, sportsbooks, oddsFormat }) => {
  // eslint-disable-next-line no-unused-vars
  const [sliderPosition, setSliderPosition] = useState(0);

  const updateSliderPosition = position => setSliderPosition(position);

  return (
    <div key={index} id={`team-${row.team.TeamId}`}>
        <div className={style.eventGridContainer}>
            <HeaderControl data={row.team} />
            <BettingNumbers data={row} logos={sportsbooks} updateSliderPosition={updateSliderPosition} oddsFormat={oddsFormat} />
        </div>
    </div>
  )
}

const HeaderControl = ({ data }) => {
  return (
    <div className={`border-right ${style.leftBoxContainer}`}>
      <div className={`bckg-gray ${style.tableHeader}`}></div>
      <div className={`${style.bettingOptions} border-left`}
            data-horizontal-eid={data.TeamId}>
            <div className={style.participantContainer}>
                <div className={`${style.participantData} py-2 pl-2`}>
                  <span>{data.TeamFullName}</span>
                </div>
            </div>
      </div>
  </div>
  )
}

const BettingNumbers = ({ data, logos, updateSliderPosition, oddsFormat }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
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
    },
  };
  return (
    <div className={`${style.oddsNumberContainer}`}>
      <Slider {...settings}>
        <div className={`${style.numbersContainer} border-left`}>
          <div className={`${style.tableHeader} text-center bckg-gray`}><b>OPENER</b></div>
          <FutureCells data={data.openingLineViews} id={0} isOdds={false} oddsFormat={oddsFormat}/>
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
                <FutureCells data={data.oddsViews} id={index} isOdds={true} oddsFormat={oddsFormat} />
            </div>
          )
        }
      </Slider>
    </div>
  )

}

export default TeamRowsMobile;
