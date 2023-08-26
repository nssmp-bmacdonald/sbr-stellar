import Link from 'next/link';
import { useRouter } from 'next/router';
import { IMenu } from '../../../types/layout/menu';
import Icon from '../Icon/Icon';

//Create a functional component with text, href and active as props and use Link from next/link to link pages
interface INavItem extends IMenu {
  active: boolean;
}

const NavItem: React.FC<INavItem> = ({
  text,
  href,
  className,
  aaTracker,
  target,
  rel,
  icon,
  active,
  action,
}) => {
  const router = useRouter();

  return href !== '' ? (
    <Link href={href} legacyBehavior>
      <a
        className={`${className} ${
          router.asPath === href || active ? 'active' : ''
        }`}
        data-aatracker={aaTracker}
        target={target}
        rel={rel}
        onClick={action}
      >
        {icon !== '' ? <Icon icon={icon} text={text} /> : <>{text}</>}
      </a>
    </Link>
  ) : (
    <>{icon !== '' ? <Icon icon={icon} text={text} /> : <>{text}</>}</>
  );
};

export default NavItem;
