import Link from 'next/link';
import { IUserAvatarLink } from '../../../types/layout/avatar';
import Avatar from '../../💎Atoms/Avatar/Avatar';

const UserAvatarLink: React.FC<IUserAvatarLink> = ({
  text,
  href,
  avatar,
  balance,
  aClassName,
}) => {
  return (
    <>
      {href ? (
        <Link href={href} legacyBehavior>
          <a className={`d-flex align-items-center ${aClassName}`}>
            <Avatar
              text={avatar.text}
              src={avatar.src}
              size={avatar.size}
              alt={avatar.alt}
              icon={avatar.icon}
              className={avatar.className}
              dClassName={avatar.dClassName ?? 'me-3'}
            />
            <div className="text-break fw-bold">
              {balance ? <h5>{text}</h5> : text}
              {balance ? (
                <div>
                  <small>{balance}</small>
                </div>
              ) : (
                ''
              )}
            </div>
          </a>
        </Link>
      ) : (
        <div className={`d-flex align-items-center ${aClassName}`}>
          <Avatar
            text={avatar.text}
            src={avatar.src}
            size={avatar.size}
            alt={avatar.alt}
            icon={avatar.icon}
            className={avatar.className}
            dClassName={avatar.dClassName ?? 'me-3'}
          />
          <div className="text-break fw-bold">
            {balance ? <h5>{text}</h5> : text}
            {balance ? (
              <div>
                <small>{balance}</small>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserAvatarLink;
