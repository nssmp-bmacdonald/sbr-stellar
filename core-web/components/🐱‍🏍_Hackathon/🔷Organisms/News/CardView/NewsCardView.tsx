import { useSwiper } from 'swiper/react';
import SwiperElements from '../../../💠Molecules/SwiperElements/SwiperElements';

interface INewsCardViewPros {
  heading?: string;
  articles: any[];
  layout?: 'slider' | 'card';
  navigation?: boolean;
  className?: string;
}

export const NewsCardView: React.FC<INewsCardViewPros> = ({
  heading,
  articles,
  layout = 'slider',
  className,
  navigation = true,
}) => {
  const swiper = useSwiper();
  return (
    <div className={`row ${className ? className : ''}`}>
      <div className="position-relative">
        <div className="col-8 col-lg-10">
          <h2 className="w-100 pb-2 h3 mt-0 divider-small">
            {heading ? heading : 'Related Articles'}
          </h2>
        </div>

        {articles ? (
          <SwiperElements
            sliderObject={generateCardView(articles, layout)}
            slidesPerViewV={4}
            spaceBetween={16}
            navigationSlider={true}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default NewsCardView;

const generateCardView = (articles: any, layout: string) => {
  let artObj: any = [];
  const aspectRatio = 16 / 9;
  const imageLarge = Math.ceil(aspectRatio * 294);
  articles
    ? articles.map((item: any, id: number) => {
        artObj.push(`<div
            key=${id}
            className=${`articleItem ${
              layout === 'slider' ? 'swiper-slide' : ' col-12 col-sm-6'
            }`}
          >
            <Link
              href=${`${process.env.NEXT_PUBLIC_CDN_URL}/${item.section}/${item.urlPath}/${item.slug}/`} legacyBehaviour
            >
              <a
                className="d-block mb-3"
                data-aatracker="Page Link - Article Page - @Html.Raw(article.Title)"
              >
                ${
                  item.imageDetail
                    ? `<Image
                      src=${`${process.env.NEXT_PUBLIC_CDN_URL}${process.env.NEXT_PUBLIC_CDN_FOLDER}/${item.imageDetail.fileName}`}
                      width=${imageLarge}
                      height=${196}
                      alt=${item.imageDetail.alt}
                    />`
                    : ''
                }
              </a>
            </Link>
            <div className="articleInfoWrapper">
              ${
                layout === 'slider'
                  ? `<div className="badge bg-primary mt-3 mt-md-0 mt-lg-0 mt-xl-0 mb-2">
                  ${
                    item.tags
                      ? item.tags.lenght > 0
                        ? item.tags[0]
                        : item.section
                      : ''
                  }
                </div>`
                  : ''
              }
              <Link
                href=${`${process.env.NEXT_PUBLIC_CDN_URL}/${item.section}/${item.urlPath}/${item.slug}/`} legacyBehaviour
              >
                <a
                  href=""
                  data-aatracker="Page Link - Article Page - @Html.Raw(article.Title)"
                  className="articleHeadingLink"
                >
                  <div className="h4">${item.title}</div>
                </a>
              </Link>
            </div>
          </div>`);
      })
    : '';
  return artObj;
};
