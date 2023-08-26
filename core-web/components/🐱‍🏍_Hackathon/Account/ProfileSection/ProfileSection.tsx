import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { updateSession } from '../../../../helpers/sportsbooks-helpers';
import Icon from '../../../💎Atoms/Icon/Icon';
import MembershipSection from '../MembershipSection/MembershipSection';

const ProfileSection: React.FC<any> = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Object>({});

  const [updateView, setUpdateView] = useState(false);
  const [embedProAd, setEmbedProAd] = useState('');
  const [formStatus, setFormStatus] = useState<string>('');

  const updateProfile = (e: any) => {
    setUpdateView(!updateView);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    const ad = parse(
      `<!--HubSpot Call-to-Action Code --><span class="hs-cta-wrapper" id="hs-cta-wrapper-34283aa4-95d7-4bf1-8bba-5129afc6d70c"><span class="hs-cta-node hs-cta-34283aa4-95d7-4bf1-8bba-5129afc6d70c" id="hs-cta-34283aa4-95d7-4bf1-8bba-5129afc6d70c"><!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]--><a href="https://cta-redirect.hubspot.com/cta/redirect/39514430/34283aa4-95d7-4bf1-8bba-5129afc6d70c" target="_blank" rel="noopener"><img class="hs-cta-img" id="hs-cta-img-34283aa4-95d7-4bf1-8bba-5129afc6d70c" style="border-width:0px;" height="268" width="506" src="https://no-cache.hubspot.com/cta/default/39514430/34283aa4-95d7-4bf1-8bba-5129afc6d70c.png"  alt="Become a SBR Pro!"/></a></span><script defer charset="utf-8" src="https://js.hscta.net/cta/current.js"></script><script type="text/javascript"> hbspt.cta.load(39514430, '34283aa4-95d7-4bf1-8bba-5129afc6d70c', {"useNewLoader":"true","region":"na1"}); </script></span><!-- end HubSpot Call-to-Action Code -->`
    ) as string;
    setEmbedProAd(ad);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/hubspot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: session?.hubspot.id,
        data: userData,
      }),
    });
    const data = await res.text();
    setFormStatus(data);
    setUpdateView(!updateView);

    updateSession();
  };

  return (
    <>
      <h2>Profile Overview</h2>
      {/* Personal Information */}
      <div className="w-100 mt-6 mb-3">
        <div className="content-section py-4">
          <h3 className="mt-0 d-flex align-items-center justify-content-between mb-5">
            {updateView
              ? 'Update Personal Information'
              : 'Personal Information'}
            <button className="no-button text-primary" onClick={updateProfile}>
              <small className="d-flex align-items-center">
                {!updateView ? (
                  <>
                    Edit{' '}
                    <Icon
                      text="edit"
                      icon="mat-icon-edit ms-2"
                      size="16"
                      color="blue"
                    />{' '}
                  </>
                ) : (
                  <>
                    Close{' '}
                    <Icon
                      text="close"
                      icon="mat-icon-close ms-2"
                      size="16"
                      color="blue"
                    />{' '}
                  </>
                )}
              </small>
            </button>
          </h3>
          {formStatus !== '' ? (
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
          ) : (
            ''
          )}
          <div className="row mb-4">
            <div className="col">
              {updateView ? (
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    onChange={handleInput}
                    defaultValue={session?.hubspot.firstname}
                  />
                  <label className="form-label" htmlFor="firstname">
                    First Name
                  </label>
                </div>
              ) : (
                <>
                  <b>First Name</b>
                  <div className="border-bottom" style={{ minHeight: '36px' }}>
                    {session?.hubspot.firstname}
                  </div>
                </>
              )}
            </div>
            <div className="col">
              {updateView ? (
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    onChange={handleInput}
                    defaultValue={session?.hubspot.lastname}
                  />
                  <label className="form-label" htmlFor="lastname">
                    Last Name
                  </label>
                </div>
              ) : (
                <>
                  <b>Last Name</b>
                  <div className="border-bottom" style={{ minHeight: '36px' }}>
                    {session?.hubspot.lastname}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              {updateView ? (
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={handleInput}
                    defaultValue={session?.hubspot.email}
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>
              ) : (
                <>
                  <b>Email</b>
                  <div className="border-bottom" style={{ minHeight: '36px' }}>
                    {session?.hubspot.email}
                  </div>
                </>
              )}
            </div>
            <div className="col">
              {updateView ? (
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    onChange={handleInput}
                    defaultValue={session?.hubspot.phone}
                  />
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                </div>
              ) : (
                <>
                  <b>Phone</b>
                  <div className="border-bottom" style={{ minHeight: '36px' }}>
                    {session?.hubspot.phone}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="row justify-content-end mb-3">
            {updateView ? (
              <div className="col-4 text-end">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-100 mt-2 mb-3 pb-4 ${
          session?.hubspot.membership_level ? '' : 'text-center'
        }`}
      >
        {session?.hubspot.membership_level ? <MembershipSection /> : embedProAd}
      </div>
    </>
  );
};

export default ProfileSection;
