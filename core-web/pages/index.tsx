import { GetServerSideProps } from 'next';
import MainSiteLayout from '../components/📐Layouts/MainSiteLayout/MainSiteLayout';
import { getRegion } from '../lib/region';
import { getMenu } from '../lib/template/menu';
import { IRegion } from '../types/region';
import { NextPageWithLayout } from './page';
import test, { NAME } from '@brady-macdonald/sbr-shared-components';

interface IHomeProps {
  menu: any;
  region: IRegion;
}

const Home: NextPageWithLayout<IHomeProps> = ({ menu, region }) => {
  test();

  return (
    <div data-region="on" className="home-page">
      <h1>{NAME}</h1>
      {/* <div id="section-hero" className="hero-banner bg-dark">
        <div className="container">
          <div className="row">
            <div className="hero-banner_content col-lg-7 mt-lg-4">
              <h1 className="display-2 text-uppercase">
                Choose a <span>Trusted</span> Sportsbook
              </h1>
              <p>
                SBR has done your homework for you. <br />
                Compare sportsbooks with features that matter to you.
              </p>
              <p>
                <a
                  href="https://www.sportsbookreview.com/best-sportsbooks/"
                  className="btn btn-primary homepage-hero-cta"
                >
                  See All Sportsbooks
                </a>
              </p>
              <p>
                <Image
                  src="https://img.sportsbookreview.com/uploads/2870f9a0-cae1-453b-8d35-10625abcbd15.png"
                  alt="News Logos"
                  width={621}
                  height={32}
                />
              </p>{' '}
            </div>
            <div className="hero-banner_image col-lg-5">
              <Image
                src="https://img.sportsbookreview.com/uploads/759496b9-5839-4500-83e7-ce259c574d77.png?fm=webp&auto=format&auto=compress&w=379&h=456&fit=crop"
                width="379"
                height="456"
                style={{ width: 'auto', height: 'auto' }}
                alt="Hero Home Compliant"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="top-sportsbooks" className="container">
        <div className="my-3">
          <h2 className="p-3 text-center mb-3">Featured Sportsbooks</h2>

          <div className="row">
            <div className="expandedTopList mb-3">
              <div className="card expandedTopList-itemWrapper">
                <a
                  className="expandedTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="https://media.sia.com/C.ashx?btag=a_12921b_2138c_&amp;affid=2231&amp;siteid=12921&amp;adid=2138&amp;c=sbr_ontario_new"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - Sports Interaction"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/2adc8ca0-0e02-4e8a-a60f-a13d366c5b72.svg"
                    alt="Sports Interaction Review Logo"
                    width="96"
                    height="40"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>

                <a
                  href="https://media.sia.com/C.ashx?btag=a_12921b_2138c_&amp;affid=2231&amp;siteid=12921&amp;adid=2138&amp;c=sbr_ontario_new"
                  className="btn btn-primary mb-3 item-2 external-sportsbook-link"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Visit Site CTA - Sports Interaction"
                >
                  Visit Site
                </a>

                <Image
                  src="https://img.sportsbookreview.com/images/sbr-coins/sbrcoin-a-minus.png?fm=webp&amp;auto=format&amp;auto=compress&amp;h=58"
                  width="58"
                  height="58"
                  alt="Icon rating a-"
                />

                <p className="text-center mb-2 line-limit-3 item-4">
                  Wide Variety of Betting Options{' '}
                </p>

                <div className="text-center item-5">
                  <a
                    href="/betting-sites/sportsinteraction/"
                    data-aatracker="Toplist - Read Review Link - Sports Interaction"
                  >
                    Read Full Review
                  </a>
                </div>
              </div>
              <div className="card expandedTopList-itemWrapper">
                <a
                  className="expandedTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="https://c.sportsbookreview.com/bet365_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - bet365"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/36f967b3-e44b-4ea2-80ac-4af73a50be16.svg"
                    alt="bet365 Review Logo"
                    width="96"
                    height="40"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>

                <a
                  href="https://c.sportsbookreview.com/bet365_ontario"
                  className="btn btn-primary mb-3 item-2 external-sportsbook-link"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Visit Site CTA - bet365"
                >
                  Visit Site
                </a>

                <Image
                  src="https://img.sportsbookreview.com/images/sbr-coins/sbrcoin-a-minus.png?fm=webp&amp;auto=format&amp;auto=compress&amp;h=58"
                  width="58"
                  height="58"
                  alt="Icon rating a-"
                />

                <p className="text-center mb-2 line-limit-3 item-4">
                  Canada&lsquo;s Most Popular Sportsbook{' '}
                </p>

                <div className="text-center item-5">
                  <a
                    href="/betting-sites/bet365/"
                    data-aatracker="Toplist - Read Review Link - bet365"
                  >
                    Read Full Review
                  </a>
                </div>
              </div>
              <div className="card expandedTopList-itemWrapper">
                <a
                  className="expandedTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/fanduel_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - FanDuel"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/64600a3a-b40f-4218-9b98-82ddff2fc5ce.svg"
                    alt="FanDuel Review Logo"
                    width="96"
                    height="40"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>

                <a
                  href="http://c.sportsbookreview.com/fanduel_ontario"
                  className="btn btn-primary mb-3 item-2 external-sportsbook-link"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Visit Site CTA - FanDuel"
                >
                  Visit Site
                </a>

                <Image
                  src="https://img.sportsbookreview.com/images/sbr-coins/sbrcoin-a-minus.png?fm=webp&amp;auto=format&amp;auto=compress&amp;h=58"
                  width="58"
                  height="58"
                  alt="Icon rating a-"
                />

                <p className="text-center mb-2 line-limit-3 item-4">
                  Same Game Parlays{' '}
                </p>

                <div className="text-center item-5">
                  <a
                    href="/betting-sites/fanduel/"
                    data-aatracker="Toplist - Read Review Link - FanDuel"
                  >
                    Read Full Review
                  </a>
                </div>
              </div>
              <div className="card expandedTopList-itemWrapper">
                <a
                  className="expandedTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/caesars_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - Caesars"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/621ee4a1-22af-4040-adf0-dad30e9f459e.svg"
                    alt="Caesars Review Logo"
                    width="96"
                    height="40"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>

                <a
                  href="http://c.sportsbookreview.com/caesars_ontario"
                  className="btn btn-primary mb-3 item-2 external-sportsbook-link"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Visit Site CTA - Caesars"
                >
                  Visit Site
                </a>

                <Image
                  src="https://img.sportsbookreview.com/images/sbr-coins/sbrcoin-a-minus.png?fm=webp&amp;auto=format&amp;auto=compress&amp;h=58"
                  width="58"
                  height="58"
                  alt="Icon rating a-"
                />

                <p className="text-center mb-2 line-limit-3 item-4">
                  Excellent Live Betting Platform{' '}
                </p>

                <div className="text-center item-5">
                  <a
                    href="/betting-sites/caesars/"
                    data-aatracker="Toplist - Read Review Link - Caesars"
                  >
                    Read Full Review
                  </a>
                </div>
              </div>
              <div className="card expandedTopList-itemWrapper">
                <a
                  className="expandedTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/betmgm_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - BetMGM"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/8d0773d0-7942-45e3-9be0-b87f74de7143.svg"
                    alt="BetMGM Review Logo"
                    width="96"
                    height="40"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>

                <a
                  href="http://c.sportsbookreview.com/betmgm_ontario"
                  className="btn btn-primary mb-3 item-2 external-sportsbook-link"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Visit Site CTA - BetMGM"
                >
                  Visit Site
                </a>

                <Image
                  src="https://img.sportsbookreview.com/images/sbr-coins/sbrcoin-a-minus.png?fm=webp&amp;auto=format&amp;auto=compress&amp;h=58"
                  width="58"
                  height="58"
                  alt="Icon rating a-"
                />

                <p className="text-center mb-2 line-limit-3 item-4">
                  Live Betting Odds{' '}
                </p>

                <div className="text-center item-5">
                  <a
                    href="/betting-sites/betmgm-sportsbook/"
                    data-aatracker="Toplist - Read Review Link - BetMGM"
                  >
                    Read Full Review
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-2 mb-4">
        <div className="w-100 bg-lighter shadow mb-0 mb-md-3 mb-lg-0 border-secondary rounded-1 p-3 d-flex flex-column-reverse flex-lg-row justify-content-between">
          <div className="pe-lg-3 d-flex flex-column align-items-start justify-content-center">
            <p className="mb-0">
              <b>19+. Gambling can be addictive, please play responsibly</b>
            </p>
          </div>
          <div className="d-lg-flex align-items-center mb-3 mb-lg-0">
            <a
              className="me-3 py-2 d-inline-block"
              href="https://igamingontario.ca/"
              rel="nofollow"
            >
              <Image
                alt="iGaming Ontario Logo"
                width="112"
                height="32"
                src="https://img.sportsbookreview.com/images/compliance/iGaming-on-logo.png?auto=compress&amp;auto=format&amp;w=112&amp;h=32"
              />
            </a>
            <a
              className="py-2 d-inline-block"
              href="https://www.connexontario.ca/en-ca/"
              rel="nofollow"
            >
              <Image
                alt="Connex Ontario Logo"
                width="162"
                height="32"
                src="https://img.sportsbookreview.com/images/compliance/connex-on-logo.png?auto=compress&amp;auto=format&amp;w=162&amp;h=32"
              />
            </a>
          </div>
        </div>
      </div>

      <section className="content-section bg-dark pt-3 pb-0 pb-lg-8 pb-xl-8">
        <div className="container">
          <div className="row justify-content-between">
            <h2 className="text-center">
              What you can find on Sportsbook Review?
            </h2>
            <div className="col-lg-7 my-3">
              <h3 className="">Best Online Sportsbooks</h3>
              <p className="">
                Sportsbook Review has some of the industry’s top-rated&nbsp;
                <a
                  href="https://www.sportsbookreview.com/best-sportsbooks/sports-betting-apps/"
                  className=""
                >
                  sports betting apps
                </a>
                &nbsp;&amp; sportsbook ratings and reviews.{' '}
                <a
                  href="https://www.sportsbookreview.com/betting-sites/caesars/"
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  Caesars
                </a>
                ,{' '}
                <a
                  href="https://www.sportsbookreview.com/betting-sites/betmgm-sportsbook/"
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  BetMGM
                </a>
                ,{' '}
                <a
                  href="http://www.sportsbookreview.com/betting-sites/draftkings/"
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  DraftKings
                </a>
                ,{' '}
                <a
                  href="http://www.sportsbookreview.com/betting-sites/fanduel/"
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  FanDuel
                </a>
                &nbsp;&amp; more. Be sure to take advantage of the{' '}
                <a href="https://www.sportsbookreview.com/bonuses/">
                  best sportsbook promos
                </a>
                , too. Here's the best sports{' '}
                <a href="https://www.sportsbookreview.com/betting-sites/">
                  betting sites
                </a>{' '}
                for the next upcoming events in sports:
              </p>
              <p className="">
                <a href="https://www.sportsbookreview.com/best-sportsbooks/nhl-betting-sites/">
                  NHL Betting Sites
                </a>
              </p>
              <p className="">
                <a
                  href="https://www.sportsbookreview.com/best-sportsbooks/nba-betting-sites/"
                  className=""
                >
                  NBA Betting Sites
                </a>
              </p>
              <p className="">
                <a
                  href="https://www.sportsbookreview.com/best-sportsbooks/"
                  target="_blank"
                  className="btn btn-outline-secondary"
                  rel="noreferrer"
                >
                  Sportsbook Reviews
                </a>
              </p>
              <h3 className="">Sports Betting News</h3>
              <p className="">
                Read the latest breaking news in the sports betting world. SBR
                monitors and releases information about{' '}
                <a href="http://www.sportsbookreview.com/betting-sites/">
                  online sports betting sites
                </a>{' '}
                and US &amp; CA betting launches: The good, the bad, and
                occasionally the ugly. Here are a couple of states we're
                monitoring:
              </p>
              <ul>
                <li>
                  <a
                    href="https://www.sportsbookreview.com/best-sportsbooks-ohio/"
                    target="_blank"
                    className=""
                    rel="noreferrer"
                  >
                    Ohio Sports Betting
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    href="https://www.sportsbookreview.com/bonuses-ohio/"
                    className=""
                  >
                    Ohio Sports Betting Promos
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    href="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/"
                    target="_blank"
                    className=""
                    rel="noreferrer"
                  >
                    Massachusetts Sports Betting
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="https://www.sportsbookreview.com/bonuses-massachusetts/">
                    Massachusetts Sports Betting Promos
                  </a>
                </li>
              </ul>
              <p className="">
                <a
                  href="https://www.sportsbookreview.com/news/"
                  target="_blank"
                  className="btn btn-outline-secondary"
                  rel="noreferrer"
                >
                  &nbsp;Betting News
                </a>
              </p>
              <h3 className="">Betting Odds &amp; Lines</h3>
              <p className="">
                Compare real-time odds from more than 30 online sportsbooks
                using SBR Odds. Monitor live scores, track line history, and
                dive into a world of handicapping stats.
              </p>
              <p className="">
                <a
                  href="https://www.sportsbookreview.com/betting-odds/"
                  target="_blank"
                  className="btn btn-outline-secondary"
                  rel="noreferrer"
                >
                  &nbsp;Betting Odds
                </a>
              </p>
              <h3 className="">Free Sports Picks</h3>
              <p className="">
                Read about best bets for today and betting predictions from
                SBR’s betting experts. SBR publishes a variety of daily written
                and video betting content for handicappers across a range of US
                facing and international sports.
              </p>
              <p className="">
                <a
                  href="https://www.sportsbookreview.com/picks/"
                  target="_blank"
                  className="btn btn-outline-secondary"
                  rel="noreferrer"
                >
                  Best Bets Today
                </a>
              </p>
              <h3 className="">SBR Community</h3>
              <p className="">
                The history of{' '}
                <a
                  href="https://www.sportsbookreview.com/about-sbr/"
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  SBR has been about
                </a>{' '}
                community. Create a Free SBR Forum account to chat with other
                like-minded sports bettors on our{' '}
                <a href="https://www.sportsbookreview.com/forum/">forums</a>,
                participate in free{' '}
                <a href="https://contests.sportsbookreview.com/">contests</a>,
                and hone your handicapping skills.
              </p>
              <p className="">+60M Topics</p>
              <h3 className="">Rewards</h3>
              <p className="">
                What are you waiting for? Register an SBR Forum account using
                the blue button below to get started!
              </p>
              <p className="">+$820,000 Contest Prizes Won</p>
              <p className="">+9.8M Betpoints Earned</p>
              <p className="">
                <a
                  href="https://login.sportsbookreview.com/register/?r=http://www.sportsbookreview.com/forum/registered.php"
                  className="btn btn-primary"
                  target="_self"
                >
                  Become The Next Winner
                </a>
              </p>
            </div>
            <div className="col-lg-3 my-0 my-lg-3">
              <div className="sidebar-wrapper bg-darker p-5">
                <div className="sidebar-bricks">
                  <h2>Legal Online Betting</h2>
                  <br />
                  <a
                    href="https://www.sportsbookreview.com/betting-sites/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Best U.S. Betting Sites
                  </a>{' '}
                  <span>
                    »<br />
                    <span
                      className="ui-provider dlx dly c d e f g h i j k l m n o p q r s t dlz dma w x y z ab ac ae af ag ah ai aj ak"
                      dir="ltr"
                    ></span>
                  </span>
                  <ul>
                    <li>
                      <a
                        href="https://www.sportsbookreview.com/best-sportsbooks-arizona/"
                        title="https://www.sportsbookreview.com/best-sportsbooks-arizona/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Arizona Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link Illinois Sports Betting"
                        title="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/"
                        href="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        Illinois Sports Betting
                      </a>
                      <a
                        aria-label="Link Arizona Sports Betting"
                        title="https://www.sportsbookreview.com/best-sportsbooks-arizona/"
                        href="https://www.sportsbookreview.com/best-sportsbooks-arizona/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      ></a>
                    </li>
                    <li>
                      <a
                        href="https://www.sportsbookreview.com/best-sportsbooks-indiana/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Indiana Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link Louisiana Sports Betting"
                        title="https://www.sportsbookreview.com/best-sportsbooks-louisiana/"
                        href="https://www.sportsbookreview.com/best-sportsbooks-louisiana/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        Louisiana Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link Maryland Sports Betting"
                        title="http://www.sportsbookreview.com/best-sportsbooks-maryland/"
                        href="http://www.sportsbookreview.com/best-sportsbooks-maryland/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        Maryland Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link Massachusetts Sports Betting"
                        title="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/"
                        href="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        Massachusetts Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.sportsbookreview.com/best-sportsbooks-michigan/"
                        title="https://www.sportsbookreview.com/best-sportsbooks-colorado/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Michigan Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link New Jersey Sports Betting"
                        title="https://www.sportsbookreview.com/best-sportsbooks-new-jersey/"
                        href="https://www.sportsbookreview.com/best-sportsbooks-new-jersey/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        New Jersey Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link New York Sports Betting"
                        title="https://www.sportsbookreview.com/best-sportsbooks-new-york/"
                        href="https://www.sportsbookreview.com/best-sportsbooks-new-york/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        New York Sports Betting
                      </a>
                      <a
                        aria-label="Link New Jersey Sports Betting"
                        title="https://www.sportsbookreview.com/best-sportsbooks-new-jersey/"
                        href="https://www.sportsbookreview.com/best-sportsbooks-new-jersey/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      ></a>
                    </li>
                    <li>
                      <a
                        aria-label="Link Ohio Sports Betting"
                        title="https://www.sportsbookreview.com/best-sportsbooks-ohio/"
                        href="https://www.sportsbookreview.com/best-sportsbooks-ohio/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        Ohio Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        aria-label="Link Pennsylvania Sports Betting"
                        title="http://www.sportsbookreview.com/best-sportsbooks-pennsylvania/"
                        href="http://www.sportsbookreview.com/best-sportsbooks-pennsylvania/"
                        rel="noreferrer noopener"
                        target="_blank"
                        className="fui-Link ___1qmgydl f3rmtva f1ewtqcl fyind8e f1k6fduh f1w7gpdv fk6fouc fjoy568 figsok6 f1hu3pq6 f11qmguv f19f4twv f1tyq0we f1g0x7ka fhxju0i f1qch9an f1cnd47f fqv5qza f1vmzxwi f1o700av f13mvf36 f1cmlufx f9n3di6 f1ids18y f1tx3yz7 f1deo86v f1eh06m1 f1iescvh ftqa4ok f2hkw1w fhgqx19 f1olyrje f1p93eir f1h8hb77 f1x7u7e9 f10aw75t fsle3fq"
                      >
                        Pennsylvania Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.sportsbookreview.com/best-sportsbooks-tennessee/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tennessee Sports Betting
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.sportsbookreview.com/best-sportsbooks-virginia/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Virginia Sports Betting
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-7">
        <div className="row linkBlocks">
          <div className="col-lg-4 linkBlocks-item mb-2 mb-lg-0 mb-xl-0">
            <a
              className="homepage-link-block bg-lighter d-block p-5 rounded-1 animate animate-icon-forward"
              href="/best-sportsbooks-ontario/"
            >
              <Image
                src="https://img.sportsbookreview.com/images/icons/star_border.svg"
                alt=""
                width={64}
                height={64}
              />
              <h3 className="mt-4 d-flex justify-content-between align-items-end">
                Best <br className="d-sm-none d-md-none d-lg-block" />
                Sportsbooks <span className="mat-icon-arrow-right-alt"></span>
              </h3>
            </a>
          </div>
          <div className="col-lg-4 linkBlocks-item mb-2 mb-lg-0 mb-xl-0">
            <a
              className="homepage-link-block bg-lighter d-block p-5 rounded-1 animate animate-icon-forward"
              href="/betting-sites-ontario/"
            >
              <Image
                src="https://img.sportsbookreview.com/images/icons/monetization_on.svg"
                alt=""
                width={64}
                height={64}
              />
              <h3 className="mt-4 d-flex justify-content-between align-items-end">
                Betting Sites <br className="d-sm-none d-md-none d-lg-block" />
                Reviewed <span className="mat-icon-arrow-right-alt"></span>
              </h3>
            </a>
          </div>
          <div className="col-lg-4 linkBlocks-item mb-2 mb-lg-0 mb-xl-0">
            <a
              className="homepage-link-block bg-lighter d-block p-5 rounded-1 animate animate-icon-forward"
              href="/betting-calculators/"
            >
              <Image
                src="https://img.sportsbookreview.com/images/icons/calculate.svg"
                alt=""
                width={64}
                height={64}
              />
              <h3 className="mt-4 d-flex justify-content-between align-items-end">
                Betting <br className="d-sm-none d-md-none d-lg-block" />
                Calculators <span className="mat-icon-arrow-right-alt"></span>
              </h3>
            </a>
          </div>
        </div>
      </div>

      <div id="banner" className="container mt-7">
        <div className="row">
          <div className="col-12">
            <div className="bg-bright_blue bg-pattern-sbr bg-pattern-mr bg-offset-2 p-5 rounded-1">
              <div className="col-sm-8 col-md-6">
                <h2 className="mb-3">
                  Why Trust{' '}
                  <span className="h3 d-block">Sportsbook Review?</span>
                </h2>
                <p>
                  SBR is dedicated to providing players with an honest and
                  unbiased approach to sports betting. Find out more about our
                  processes for reviews, picks, and news.
                </p>
                <a
                  className="btn btn-secondary mt-5 mb-9 mb-lg-0 mb-xl-0 homepage-link-banner"
                  href="/news/sbr-editorial-policy/"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-faqs">
                <h2 id="FAQs" className="h3 divider-small jumpTarget">
                  FAQs
                </h2>
              </div>

              <div className="faqWrapper pb-4">
                <div id="faqItem-0" className="faqItem animate animate-fade">
                  <div
                    className="faqTitleWrapper"
                    data-toggle="dropdown-smooth"
                    data-target="faqItem-0"
                    data-aatracker="Accordion - FAQ - Where can I legally bet?"
                  >
                    <h3 className="h4">Where can I legally bet?</h3>
                    <div className="faqCaretWrapper">
                      <span className="sbr-icon-chevron-down"></span>
                    </div>
                  </div>

                  <div className="faqDropdownWrapper smoothDropdownWrapper">
                    <div className="faqDropdownContent smoothDropdownContent content-section">
                      <p>
                        In the US, sportsbooks are regulated and can legally
                        take online bets in a growing number of states. Read
                        more about these states&lsquo; sports betting
                        landscapes:
                      </p>
                      <ul>
                        <li>
                          <a href="https://www.sportsbookreview.com/best-sportsbooks-ohio/">
                            Ohio Sports Betting
                          </a>
                        </li>
                        <li>
                          <a href="http://www.sportsbookreview.com/best-sportsbooks-maryland/">
                            Maryland Sports Betting
                          </a>
                        </li>
                        <li>
                          <a href="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/">
                            Massachusetts Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-new-york/"
                            target="_self"
                          >
                            New York Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="http://www.sportsbookreview.com/best-sportsbooks-pennsylvania/"
                            target="_self"
                          >
                            Pennsylvania Sports Betting
                          </a>
                        </li>
                        <li>
                          <a href="http://www.sportsbookreview.com/best-sportsbooks-massachusetts/">
                            Illinois Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-arizona/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Arizona Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-arkansas/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Arkansas Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-colorado/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Colorado Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-connecticut/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Connecticut Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-delaware/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Delaware Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-illinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Illinois Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-indiana/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Indiana Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-iowa/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Iowa Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-kansas/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Kansas Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-louisiana/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Louisiana Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-michigan/"
                            target="_self"
                          >
                            Michigan Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-mississippi/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Mississippi Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-nevada/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Nevada Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-new-hampshire/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            New Hampshire Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-new-jersey/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            New Jersey Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-north-carolina/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            North Carolina Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-oregon/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Oregon Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-rhode-island/"
                            target="_self"
                          >
                            Rhode Island Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-tennessee/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tennessee Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-virginia/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Virginia Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-washington/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Washington Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-dc/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DC Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-west-virginia/"
                            target="_self"
                          >
                            West Virginia Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-wisconsin/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Wisconsin Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-wyoming/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Wyoming Sports Betting
                          </a>
                        </li>
                      </ul>
                      <p>
                        Canada also has limited legal online sports betting:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-ontario/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ontario Sports Betting
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/best-sportsbooks-canada/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Canada Sports Betting
                          </a>{' '}
                          (outside ON)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="faqItem-1" className="faqItem animate animate-fade">
                  <div
                    className="faqTitleWrapper"
                    data-toggle="dropdown-smooth"
                    data-target="faqItem-1"
                    data-aatracker="Accordion - FAQ - Where can I find the best sportsbook promos in my region?"
                  >
                    <h3 className="h4">
                      Where can I find the best sportsbook promos in my region?
                    </h3>
                    <div className="faqCaretWrapper">
                      <span className="sbr-icon-chevron-down"></span>
                    </div>
                  </div>

                  <div className="faqDropdownWrapper smoothDropdownWrapper">
                    <div className="faqDropdownContent smoothDropdownContent content-section">
                      <p>
                        Sportsbooks make different sports betting promos
                        available based on the region you are in. Click your
                        region below to find out more:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/bonuses-ohio/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ohio Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-new-york/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            New York Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-massachusetts/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Massachusetts Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-maryland/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Maryland Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-illinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Illinois Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-pennsylvania/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Pennsylvania Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-new-jersey/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            New Jersey Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-colorado/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Colorado Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/bonuses-arizona/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Arizona Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.sportsbookreview.com/bonuses-indiana/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Indiana Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-michigan/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Michigan Sportsbooks Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-virginia/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Virginia Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-kansas/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Kansas Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-louisiana/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Louisiana Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-tennessee/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tennessee Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-maine/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Maine Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-west-virginia/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            West Virginia Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-wyoming/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Wyoming Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-connecticut/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Connecticut Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-iowa/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Iowa Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-north-carolina/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            North Carolina Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-dc/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DC Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-new-hampshire/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            New Hampshire Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-rhode-island/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Rhode Island Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-arkansas/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Arkansas Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-nevada/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Nevada Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-oregon/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Oregon Sportsbook Promos
                          </a>
                        </li>
                        <li>
                          <a
                            title=""
                            href="https://www.sportsbookreview.com/bonuses-washington/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Washington Sportsbook Promos
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="faqItem-2" className="faqItem animate animate-fade">
                  <div
                    className="faqTitleWrapper"
                    data-toggle="dropdown-smooth"
                    data-target="faqItem-2"
                    data-aatracker="Accordion - FAQ - How do sportsbook promotions work?"
                  >
                    <h3 className="h4">How do sportsbook promotions work?</h3>
                    <div className="faqCaretWrapper">
                      <span className="sbr-icon-chevron-down"></span>
                    </div>
                  </div>

                  <div className="faqDropdownWrapper smoothDropdownWrapper">
                    <div className="faqDropdownContent smoothDropdownContent content-section">
                      <p className="">
                        The online sports betting industry is extremely
                        competitive and a number sportsbooks are battling to win
                        your business with many types of promos. Fortunately,
                        SBR has done the hard work for you and has all the info
                        you need in one place.
                      </p>
                      <p className="">
                        We monitor the industry on a daily basis and then
                        compile all the best sportsbook bonuses in one handy
                        place. Visit our&nbsp;best sportsbook promos&nbsp;to
                        browse the various bonuses that bookmakers are currently
                        promoting. You should also do research on the type of
                        promo each operator offers. For instance,&nbsp;
                        <a
                          href="https://www.sportsbookreview.com/bonuses/draftkings-promo-code/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          DraftKings promos
                        </a>
                        &nbsp;and&nbsp;
                        <a
                          href="https://www.sportsbookreview.com/bonuses/fanduel-promo-code/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          FanDuel promos
                        </a>
                        &nbsp;may be quite different. Check out these pages for
                        other sportsbooks&lsquo; promos:
                      </p>
                      <ul>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/caesars-promo-code/">
                            Caesars Promo Codes
                          </a>
                        </li>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/pointsbet-promo-code/">
                            PointsBet Promo Codes
                          </a>
                        </li>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/barstool-promo-code/">
                            Barstool Promo Codes
                          </a>
                        </li>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/bet365-promo-code/">
                            bet365 Promo Codes
                          </a>
                        </li>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/betrivers-promo-code/">
                            BetRivers Promo Codes
                          </a>
                        </li>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/wynnbet-promo-code/">
                            WynnBet Promo Codes
                          </a>
                        </li>
                        <li>
                          <a href="https://www.sportsbookreview.com/bonuses/unibet-promo-code/">
                            Unibet Promo Codes
                          </a>
                        </li>
                      </ul>
                      <p className="">
                        It is also worth bearing in mind that sportsbook bonuses
                        are not always as compelling as they initially sound.
                        Some sports betting sites require you to roll the bonus
                        cash over a huge amount of times before it is possible
                        to make a withdrawal.
                      </p>
                    </div>
                  </div>
                </div>
                <div id="faqItem-3" className="faqItem animate animate-fade">
                  <div
                    className="faqTitleWrapper"
                    data-toggle="dropdown-smooth"
                    data-target="faqItem-3"
                    data-aatracker="Accordion - FAQ - What are upcoming sports events to bet on?"
                  >
                    <h3 className="h4">
                      What are upcoming sports events to bet on?
                    </h3>
                    <div className="faqCaretWrapper">
                      <span className="sbr-icon-chevron-down"></span>
                    </div>
                  </div>

                  <div className="faqDropdownWrapper smoothDropdownWrapper">
                    <div className="faqDropdownContent smoothDropdownContent content-section">
                      <p className="">
                        March Madness is one of the most highly anticipated and
                        exciting events in college sports, where dozens of
                        college basketball teams compete in a single-elimination
                        tournament to determine the national champion. With the
                        tournament rapidly approaching, sports bettors are
                        gearing up to place their bets today.&nbsp;
                      </p>
                      <p className="">
                        The March Madness tournament is between Tuesday, March
                        14, 2023 to Monday, April 3, 2023, and bettors have
                        started their line shopping from top&nbsp;
                        <a href="https://www.sportsbookreview.com/best-sportsbooks/march-madness-betting-sites/">
                          March Madness betting sites
                        </a>
                        .
                      </p>
                      <p className="">
                        Outside of sports events, the{' '}
                        <a href="https://www.sportsbookreview.com/best-sportsbooks-massachusetts/">
                          Massachusetts sports betting
                        </a>{' '}
                        launch is around the corner. Bay Staters, or
                        Massachusettsans, can now legally bet starting on
                        Friday, March 10, 2023 at 10 a.m. Eastern Time. That
                        includes taking advantage of multiple{' '}
                        <a href="https://www.sportsbookreview.com/bonuses-massachusetts/">
                          Massachusetts sportsbook promos
                        </a>
                        , too.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="compact-top-sportsbooks" className="container">
        <div className="my-3">
          <h2 className="p-3 text-center mb-3">Featured Online Sportsbooks</h2>

          <div className="row">
            <div className="compactTopList mb-3 text-center m-auto">
              <div className="card compactTopList-itemWrapper d-flex">
                <a
                  className="compactTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="https://media.sia.com/C.ashx?btag=a_12921b_2138c_&amp;affid=2231&amp;siteid=12921&amp;adid=2138&amp;c=sbr_ontario_new"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - Sports Interaction"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/2adc8ca0-0e02-4e8a-a60f-a13d366c5b72.svg"
                    alt="Sports Interaction Review Logo"
                    width="93"
                    height="26"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>
              </div>
              <div className="card compactTopList-itemWrapper d-flex">
                <a
                  className="compactTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="https://c.sportsbookreview.com/bet365_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - bet365"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/36f967b3-e44b-4ea2-80ac-4af73a50be16.svg"
                    alt="bet365 Review Logo"
                    width="93"
                    height="26"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>
              </div>
              <div className="card compactTopList-itemWrapper d-flex">
                <a
                  className="compactTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/fanduel_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - FanDuel"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/64600a3a-b40f-4218-9b98-82ddff2fc5ce.svg"
                    alt="FanDuel Review Logo"
                    width="93"
                    height="26"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>
              </div>
              <div className="card compactTopList-itemWrapper d-flex">
                <a
                  className="compactTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/caesars_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - Caesars"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/621ee4a1-22af-4040-adf0-dad30e9f459e.svg"
                    alt="Caesars Review Logo"
                    width="93"
                    height="26"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>
              </div>
              <div className="card compactTopList-itemWrapper d-flex">
                <a
                  className="compactTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/betmgm_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - BetMGM"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/8d0773d0-7942-45e3-9be0-b87f74de7143.svg"
                    alt="BetMGM Review Logo"
                    width="93"
                    height="26"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>
              </div>
              <div className="card compactTopList-itemWrapper d-flex">
                <a
                  className="compactTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link"
                  href="http://c.sportsbookreview.com/draftkings_ontario"
                  title="Play Now"
                  target="_blank"
                  rel="nofollow noreferrer"
                  data-aatracker="Toplist - Partner Logo - DraftKings"
                >
                  <Image
                    src="https://img.sportsbookreview.com/uploads/8459da88-541e-413d-a777-febea5d27fc5.svg"
                    alt="DraftKings Review Logo"
                    width="93"
                    height="26"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div> 
      </div>*/}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<IHomeProps> = async ({
  req,
}) => {
  const menu = await getMenu();
  const region = await getRegion(req);

  return {
    props: {
      menu,
      region,
    },
  };
};

Home.getLayout = (page, menu, region) => {
  return (
    <MainSiteLayout menu={menu} region={region}>
      {page}
    </MainSiteLayout>
  );
};
