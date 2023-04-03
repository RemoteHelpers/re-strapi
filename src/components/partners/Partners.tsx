import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import cl from "./partners.module.scss";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/autoplay/autoplay";

import { useStateContext } from "../../context/StateContext";
import { PhotoAPI } from "../../constants";

const Partners = () => {
  const { homeData } = useStateContext();

  return (
    <div className={cl.container}>
      <h3 className={cl.title}>{homeData?.partnersTitle}</h3>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={60}
        slidesPerView={1}
        autoplay={{
          delay: 1500,
        }}
        breakpoints={{
          485: {
            slidesPerView: 1,
          },
          486: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1360: {
            slidesPerView: 4,
          },
        }}
      >
        {homeData?.partnersSlider?.data && homeData?.partnersSlider?.data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className={cl.imageWrapper}>
              <img
                src={PhotoAPI + item.attributes.url}
                alt={item.attributes.name}
                className={cl.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Partners;
