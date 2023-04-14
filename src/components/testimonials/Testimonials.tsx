/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/navigation/navigation.scss";

import "./testimonials.scss";
import { useStateContext } from "../../context/StateContext";
import { PhotoAPI } from "../../constants";

const Testimonials = () => {
  const { homeData } = useStateContext();

  return (
    <div className="Testimonials">
      <h3 className="Testimonials__title">{homeData?.testimonialsTitle}</h3>

      <Swiper
        className="Testimonials__slider"
        modules={[Pagination, Navigation, Autoplay]}
        centeredSlides
        navigation
        loop
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, type: "fraction" }}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          1200: {
            slidesPerView: 2.5,
          },
        }}
      >
        {homeData?.Testimonials &&
          homeData?.Testimonials.map((people: any) => (
            <SwiperSlide key={people.id}>
              <div className="Testimonials__slide">
                <div className="Testimonials__slide-head">
                  <div className="Testimonials__image">
                    <img
                      src={PhotoAPI + people.personImg.data.attributes.url}
                      alt={people.name}
                    />
                  </div>
                  <div className="Testimonials__person">
                    <span className="Testimonials__name">{people.name}</span>
                    <span className="Testimonials__vacancy">
                      <span className="Testimonials__vacancy--bold">
                        {people.Position}
                        &nbsp;
                      </span>
                      {people.Specialization}
                    </span>
                  </div>
                </div>
                <p className="Testimonials__paragraph">{people.Description}</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
