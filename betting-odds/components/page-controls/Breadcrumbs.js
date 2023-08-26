import Link from 'next/link';

import { useState } from 'react';

import styles from '/styles/page-controls/Breadcrumbs.module.scss';

function Breadcrumbs({breadcrumbList}) {
  const [itemList] = useState((breadcrumbList === undefined) ? [] : breadcrumbList['itemListElement']);

  return (
    <nav aria-label="Breadcrumb" className={`${styles.breadcrumbsContainer}`}>
      <ol>
        {Object.keys(itemList).map((crumbItem, index) =>
            <li id={`breadcrumb-item-${crumbItem}`} className={`${(itemList[crumbItem].item != undefined) ? '' : styles.currentPage}`} key={index}>
              {(itemList[crumbItem].item != undefined) ?
                <Link href={itemList[crumbItem].item}>
                  <a className={styles.breadcrumbItem} data-aatracker={`Menu - Breadcrumbs - ${itemList[crumbItem].name}`}>{itemList[crumbItem].name}</a>
                </Link>
                :
                <span className={styles.active} aria-current="page">{itemList[crumbItem].name}</span>
              }
              {(index < itemList.length-1) ?
                <span className={`${styles.divider} ${(index == itemList.length-2) ? styles.lastDivider : ''}`}>/</span>
              : ''}

            </li>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
