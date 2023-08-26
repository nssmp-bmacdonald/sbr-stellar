import Breadcrumbs from '/components/page-controls/Breadcrumbs';
import MarketSelector from '/components/page-controls/MarketSelector.js';
import PageTitle from '/components/page-controls/PageTitle.js';
import DateControls from '/components/page-controls/DateControls.js';
import OddsFormatDropDown from '/components/page-controls/OddsFormatDropDown.js';

function PageControls({league, oddsFormat, handler, isBreakpoint, scopes, pageName, breadcrumbObject}) {
  return(
    <>
      <div className="controls padding-container">
        <Breadcrumbs breadcrumbList={breadcrumbObject} />
        {
          pageName === undefined ? <DateControls /> : null
        }
      </div>
      <PageTitle league={league} scopes={scopes} pageName={pageName} />
      <div className={(isBreakpoint === false) ? "controls padding-container" : "controls-mobile padding-container"}>
        <MarketSelector isBreakpoint={isBreakpoint} />
        <OddsFormatDropDown oddsFormat={oddsFormat} handler={handler} />
      </div>
    </>
  );
}

export default PageControls;
