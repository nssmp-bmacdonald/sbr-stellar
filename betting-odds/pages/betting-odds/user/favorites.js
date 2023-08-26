import OddsHome from '/pages/betting-odds.js';
import {getServerSideProps as getSSProps}  from '/pages/betting-odds.js';
export default OddsHome;

export async function getServerSideProps(context) {
  return await getSSProps(context);
}