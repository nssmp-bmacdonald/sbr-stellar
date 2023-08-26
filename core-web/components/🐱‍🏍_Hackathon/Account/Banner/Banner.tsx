import { useSession } from 'next-auth/react';

const Banner: React.FC<any> = () => {
  const { data: session, status } = useSession();

  return (
    <div
      id="banner"
      className="col-12 bg-dark bg-pattern-sbr bg-pattern-mr bg-offset-2 my-5 p-5 rounded-1 "
    >
      <div className="col-sm-8 col-md-6">
        <h2 className="mb-3">Learn. Discover. Connect with sport bettors.</h2>
        <p>
          Learn to navigate across the sports betting industry, develop betting
          skills, and interact with other bettor experts.
        </p>
        <a className="btn btn-primary mt-5 mb-9 mb-lg-0 mb-xl-0" href="">
          Find out more
        </a>
      </div>
    </div>
  );
};

export default Banner;
