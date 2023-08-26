import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Contests: React.FC<any> = () => {
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [previous, setPrevous] = useState<any[]>([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;

    //Get contests from Hubspot
    fetch('/api/hubspot/associations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromObjectType: 'contact',
        toObjectType: 'contests',
        fromObjectId: session?.hubspot.id,
      }),
    }).then((res) => {
      if (!res.ok) {
        setUpcoming([]);
        setPrevous([]);
        return;
      }

      res.json().then((data) => {
        const upcomingContests = data.results.filter(
          (obj: any) => obj.properties.type === 'upcoming'
        );
        const previousContests = data.results.filter(
          (obj: any) => obj.properties.type === 'previous'
        );

        setUpcoming(upcomingContests);
        setPrevous(previousContests);
      });
    });
  }, []);

  return (
    <>
      <h2>Contests</h2>
      <div className="card w-100 mt-6 mb-4 pb-4">
        <div className="card-body content-section">
          <h3>Upcoming</h3>
          {upcoming.map(({ properties }, idx) => {
            return (
              <div className="p-3" key={idx}>
                <Link href={properties?.link ?? '/'}>
                  <div>{properties?.contest_name}</div>
                </Link>
                <p>{properties?.prize}</p>
                <p>{properties?.description}</p>
              </div>
            );
          })}
        </div>
        <div className="card-body content-section">
          <h3>Previous</h3>
          {previous.map(({ properties }, idx) => {
            return (
              <div className="p-3" key={idx}>
                <Link href={properties?.link ?? '/'}>
                  <div>{properties?.contest_name}</div>
                </Link>
                <p>{properties?.prize}</p>
                <p>{properties?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card w-100 mt-2 mb-3 pb-4">
        <div className="card-body content-section">
          Ad here based on user profile
        </div>
      </div>
    </>
  );
};

export default Contests;
