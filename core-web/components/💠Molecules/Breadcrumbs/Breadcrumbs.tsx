import parse from 'html-react-parser';
import { BreadcrumbJsonLd } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { IBreadcrumb } from '../../../types/breadcrumb.d';

interface BreadcrumbProps {
  breadcrumbs: IBreadcrumb[];
  className?: string;
}

export const sbrSite = 'https://www.sportsbookreview.com';

export const breadcrumbList = [
  { position: 1, name: 'Home', item: sbrSite },
  { position: 2, name: 'Points', item: sbrSite + '/points/' },
  {
    position: 3,
    name: 'Movers and Shakers',
    item: sbrSite + '/movers-and-shakers/',
  },
];

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ breadcrumbs, className }) => {
  return (
    <>
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <div className="container align-items-center justify-content-center">
        <div className="row">
          <nav
            className={className ? className : ''}
            aria-label="Breadcrumb"
            id="breadcrumbs"
          >
            <ol>
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index}>
                  {index == breadcrumbs.length - 1 ? (
                    <span className="active" aria-current="page">
                      {breadcrumb.name}
                    </span>
                  ) : (
                    <Link href={breadcrumb.item} legacyBehavior>
                      <a className="">
                        {breadcrumb.name === 'Home'
                          ? (parse(
                              `<span className="d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block">${breadcrumb.name}</span> <span className="d-inline-block d-sm-none d-md-none d-lg-none d-xl-none"><span className="mat-icon-house"></span> <span className="visually-hidden">${breadcrumb.name}</span></span>`
                            ) as string)
                          : breadcrumb.name}
                      </a>
                    </Link>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <span className="divider">/</span>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
