import Link from 'next/link';
import { IRegion } from '../../../types/region';
import Icon from '../../💎Atoms/Icon/Icon';

export interface IMegaMenu {
  //   theme: 'dark' | 'darker' | 'light' | 'white';
  menus: {} | any;
  region: IRegion;
}

const MegaMenu: React.FC<IMegaMenu> = ({ menus, region }) => {
  return (
    <>
      {menus ? (
        <div
          className="navbar-collapse px-1 px-lg-0 h-100"
          id="sbr-UL-pageLinks"
          // data-region={region ? region : ''}
        >
          <ul className="navbar-nav topNav-itemList nav-item-wrapper">
            {menus?.menu.map((menuItem: any, index: number) => (
              <li
                key={index}
                id={`nav-item-${index}`}
                className="nav-item animate-fade h-100"
              >
                {menuItem.subMenu?.length > 0 ? (
                  <>
                    <div
                      className="nav-link topNav-item py-2 py-lg-0 px-2 my-1 my-lg-0 h-100 d-flex align-items-center justify-content-between justify-content-lg-start rounded-0 position-relative"
                      data-toggle="main-menu"
                      data-target={`nav-item-${index}`}
                    >
                      {menuItem.text}
                      <Icon
                        icon="d-lg-none mat-icon-chevron-right"
                        text="Chevron right icon"
                      />
                    </div>
                    <div className="dropdown-wrapper w-100 bg-white position-absolute mobileMaxHeight shadow-lg">
                      <div className="pt-0">
                        <div className="container">
                          <div className="row">
                            <div className="col submenu-vertical-menu">
                              <div className="border-bottom py-3 d-lg-none">
                                <span
                                  className="clickToPreviousMenu d-flex align-items-center h3 m-0 text-dark"
                                  data-toggle="main-menu"
                                  data-target="nav-item-@(menuItemCounter)"
                                >
                                  <Icon
                                    icon="mat-icon-chevron-left me-2"
                                    text="Chevron left icon"
                                  />
                                  Menu
                                </span>
                              </div>
                              <h2 className="subMenu-heading h4 m-4 mt-lg-5 fw-bolder">
                                {menuItem.text}
                              </h2>
                              <ul
                                id={`${menuItem.id}-list`}
                                className={`ps-0 noMarkerList position-relative mb-5${menuItem.className}`}
                              >
                                {menuItem.subMenu?.map(
                                  (subMenuItem: any, subIndex: number) =>
                                    subMenuItem.text === '' ? (
                                      subMenuItem?.items.map(
                                        (
                                          triMenuItem: any,
                                          triIndex: number
                                        ) => (
                                          <li
                                            key={triIndex}
                                            className={`triMenu-listItem mb-3 ${triMenuItem.className}`}
                                          >
                                            {triMenuItem.sublist &&
                                            triMenuItem.sublist.length > 0 ? (
                                              <>
                                                <div
                                                  className="ps-4 pe-2 py-1 mb-1 d-block rounded-2 triMenu-listItemHeading"
                                                  style={{
                                                    height: '32px',
                                                  }}
                                                >
                                                  {triMenuItem.icon ? (
                                                    <span
                                                      className={`${triMenuItem.icon} float-start me-2`}
                                                    ></span>
                                                  ) : (
                                                    ''
                                                  )}
                                                  {triMenuItem.text}
                                                </div>
                                                <div>
                                                  <ul className="ps-0">
                                                    {triMenuItem.sublist.map(
                                                      (
                                                        quadMenuItem: any,
                                                        quadIndex: number
                                                      ) => (
                                                        <li
                                                          key={quadIndex}
                                                          className="mb-1"
                                                        >
                                                          <Link
                                                            href={`${quadMenuItem.href}`}
                                                            legacyBehavior
                                                          >
                                                            <a
                                                              className="d-block ps-4 pe-2 py-1"
                                                              data-aatracker={`${quadMenuItem.aaTracker}`}
                                                            >
                                                              {
                                                                quadMenuItem.text
                                                              }
                                                            </a>
                                                          </Link>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              </>
                                            ) : (
                                              <Link
                                                href="@(triMenuItem.Href)"
                                                legacyBehavior
                                              >
                                                <a className="ps-4 pe-2 py-1 d-block rounded-2 fw-bold">
                                                  {triMenuItem.icon ? (
                                                    <span
                                                      className={`${triMenuItem.icon} float-start me-2`}
                                                    ></span>
                                                  ) : (
                                                    ''
                                                  )}
                                                  {triMenuItem.text}
                                                </a>
                                              </Link>
                                            )}
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li key={subIndex} className="d-flex">
                                        <div
                                          className={`subMenu-listItem subMenu-${menuItem.text
                                            .toLowerCase()
                                            .replace(
                                              ' ',
                                              '-'
                                            )} ps-4 pe-2 py-1 mb-3 rounded-2`}
                                          data-toggle="next-menu"
                                          data-target={subMenuItem.id}
                                        >
                                          {subMenuItem.text}
                                          <span className="mat-icon-chevron-right mat-icon-size-16 float-end d-lg-none"></span>
                                        </div>

                                        <div
                                          id={`${subMenuItem.id}`}
                                          className="triMenu-listWrapper position-absolute mobileMaxHeight"
                                        >
                                          {subMenuItem.items.length > 0 ? (
                                            <>
                                              <div className="border-bottom py-3 d-lg-none">
                                                <span
                                                  className="clickToPreviousMenu d-flex align-items-center h3 m-0 text-dark"
                                                  data-toggle="prev-menu"
                                                  data-target={subMenuItem.id}
                                                >
                                                  <span className="mat-icon-chevron-left me-2"></span>
                                                  {menuItem.text}
                                                </span>
                                              </div>

                                              <h2 className="subMenu-heading h4 m-4 mt-lg-5 fw-bolder d-lg-none">
                                                {subMenuItem.text}
                                              </h2>

                                              <div className="menuVerticalScroll">
                                                <ul
                                                  className={`triMenu-list noMarkerList px-3 mb-5 position-relative ps-0 ps-lg-3 ${subMenuItem.className}`}
                                                  style={{ zIndex: 1000 }}
                                                >
                                                  {subMenuItem.items.map(
                                                    (
                                                      triMenuItem: any,
                                                      triIndex: number
                                                    ) => {
                                                      <li
                                                        key={triIndex}
                                                        className="triMenu-listItem mb-3"
                                                      >
                                                        <Link
                                                          href={
                                                            triMenuItem.href
                                                          }
                                                          legacyBehavior
                                                        >
                                                          <a
                                                            className="ps-4 pe-2 py-1 d-block rounded-2"
                                                            data-aatracker={
                                                              triMenuItem.aaTracker
                                                            }
                                                          >
                                                            {triMenuItem.text}
                                                          </a>
                                                        </Link>
                                                      </li>;
                                                    }
                                                  )}
                                                </ul>
                                              </div>
                                            </>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                      </li>
                                    )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-2 py-lg-0 px-2 my-1 my-lg-0 h-100 d-flex align-items-center rounded-0 position-relative">
                    <Link href={`${menuItem.href}`} legacyBehavior>
                      <a
                        className="nav-link h-100 d-flex align-items-center py-0 topNav-item"
                        data-aatracker={`Menu - ${menuItem.text}`}
                      >
                        {menuItem.text}
                      </a>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default MegaMenu;
