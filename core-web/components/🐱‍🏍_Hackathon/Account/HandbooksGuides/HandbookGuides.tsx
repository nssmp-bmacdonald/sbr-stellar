import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IBrick, getGuide } from '../../../../lib/guides';

const HandbooksGuides: React.FC<any> = () => {
  const [data, setData] = useState<IBrick[] | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    getGuide().then((res) => {
      if (!res) {
        return console.log('No Data');
      }

      if (session?.hubspot.betting_experience === 'Sharp') {
        const advancedGuides = res.sidebar.bricks.filter(
          (brick) =>
            brick.desc == 'Sports Handicapping' ||
            brick.desc == 'Betting Strategy'
        );
        setData(advancedGuides);
      } else {
        const beginnerGuides = res.sidebar.bricks.filter(
          (brick) =>
            brick.desc == 'Beginners Guide' ||
            brick.desc == 'Betting Sports Guide'
        );
        setData(beginnerGuides);
      }
    });
  }, []);

  return (
    <>
      <h2>Handbooks & Guides</h2>
      <div className="card w-100 mt-6 mb-4 pb-4">
        {data?.map((guide: any, guideId: number) => {
          return (
            <div key={guideId} className="card-body content-section">
              <h3>{guide?.desc}</h3>
              <div className="pb-4">{guide?.excerpt}</div>
              <div>{parse(guide?.code ?? '')}</div>
            </div>
          );
        })}
      </div>
      <div className="card w-100 mt-2 mb-3 pb-4">
        <div className="card-body content-section">
          Ad here based on user profile
        </div>
      </div>
    </>
  );
};

export default HandbooksGuides;
