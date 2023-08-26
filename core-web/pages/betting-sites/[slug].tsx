import Sites, { getServerSideProps as getSSProps } from './index';
export default Sites;

export async function getServerSideProps(context: any) {
  return await getSSProps(context);
}
