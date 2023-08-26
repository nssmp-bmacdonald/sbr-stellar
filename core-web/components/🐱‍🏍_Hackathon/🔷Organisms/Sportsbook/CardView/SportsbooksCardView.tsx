import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../../../../💎Atoms/Icon/Icon';

interface CardViewSportsbooksProps {
  personalization: true | false;
  theme?: 'dark' | 'darker' | 'light' | 'white';
  logoType?: 'monochrome' | 'color' | 'colorBackground';
  sportsbookList: any[];
}

export const SportsbooksCardView: React.FC<CardViewSportsbooksProps> = ({
  personalization = false,
  theme = 'light',
  logoType = 'colorBackground',
  sportsbookList,
}) => {
  const { data: session, status } = useSession();
  return (
    <>
      {sportsbookList.length > 0 ? (
        <div className="sportsbooks-card-view">
          {personalization ? (
            <h4 className="p-3 text-center mb-3">
              {`${session?.hubspot.login_name}'s`} Favourite Sportsbooks
            </h4>
          ) : (
            ''
          )}
          <div
            className={`row ${
              sportsbookList.length < 3 ? ' justify-content-center' : ''
            }`}
          >
            {sportsbookList.slice(0, 3).map((spItem: any, keyId: number) => (
              <div
                key={keyId}
                className={`sportsbooks-card-view__wrapper ${
                  sportsbookList.length < 3 ? 'col-3' : 'col'
                }`}
              >
                <div
                  className={`card mx-3 py-5 px-4 bg-${theme} d-flex flex-column justify-content-center align-items-stretch`}
                >
                  {personalization ? (
                    <div className="ribbon down">
                      <div className="content dark">
                        <Icon icon="mat-icon-favorite" size="24" color="blue" />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  <Link href={spItem.affiliateLink} legacyBehavior>
                    <a
                      className="expandedTopListItem item-1 external-sportsbook-link external-sportsbook-logo-link mb-4 text-center"
                      title={spItem.playbook.playNowButton}
                      target="_blank"
                      rel="nofollow"
                      data-aatracker="@sportsbook.GetTrackerPartnerLogo()"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}${
                          process.env.NEXT_PUBLIC_CDN_FOLDER
                        }/${
                          logoType === 'colorBackground'
                            ? spItem.playbook.iconColorBackground.fileName
                            : logoType === 'monochrome'
                            ? spItem.playbook.iconMonochrome.fileName
                            : spItem.playbook.iconColor.fileName
                        }`}
                        alt=""
                        width={200}
                        height={80}
                      />
                    </a>
                  </Link>

                  <Link href={spItem.affiliateLink} legacyBehavior>
                    <a
                      className="btn btn-primary mb-3 external-sportsbook-link"
                      target="_blank"
                      rel="nofollow noreferrer"
                      data-aatracker="@sportsbook.GetTrackerVisitSiteCTA()"
                    >
                      Visit Site
                    </a>
                  </Link>
                  {!personalization ? (
                    <>
                      <div className="text-center mb-3">
                        <img
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/${spItem.rating.gradeIcon}?fm=webp&auto=format&auto=compress&h=58`}
                          alt={`Icon rating ${spItem.rating.grade.toLowerCase()}`}
                          width={58}
                          height={58}
                        />
                      </div>

                      <p className="sportsbooks-card-view__description text-center mb-2">
                        {spItem.bonus?.primaryPromo?.headline
                          ? spItem.bonus?.primaryPromo?.headline
                          : spItem.prosCons?.pros
                          ? (parse(spItem.prosCons?.pros[0]) as string)
                          : // @if (region.XRegionName.ToLower().Equals("ontario"))
                            // {
                            //     Html.Raw("Visit Site – Reg. by AGCO/iGO");
                            // }
                            ''}
                      </p>

                      <div className="text-center content-section">
                        <Link
                          href={`/betting-sites/${spItem.slug}/`}
                          legacyBehavior
                        >
                          <a data-aatracker="@sportsbook.GetTrackerReadReviewLink()">
                            Read Full Review
                          </a>
                        </Link>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SportsbooksCardView;
