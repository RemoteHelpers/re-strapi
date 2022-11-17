/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import cl from "./partners.module.scss";
import { HOME_PAGE } from "../../database/home_page";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/autoplay/autoplay";

import { useStateContext } from "../../context/StateContext";

const Partners = () => {
  const { localization } = useStateContext();

  const localizadPartnersData = HOME_PAGE.find(
    (el) => el.language === localization
  )?.data.partners_section;

  return (
    <div className={cl.container}>
      <h3 className={cl.title}>{localizadPartnersData?.title}</h3>
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
        {localizadPartnersData?.partners.map((el, i) => (
          <SwiperSlide key={i}>
            <div className={cl.imageWrapper}>
              <img src={el.image} alt="company" className={cl.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Partners;
