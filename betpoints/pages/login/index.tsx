import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FORGOT_PASSWORD, REGISTER } from '../../lib/template/constants';
import SBR from '../../public/background-images/pattern-sbr.png';
import { NextPageWithLayout } from '../page';

const Login: NextPageWithLayout = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { from, redirect } = router.query;

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!password) passwordRef.current?.classList.add('is-invalid');
    if (!username) usernameRef.current?.classList.add('is-invalid');
    if (!password || !username) return;

    setLoading(true);

    signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    }).then((res) => {
      if (res?.ok) {
        if (redirect) router.push(`${redirect}`);
        else router.push(`/points/${from ?? ''}`);
      } else {
        setError('Username or password is incorrect');
        errorRef.current?.classList.remove('d-none');
        passwordRef.current?.classList.add('is-invalid');
        usernameRef.current?.classList.add('is-invalid');
        setLoading(false);
      }
    });
  };

  return (
    <>
      <NextSeo title="Sign in" description="" nofollow={true} noindex={true} />
      <div
        className="bg-dark"
        style={{
          backgroundImage: `url(${SBR.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="container">
          <div
            className="d-flex flex-column text-center justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <div className="col-12 col-md-8 col-lg-6 bg-dark rounded">
              <div className="py-6 px-1 px-md-4 px-lg-8 px-xl-8 content-section">
                <Image
                  alt="Sportsbook Review logo"
                  src="https://img.sportsbookreview.com/images/sbr-logo.svg"
                  width={250}
                  height={46}
                />
                <h1 className="h3 mt-5 mb-3 fw-normal">Please sign in</h1>
                <div
                  className="alert alert-danger alert-dismissible d-none"
                  role="alert"
                  ref={errorRef}
                >
                  <div>{error}</div>
                </div>

                <form>
                  <div className="form-floating mb-4">
                    <input
                      ref={usernameRef}
                      onChange={() =>
                        usernameRef.current?.classList.remove('is-invalid')
                      }
                      required
                      type="text"
                      className="form-control"
                      id="usernameInput"
                    />
                    <label className="form-label" htmlFor="usernameInput">
                      Username
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      ref={passwordRef}
                      onChange={() =>
                        passwordRef.current?.classList.remove('is-invalid')
                      }
                      required
                      type="password"
                      className="form-control"
                      id="passwordInput"
                    />
                    <label className="form-label" htmlFor="passwordInput">
                      Password
                    </label>
                  </div>

                  <button className="btn btn-primary m-4" onClick={handleLogin}>
                    Sign in
                  </button>
                </form>
                <div className="content-section">
                  <p>
                    Don&#39;t have an account?
                    <Link href={REGISTER} className="ms-2">
                      Register now
                    </Link>
                  </p>
                </div>
                <h6>
                  <small>
                    <Link href={FORGOT_PASSWORD} className="text-primary">
                      Forgot password?
                    </Link>
                  </small>
                </h6>
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-6 text-end mt-3 content-section">
              <Link href="https://www.sportsbookreview.com/privacy-policy/">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    const { redirect, from } = query;

    return {
      redirect: {
        statusCode: 302,
        destination: redirect ? `${redirect}` : `/points/${from ?? ''}`,
      },
    };
  }

  return {
    props: {},
  };
};

Login.getLayout = (page) => {
  return <>{page}</>;
};
