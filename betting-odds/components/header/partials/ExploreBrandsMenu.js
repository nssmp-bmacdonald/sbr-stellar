import Link from 'next/link';

const ExploreBrandsMenu = ({ isMobile, expand }) => {
   return(
      <div className={`${ expand && isMobile ? "brands expanded" : "brands"} container`}>
         <nav aria-labelledby="brands-heading">
            <span id="brands-heading" className="explore-brands-heading">Explore our brands:</span>
            <ul className="row" role="menu">
               <li className="link" role="menuitem">
                  <Link href="https://store.sportsbookreview.com/home/">
                     <a target="_self"
                     data-aatracker="Menu - Secondary Menu - Store"
                     rel=""
                     className="item">Store</a>
                  </Link>
               </li>
               <li className="link" role="menuitem">
                  <Link href="https://contests.sportsbookreview.com/">
                     <a target="_self"
                        data-aatracker="Menu - Secondary Menu - Contest"
                        rel=""
                        className="item">Contests</a>
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   );
}

export default ExploreBrandsMenu;
