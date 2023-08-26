import Avatar from '../../../💎Atoms/Avatar/Avatar';

export interface IFactChecker {
  author: any;
  className?: string;
  updatedDate?: string;
  theme?: 'dark' | 'darker' | 'light' | 'white';
}

export const FactChecker = ({
  author,
  className,
  updatedDate,
  theme = 'dark',
}: IFactChecker) => {
  let imgSrc = `${process.env.NEXT_PUBLIC_CDN_URL}images/avatars/default-avatar.jpg?fm=webp&auto=format&auto=compress&h=56&w=56&fit=crop&crop=faces,top,left`;
  let imgAlt = `${author.firstName} ${author.lastName} profile`;

  if (author.imageDetail) {
    imgSrc = `${process.env.NEXT_PUBLIC_CDN_URL}${process.env.NEXT_PUBLIC_CDN_FOLDER}/${author.imageDetail.fileName}?fm=webp&auto=format&auto=compress&h=56&w=56&fit=crop&crop=faces,top,left`;
    imgAlt = author.imageDetail.alt != '' ? author.imageDetail.alt : imgAlt;
  }
  let factCheckerSlug = 'dkritzer';
  let factCheckerName = 'Darren Kritzer';

  if (author.slug.indexOf('dkritzer') >= 0) {
    factCheckerSlug = 'joshhowe';
    factCheckerName = 'Josh Howe';
  }

  return (
    <div className="article-author d-flex align-items-center pt-2 pb-3">
      <a
        href={`/author/${author.slug}/`}
        className={className}
        aria-label={`Read more about ${author.firstName} ${author.lastName}`}
      >
        <Avatar
          text=""
          src={imgSrc}
          alt={`${imgAlt}`}
          size="lg"
          className="avatar rounded-circle"
          icon=""
        />
      </a>
      <div className="author-info d-flex flex-column mt-2 w-100">
        <div className="d-flex align-items-center">
          <p className="mb-0 me-1 small">Fact checked</p>
          <div
            className="verified-icon position-relative"
            role="tooltip"
            data-toggle="dropdown"
            data-target="fact-checked-description"
            data-aatracker="User Interaction - Verified Fact Check"
            aria-label={`${factCheckerName} has ensured facts are accurate and from trusted sources`}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="verified-background"
                d="m12 2.5 2.503 2.296 3.375-.386.675 3.329 2.958 1.67L20.1 12.5l1.41 3.09-2.957 1.671-.675 3.33-3.375-.387L12 22.5l-2.503-2.296-3.375.386-.675-3.329-2.958-1.67L3.9 12.5 2.49 9.41l2.957-1.671.675-3.33 3.375.387L12 2.5z"
                fill="#025BFF"
              />
              <path
                className="verified-check"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.91 10.92 14.49 9.5l-3.17 3.17-1.41-1.42-1.41 1.41 2.82 2.84 4.59-4.58z"
                fill="#fff"
              />
            </svg>
            <div
              id="fact-checked-description"
              className="d-none bg-darker rounded-1 position-absolute p-2 text-center small content-section information-to-show"
            >
              <a
                href={`/author/${factCheckerSlug}/`}
                data-aatracker={`Fact Checked - Internal - ${factCheckerName}`}
              >
                {factCheckerName}
              </a>{' '}
              has ensured facts are accurate and from trusted sources.
            </div>
          </div>
        </div>
        <p className="d-flex flex-wrap">
          Written by &nbsp;
          <a
            href={`/author/${author.slug}/`}
            className="author-name fw-bold me-4 me-md-0"
            data-aatracker={`Page Link - Author Page - ${author.firstName} ${author.lastName}`}
          >
            {' '}
            {author.firstName} {author.lastName}
          </a>
          {author.Title ? (
            <>
              <span
                className={`mx-2 ${
                  theme === 'dark' || theme === 'darker' ? 'text-white' : ''
                } d-none d-md-inline`}
              >
                |
              </span>
              <span className="text-@(factCheckerTextColor) d-none d-md-inline">
                {author.Title}
              </span>
            </>
          ) : (
            ''
          )}
          {updatedDate ? (
            <span className="ms-0 ms-md-4">{updatedDate}</span>
          ) : (
            ''
          )}
        </p>
      </div>
    </div>
  );
};

export default FactChecker;
