import { IRegion } from '../../../types/region';

export interface ISearch {
  theme: 'dark' | 'darker' | 'light' | 'white';
  region: IRegion;
}

export const Search: React.FC<ISearch> = ({ theme = 'dark', region }) => {
  return (
    <div className="position-relative h-100">
      <div id="sbrHeaderSearchbarWrapper" className="sbr-searchBarWrapper ">
        <label htmlFor="search-input">
          <span className="visually-hidden">Search sportsbooks</span>
        </label>
        <input
          type="text"
          placeholder="Find a sportsbook"
          id="search-input"
          className={`bg-${theme}`}
          data-toggle="search-sportsbooks"
          data-target={region?.slug}
        />
        <button
          className="sbr-searchIcon no-button"
          data-toggle="search-sportsbooks"
          data-target={region?.slug}
          aria-label="Search Sportsbooks in your area"
        >
          <span className="sbr-icon-search"></span>
        </button>
      </div>

      <div id="sbrHeaderSearchbarDropdown" className={`bg-${theme}`}></div>
    </div>
  );
};

export default Search;
