import parse from 'html-react-parser';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface ISwiperElementsProps {
  spaceBetween?: number;
  slidesPerViewV: number;
  sliderObject: any;
  navigationSlider?: boolean;
}

export const SwiperElements: React.FC<ISwiperElementsProps> = ({
  spaceBetween = 50,
  slidesPerViewV = 3,
  sliderObject,
  navigationSlider = false,
}) => {
  return (
    <div className="col-12 mt-3">
      {sliderObject ? (
        <Swiper
          modules={[Navigation, A11y]}
          navigation={navigationSlider}
          spaceBetween={spaceBetween}
          slidesPerView={1.5}
          className="mySwiper"
          breakpoints={{
            768: {
              slidesPerView: 2.5,
            },
            1200: {
              slidesPerView: slidesPerViewV,
            },
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {sliderObject?.map((sliderItem: any, sliderId: number) => (
            <SwiperSlide key={sliderId}>
              {parse(sliderItem) as string}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ''
      )}
    </div>
  );
};

export default SwiperElements;
