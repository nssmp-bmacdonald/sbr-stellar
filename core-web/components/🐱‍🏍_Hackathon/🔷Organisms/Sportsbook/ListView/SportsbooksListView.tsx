import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '../../../../💎Atoms/Icon/Icon';
import ProsCons from '../../../💠Molecules/Pros.Cons/Pros.Cons';

interface SpListViewProps {
  isSponsor: false | true;
  sportsbooksList: any[];
  heading?: string;
  theme?: 'dark' | 'darker' | 'light' | 'white';
  logoType?: 'monochrome' | 'color' | 'colorBackground';
  viewType?: 'bonus' | 'toplist' | 'review';
  logoWidth?: number;
  logoHeight?: number;
  visibleItems: number;
  favoriteTheme: false | true;
}

export const SportsbooksListView: React.FC<SpListViewProps> = ({
  isSponsor = true,
  sportsbooksList,
  heading,
  theme,
  logoType = 'colorBackground',
  viewType = 'review',
  logoWidth,
  logoHeight,
  visibleItems = 5,
  favoriteTheme = false,
}) => {
  const { data: session, status } = useSession();

  const [itemVisibility, setItemVisibility] = useState(false);
  const [favSPs, setFavSPs] = useState(
    session?.hubspot.favorite_sportsbooks
      ? session?.hubspot.favorite_sportsbooks
      : ''
  );

  const changeVisibility = (e: any) => {
    setItemVisibility(!itemVisibility);
  };

  const addFavorite = async (sp: any) => {
    const userBooks = session?.hubspot.favorite_sportsbooks
      ? session?.hubspot.favorite_sportsbooks
      : '';

    let dataFavBooks = `${userBooks};${sp.name}`;

    if (favSPs.indexOf(sp.name) > -1) {
      dataFavBooks = userBooks.replace(';' + sp.name, '');
    }

    setFavSPs(dataFavBooks);

    await fetch('/api/hubspot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: session?.hubspot.id,
        data: {
          favorite_sportsbooks: dataFavBooks,
        },
      }),
    });

    //updateSession();
  };

  const userAssociation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      console.log(
        'we should add this sportsbook as an association for the user'
      );
      if (e.isTrusted) {
        window.location = e.target.getAttribute('href');
      }
      return null;
    } else {
      window.location = e.target.getAttribute('href');
      return null;
    }
  };

  // {* https://www.nngroup.com/articles/cards-component/ *}
  return (
    <>
      {sportsbooksList ? (
        <div className="container pt-3">
          <div className="row">
            <div className="col-12 p-0">
              {heading ? (
                <h2
                  className="mt-3 mb-4 jumpTarget"
                  id={heading.toLowerCase().replace(' ', '-')}
                >
                  {heading}
                </h2>
              ) : (
                ''
              )}
              {sportsbooksList?.map((spItem: any, idKey: number) => (
                <div
                  key={idKey}
                  className={`bg-${theme} position-relative p-3 mb-4 rounded-1 ${
                    idKey < visibleItems
                      ? 'd-block'
                      : !itemVisibility
                      ? 'd-none'
                      : 'd-block'
                  } ${
                    isSponsor
                      ? 'border border-primary shadow-primary d-flex align-items-sm-center flex-column flex-sm-row'
                      : ''
                  }`}
                >
                  {favoriteTheme && session ? (
                    <button
                      className="no-button me-3"
                      onClick={() => addFavorite(spItem)}
                    >
                      <div className="ribbon slant-down">
                        <div className="content white">
                          <Icon
                            icon={`mat-icon-favorite${
                              favSPs.indexOf(spItem.name) > -1 ? '' : '-border'
                            }`}
                            size="24"
                            color="blue"
                          />
                        </div>
                      </div>
                    </button>
                  ) : (
                    ''
                  )}

                  <div
                    className={`top-sportsbook-top w-100 row justify-content-between ${
                      isSponsor ? '' : 'mb-3'
                    }`}
                  >
                    <div className="top-sportsbook-top__left col-lg-10">
                      <div className="row">
                        <div className="top-sportsbook-logo col-auto">
                          <Link href={spItem.affiliateLink} legacyBehavior>
                            <a
                              className="external-sportsbook-link external-sportsbook-logo-link"
                              target="_blank"
                              rel="nofollow"
                              onClick={userAssociation}
                              data-aatracker="@sponsoredPartner.GetTrackerSponsorLogo()"
                            >
                              <Image
                                src={`${process.env.NEXT_PUBLIC_CDN_URL}${
                                  process.env.NEXT_PUBLIC_CDN_FOLDER
                                }/${
                                  logoType === 'colorBackground'
                                    ? spItem.playbook.iconColorBackground
                                        .fileName
                                    : logoType === 'monochrome'
                                    ? spItem.playbook.iconMonochrome.fileName
                                    : spItem.playbook.iconColor.fileName
                                }`}
                                alt=""
                                width={logoWidth}
                                height={logoHeight}
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="top-sportsbook-detail col-auto">
                          {isSponsor ? (
                            <div>
                              <span className="badge badge-primary">
                                Sponsored
                              </span>
                            </div>
                          ) : (
                            ''
                          )}
                          {spItem ? (
                            viewType === 'toplist' ? (
                              <div className="col">
                                {spItem.bonus?.primaryPromo?.headline ? (
                                  <h3 className="mb-2">
                                    {spItem.bonus?.primaryPromo.headline}
                                  </h3>
                                ) : spItem.playbook?.tagline ? (
                                  <h3 className="mb-2">
                                    {spItem.playbook?.tagline}
                                  </h3>
                                ) : (
                                  ''
                                )}
                                {/* {sportsbook.Info?.StateDisclaimer is not null)
                                    {
                                        <p class="small mb-2">@Html.Raw(sportsbook.Info.StateDisclaimer.Replace("<p class=\'\'>", "").Replace("</p>", ""))</p>
                                    } */}
                                {spItem.playbook?.featureTags ? (
                                  <ul className="featured-tags list-unstyled d-flex flex-column flex-md-row flex-lg-row flex-xl-row justify-content-start align-items-start align-items-lg-center align-items-xl-center mb-0">
                                    {spItem.playbook?.featureTags.map(
                                      (tag: any, inTag: number) => (
                                        <li
                                          key={inTag}
                                          id={`${tag.value}-${inTag}`}
                                          className="pe-3 d-flex align-items-start align-items-lg-center align-items-xl-center"
                                        >
                                          <span
                                            className={`${tag.className} icon-green me-2`}
                                          ></span>{' '}
                                          {tag.name}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  ''
                                )}
                              </div>
                            ) : (
                              <h2 className="h4">{spItem.name}</h2>
                            )
                          ) : (
                            ''
                          )}
                          <p className="mb-0">{spItem.playbook.tagline}</p>
                        </div>
                      </div>
                    </div>
                    <div className="top-sportsbook-top__right col-lg-2 text-end">
                      {viewType === 'toplist' ? (
                        <div className="top-sportsbook-rating text-end d-flex align-items-center justify-content-end">
                          <img
                            src={`${process.env.NEXT_PUBLIC_CDN_URL}/${spItem.rating.gradeIcon}?fm=webp&auto=format&auto=compress&h=55`}
                            width="55"
                            height="55"
                            alt={`Icon rating ${spItem.rating.grade.toLowerCase()}`}
                          />
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <Link href={spItem.affiliateLink} legacyBehavior>
                            <a
                              className="btn btn-secondary external-sportsbook-link w-100 d-flex align-items-center justify-content-center"
                              style={{ whiteSpace: 'nowrap' }}
                              target="_blank"
                              rel="nofollow"
                              onClick={userAssociation}
                              data-aatracker="@sponsoredPartner.GetTrackerSponsorSiteCTA()"
                            >
                              {spItem.playbook.playNowButton}{' '}
                              <Icon
                                icon="ms-2 mat-icon-arrow-right-alt"
                                size="16"
                                color="white"
                              />
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {viewType === 'toplist' ? (
                    <div className="top-sportsbook-bottom row">
                      <div className="to-sportsbook-bottom__tabs col-12">
                        <ul
                          className="nav nav-tabs"
                          id={`top-best-sportsbook-list-${idKey}`}
                          role="tablist"
                        >
                          {spItem.prosCons ? (
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id={`pros-cons-${idKey}-tab-${idKey}`}
                                data-bs-toggle="tab"
                                data-bs-target={`#pros-cons-${idKey}`}
                                type="button"
                                role="tab"
                                aria-controls={`pros-cons-${idKey}`}
                                aria-selected="true"
                                data-aatracker={`Tabs - Top Sportsbook List - Pros & Cons - ${spItem.playbook.titleH1}`}
                              >
                                Pros & Cons
                              </button>
                            </li>
                          ) : (
                            ''
                          )}
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${
                                spItem.prosCons ? '' : ' active'
                              }`}
                              id={`overview-${idKey}-tab-${idKey}r`}
                              data-toggle="tab"
                              data-target={`#overview-${idKey}`}
                              type="button"
                              role="tab"
                              aria-controls={`overview-${idKey}`}
                              aria-selected="false"
                              data-aatracker={`Tabs - Top Sportsbook List - Overview - ${spItem.playbook.titleH1}`}
                            >
                              Overview
                            </button>
                          </li>
                        </ul>

                        <div className="tab-content pt-4 mb-5">
                          {spItem.prosCons ? (
                            <div
                              className="tab-pane active"
                              id={`pros-cons-${idKey}`}
                              role="tabpanel"
                              aria-labelledby={`pros-cons-${idKey}-tab-${idKey}`}
                            >
                              {spItem.prosCons ? (
                                <div className="row">
                                  <ProsCons
                                    className="col-md-6 mb-3 mb-md-0 mb-lg-0 mb-xl-0"
                                    pcData={spItem.prosCons}
                                    type={true}
                                    max={2}
                                  />
                                  <ProsCons
                                    className="col-md-6"
                                    pcData={spItem.prosCons}
                                    type={false}
                                    max={2}
                                  />
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                          <div
                            className="tab-pane"
                            id={`overview-${idKey}`}
                            role="tabpanel"
                            aria-labelledby={`overview-${idKey}-tab-${idKey}`}
                          >
                            <h5>{spItem.playbook.titleH1}</h5>
                            {spItem.info ? (
                              <p>
                                <b>Online since:</b> {spItem.info.onlineSince}
                              </p>
                            ) : (
                              ''
                            )}
                            {parse(spItem.playbook.intro) as string}
                          </div>
                        </div>
                      </div>

                      <div className="top-sportsbook-bottom__links row">
                        <div className="col-md-6 order-md-2 d-grid mb-3 mb-md-0 mb-lg-0 mb-xl-0">
                          <Link href={`${spItem.affiliateLink}`} legacyBehavior>
                            <a
                              target="_blank"
                              rel="nofollow"
                              className="btn btn-primary external-sportsbook-link d-flex align-items-center justify-content-center"
                              data-aatracker="@sportsbook.GetTrackerVisitSiteCTA()"
                              data-sp={`position-@counter${idKey}`}
                              onClick={userAssociation}
                            >
                              {spItem.playbook.playNowButton}
                              <span className="ms-2 mat-icon-arrow-right-alt icon-white mat-icon-size-16"></span>
                            </a>
                          </Link>
                        </div>
                        <div className="col-md-6 d-grid">
                          <Link
                            href={`/betting-sites/${spItem.sSlug}/`}
                            legacyBehavior
                          >
                            <a
                              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                              data-aatracker="@sportsbook.GetTrackerReadReviewLink()"
                            >
                              {spItem.playbook.titleH1}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}

              {sportsbooksList.length > 5 ? (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-secondary btn-dropdown-smooth"
                    onClick={changeVisibility}
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      {!itemVisibility
                        ? 'View More Sportsbooks'
                        : 'View Less Sportsbooks'}
                      <Icon
                        text={`${
                          !itemVisibility ? 'Expand More' : 'Expand Less'
                        }`}
                        size="24"
                        icon={`ms-1 ${
                          !itemVisibility
                            ? 'mat-icon-expand-more'
                            : 'mat-icon-expand-less'
                        }`}
                        color="white"
                      />
                    </span>
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default SportsbooksListView;
