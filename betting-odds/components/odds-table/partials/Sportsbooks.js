import Image from 'next/image';
import Link from 'next/link';

import { LOGOS_URL } from '/constants/seo';
import styles from '/styles/odds-table/Sportsbooks.module.scss';

function Sportsbooks({sportsbooks}) {
  return(
    sportsbooks.slice(0, 7).map((sportsbook, index) =>
      <div key={index} className={`${styles.sportbook} sticky-sportbook`}>
        {(sportsbook.affiliateLink === null || sportsbook.affiliateLink === '' || sportsbook.affiliateLink === undefined) ?
          <Image
            alt={`${sportsbook.sportsbook} Logo`}
            src={LOGOS_URL + sportsbook.iconColor.fileName}
            width={90}
            height={47} />
        :
          <Link href={sportsbook.affiliateLink}>
            <a target="_blank" data-aatracker={`Odds Table - Visit Site CTA - ${sportsbook.name}`}
              rel="nofollow">
                {(sportsbook.iconColor.fileName === null || sportsbook.iconColor.fileName === '' || sportsbook.iconColor.fileName === undefined) ?
                  <h5 style={{'margin': '0'}}>{sportsbook.name}</h5>
                :
                  <Image
                    alt={`${sportsbook.name} Logo`}
                    src={LOGOS_URL + sportsbook.iconColor.fileName}
                    width={90}
                    height={47} />
                }
            </a>
          </Link>
        }
      </div>
    )
  );
}

export default Sportsbooks;
