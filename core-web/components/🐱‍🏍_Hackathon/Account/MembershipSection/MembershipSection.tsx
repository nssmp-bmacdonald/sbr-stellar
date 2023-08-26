import { useSession } from 'next-auth/react';

const MembershipSection: React.FC<any> = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <h3 className="mt-0 d-flex align-items-center justify-content-between mb-5">
        Membership Details
      </h3>
      <div className="row mb-4">
        <div className="col">
          <b>Membership Type</b>
          <div style={{ minHeight: '36px' }}>
            {session?.hubspot.membership_level}
          </div>
        </div>
        <div className="col">
          <b>Renewal Date</b>
          <div style={{ minHeight: '36px' }}>
            {session?.hubspot.membership_renewal_date.toString()}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <b>Member Since</b>
          <div style={{ minHeight: '36px' }}>
            {session?.hubspot.membership_start_date.toString()}
          </div>
        </div>
        <div className="col">
          <b></b>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default MembershipSection;
