import { useEffect } from 'react';

import Link from 'next/link';

import { getFavoriteData } from '/data/favorite-data';

function FooterFlyoutMobile({ favoriteCount }) {
    let prevScroll = window.pageYOffset;

    const getSticky = () => {
        const currScroll = window.pageYOffset;
        const isScrolled = prevScroll > currScroll;
        prevScroll = currScroll;

        const footer = document.querySelector('.mobileUserMenu');
        if (isScrolled) {
            footer.classList.remove('hidden');
        }  else {
            footer.classList.add('hidden');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', getSticky);
        return () => {
            window.removeEventListener('scroll', getSticky);
        };
    });

  return(
    <>
        <div className="mobileUserMenu">
            <Link
                href="/betting-odds"
                passHref>
                <a className="button"
                    data-cy="user-menu-home"
                    target="_self"
                    rel="">
                    <div className="icons"><i className="sbr-icon-home"></i> <span className='sr-only'>Click here to take you to the homepage</span></div>
                    <span>Home</span>
                </a>
            </Link>
            <Link
                href="/betting-odds/user/favorites/"
                passHref>
                <a className="button"
                    data-cy="user-menu-favorites"
                    target="_self"
                    rel="">
                    <div className="icons">
                        <i className="sbr-icon-star-icon"></i> <span className='sr-only'>Click this button to see your favorite games</span>
                        <div className="badge">{ favoriteCount ?? getFavoriteData().length }</div>
                    </div>
                    <span>Favorites</span>
                </a>
            </Link>
        </div>
    </>
  );
}

export default FooterFlyoutMobile;
