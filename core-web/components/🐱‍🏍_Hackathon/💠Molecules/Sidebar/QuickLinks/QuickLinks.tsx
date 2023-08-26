import Link from 'next/link';

interface QuickLinksProps {
  heading?: string;
  objectList: any;
  faqLink?: string;
  theme?: 'dark' | 'darker' | 'light' | 'white';
}

export const QuickLinks: React.FC<QuickLinksProps> = ({
  theme = 'light',
  objectList,
  faqLink,
  heading = 'On this page',
}) => {
  return (
    <div className="jumpMenu d-none d-lg-block">
      <div className="col-12">
        <h4 className="text-uppercase">
          <span className="h6 d-block mb-1">Quick links</span>
          {heading}
        </h4>
        <ul>
          {/*   @if (!string.IsNullOrEmpty(Model.ListingHeading) && Model.Slug.Equals("best-sportsbooks"))
            {
                <li>
			        <a href="#@Model.ListingHeading.Replace(" ","-")" data-aatracker="Quick Links - Table Of Contents - @Html.Raw(Model.ListingHeading)">
					    @Model.ListingHeading
			        </a>
		        </li>
            }*/}

          {objectList
            ? objectList.map((obj: any, objId: number) => (
                <li key={objId}>
                  <Link
                    href={`#${obj.sectionHeading
                      .toLowerCase()
                      .replaceAll(' ', '-')}`}
                    legacyBehavior
                  >
                    <a data-aatracker="Quick Links - Table Of Contents - @Html.Raw(bottomSection.SectionHeading)">
                      {obj.sectionHeading}
                    </a>
                  </Link>
                </li>
              ))
            : ''}
          {faqLink ? (
            <li>
              <a
                href={`#${faqLink.toLowerCase().replaceAll(' ', '-')}`}
                data-aatracker="Quick Links - Table Of Contents - @Html.Raw(Model.FaqsHeading)"
              >
                {faqLink}
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuickLinks;
