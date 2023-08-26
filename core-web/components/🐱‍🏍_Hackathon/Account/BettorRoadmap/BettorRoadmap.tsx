import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { updateSession } from '../../../../helpers/sportsbooks-helpers';
import Icon from '../../../💎Atoms/Icon/Icon';

interface IAccProps {
  hsDataFields: [];
}

const BettorRoadmap: React.FC<IAccProps> = ({ hsDataFields }) => {
  const { data: session, status } = useSession();

  const [formStatus, setFormStatus] = useState<string>('');
  const [leagueData, setLeagueData] = useState<string[]>(
    session?.hubspot.favorite_leagues.split(';') ?? []
  );
  const [spData, setSpData] = useState<string[]>(
    session?.hubspot.favorite_sportsbooks.split(';') ?? []
  );

  const isChecked = (value: any) => {
    const isFavLeague = leagueData?.find((league) => league == value);
    const isFavSp = spData?.find((sp) => sp == value);
    return !!isFavLeague || !!isFavSp;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.checked) {
      e.target.parentElement!.classList.add('bg-light');
      field === 'favorite_leagues'
        ? leagueData.push(e.target.id)
        : spData.push(e.target.id);
    } else {
      e.target.parentElement!.classList.remove('bg-light');
      field === 'favorite_leagues'
        ? setLeagueData((prev) => prev.filter((sp) => sp != e.target.id))
        : setSpData((prev) => prev.filter((sp) => sp != e.target.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/hubspot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: session?.hubspot.id,
        data: {
          favorite_sportsbooks: spData.toString().replaceAll(',', ';'),
          favorite_leagues: leagueData.toString().replaceAll(',', ';'),
        },
      }),
    });

    const data = await res.text();
    updateSession();
    //Alert does not show again after it is closed
    setFormStatus(data);
  };

  return (
    <div className="content-section">
      <h2>Your Personalized Roadmap</h2>
      <p>
        This information will allow us to improve recommendations for you and
        bring you the best experiece.
      </p>

      <h2 className="mt-4">Your preferences</h2>
      {formStatus && (
        <div
          className="alert alert-info alert-dismissible fade show"
          role="alert"
        >
          {formStatus}
          <button
            type="button"
            className="no-button"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <Icon icon="mat-icon-close" text="close" size="16" />
          </button>
        </div>
      )}
      <form>
        {hsDataFields?.map((field: any, index: number) => (
          <div
            key={index}
            className="card w-100 mt-6 mb-4 p-4"
            data-type={field.name}
          >
            <h4 className="card-title">Choose Your {field.label}</h4>
            <div className="card-body">
              {field.fieldType === 'checkbox' && (
                <div className="row gx-5">
                  {field.options.map((options: any, keyOpt: number) => (
                    <div key={keyOpt} className="col-4 mb-3">
                      <label
                        className={`form-control text-center ${
                          isChecked(options.value) ? 'bg-lighter' : ''
                        }`}
                      >
                        <input
                          className="invisible"
                          style={{ width: 0 }}
                          type="checkbox"
                          name="checkbox"
                          onChange={(e) => handleChange(e, field.name)}
                          id={options.value}
                          defaultChecked={isChecked(options.value)}
                        />
                        {field.name === 'favorite_leagues' && (
                          <Icon
                            icon={`me-2 mat-icon-${
                              options.label.toLowerCase().split(' ')[1]
                            }`}
                            size="16"
                          />
                        )}
                        {options.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>

      {!session?.hubspot.favorite_sportsbooks ? (
        <div className="card w-100 mt-6 mb-3 pb-4 bg-dark rounded-1">
          <div className="card-body content-section">
            <b className="text-primary text-uppercase">800+ Reviews</b>
            <h4 className="text-uppercase mb-3">
              Find your perfect Sportsbook
            </h4>
            <p>
              Explore the best ratings, best online experience, and the best
              customer service from our team of sports betting experts.
            </p>
            <Link href="/points/best-sportsbooks" legacyBehavior>
              <a className="btn btn-primary">
                <span className="d-flex align-items-center">
                  Get Started{' '}
                  <Icon
                    icon="mat-icon-arrow-forward ms-2"
                    color="white"
                    size="16"
                  />
                </span>
              </a>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default BettorRoadmap;
