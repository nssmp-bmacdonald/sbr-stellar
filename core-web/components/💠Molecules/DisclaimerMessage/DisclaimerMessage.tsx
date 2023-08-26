import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { DISCLAIMER_IMAGES } from '../../../lib/template/disclaimer-images';

export interface IDisclaimer {
  rounded?: boolean;
  className?: string;
  width?: '100' | '50' | 'auto';
  theme?: 'dark' | 'darker' | 'light' | 'white';
  region?: any;
}

export const Disclaimer = ({
  rounded = true,
  className,
  width = '100',
  theme = 'white',
  region,
}: IDisclaimer) => {
  const authText = region?.authority
    ? region?.authority.replace('<p>', "<p class='small mb-0'>")
    : '';
  let imgs: any = [];
  DISCLAIMER_IMAGES.map((el) => {
    if (el.caption.toLowerCase() === region?.xRegionCode.toLowerCase()) {
      if (region?.xRegionCode.toLowerCase() === 'on') {
        if (theme === 'white' || theme === 'light') {
          if (el.filename.indexOf('white') <= 0) {
            imgs.push(el);
          }
        } else {
          if (el.filename.indexOf('white') > 0) {
            imgs.push(el);
          }
        }
      } else {
        if (region?.xRegionCode.toLowerCase() !== 'on') {
          imgs.push(el);
        }
      }
    }
  });

  return (
    <>
      {region && (region?.disclaimer || region?.authority) ? (
        <div
          className={[
            `p-3 d-flex flex-column-reverse flex-lg-row justify-content-between`,
            `bg-${theme}`,
            `${rounded ? 'rounded-1' : ''}`,
            `${width !== 'auto' ? 'w-' + width : ''}`,
            `${className ? className : ''}`,
          ].join(' ')}
        >
          <div className="pe-lg-3 d-flex flex-column align-items-start justify-content-center">
            {region?.disclaimer ? (
              <p className="small mb-2i">
                <b className="fw-bold">Affiliate Disclosure:</b>{' '}
                {region?.disclaimer}
              </p>
            ) : (
              ''
            )}
            {parse(authText) as string}
          </div>
          {imgs.length > 0 ? (
            <div className="d-lg-flex align-items-center mb-3 mb-lg-0">
              {imgs.map((logo: any, id: number) =>
                logo.link ? (
                  <Link key={id} href={logo.link} legacyBehavior>
                    <a className="ms-3 py-2 d-inline-block" rel="nofollow">
                      {(theme === 'dark' || theme === 'darker') &&
                      logo.title.indexOf('white') >= 0 ? (
                        <Image
                          src={logo.filename}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                        />
                      ) : (theme === 'light' || theme === 'white') &&
                        logo.title.indexOf('white') < 0 ? (
                        <Image
                          src={logo.filename}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                        />
                      ) : (
                        ''
                      )}
                    </a>
                  </Link>
                ) : (
                  <span key={id}>
                    {(theme === 'dark' || theme === 'darker') &&
                    logo.title.indexOf('white') >= 0 ? (
                      <Image
                        src={logo.filename}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                      />
                    ) : (
                      <Image
                        src={logo.filename}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                      />
                    )}
                  </span>
                )
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Disclaimer;
