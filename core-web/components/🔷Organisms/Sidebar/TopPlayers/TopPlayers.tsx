import Image from 'next/image';
import { useState } from 'react';
import TROPHY from '../../../../public/trophy.svg';
import { IAvatar } from '../../../../types/layout/avatar';
import { IPointBalance } from '../../../../types/point-balance';
import { IUser } from '../../../../types/user';
import UserAvatarLink from '../../../💠Molecules/UserAvatarLink/UserAvatarLink';

interface ITopPlayers {
  leaders: IPointBalance[];
}

const TopPlayers: React.FC<ITopPlayers> = ({ leaders }) => {
  const [iLeaders] = useState(leaders);
  const getAvatar = (user: IUser) => {
    const avatar: IAvatar = {
      text: user.userName,
      src: user.avatar,
      size: 'sm',
      alt: `${user.userName} avatar`,
      icon: '',
      className: 'me-3 rounded-circle',
    };
    return avatar;
  };

  return (
    <div className="col-12 col-md-3 mb-8 mb-lg-0 mb-xl-0">
      <>
        <div className="d-flex align-items-center justify-content-between ms-0 ms-lg-4 mb-xl-4">
          <h4 className="text-uppercase divider-small mb-4">
            <span className="p text-primary fw-semibold">Top 5</span>
            <br />
            Leaderboard
          </h4>
          <Image
            src={TROPHY.src}
            width={TROPHY.width}
            height={TROPHY.height}
            alt="Trophy icon"
          />
        </div>
        {iLeaders?.slice(0, 5).map((user, id) => (
          <div
            key={id}
            className="d-flex align-items-center justify-content-between border-bottom ms-0 ms-lg-4 mb-2i mb-lg-3 mb-xl-3"
          >
            <UserAvatarLink
              text={user.account?.userName}
              href={`/points/history/${user.account?.slug}/`}
              avatar={getAvatar(user.account)}
              balance={user.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
            <h4 className="h1 text-primary text-outlined opacity-50">
              {id + 1}
            </h4>
          </div>
        ))}
      </>
    </div>
  );
};

export default TopPlayers;
