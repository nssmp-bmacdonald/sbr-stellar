import Link from 'next/link';
import PrimaryLayout from '../components/📐Layouts/Primary/PrimaryLayout';
import BaseTemplate from '../components/📰Templates/Base/BaseTemplate';
import { NextPageWithLayout } from './page';
const Custom404: NextPageWithLayout = () => {
  const text = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="circle rounded-circle bg-darker">
        <h1 className="display-1">404</h1>
      </div>
      <h2 className="mt-4">Oh no, page not found!</h2>
      <Link href="/points/" legacyBehavior>
        <a className="btn btn-primary btn-lg">Return to home page</a>
      </Link>
    </div>
  );
  return (
    <BaseTemplate
      content={text}
      className="container my-8"
      rowClassName="row justify-content-center"
      cntClassName="col-8 content-section"
    />
  );
};

export default Custom404;

Custom404.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};
