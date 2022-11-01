/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/navigation/navigation.scss";

import "./testimonials.scss";

const Testimonials = () => {
  const personal = [
    {
      id: 1,
      name: 'Andrew kostyl-man',
      position: 'Developer',
      who: 'спеціаліст',
      descr: `Приятная атмосфера, дружелюбный и отзывчивый коллектив, к которому
      ты быстро привыкаешь и уже через неделю чувствуешь себя как дома.
      Понимающее начальство,с которым можно обсудить любую проблему.
      Тебя выслушают и всегда подскажут как выйти из конкретной
      ситуации. Все это придает уверенности и желания двигаться вперед.`,
    },
    {
      id: 2,
      name: 'Igor Superman',
      position: 'Developer pro+',
      who: 'спеціаліст',
      descr: `Приятная атмосфера, дружелюбный и отзывчивый коллектив, к которому
      ты быстро привыкаешь и уже через неделю чувствуешь себя как дома.
      Понимающее начальство,с которым можно обсудить любую проблему.
      Тебя выслушают и всегда подскажут как выйти из конкретной
      ситуации. Все это придает уверенности и желания двигаться вперед.`,
    },
    {
      id: 3,
      name: 'Sofia miracle woman',
      position: 'Developer pro max',
      who: 'спеціаліст',
      descr: `Приятная атмосфера, дружелюбный и отзывчивый коллектив, к которому
      ты быстро привыкаешь и уже через неделю чувствуешь себя как дома.
      Понимающее начальство,с которым можно обсудить любую проблему.
      Тебя выслушают и всегда подскажут как выйти из конкретной
      ситуации. Все это придает уверенности и желания двигаться вперед.`,
    },
  ];

  return (
    <div className="Testimonials">
      <h3 className="Testimonials__title">Отзывы</h3>

      <Swiper
        className="Testimonials__slider"
        modules={[Pagination, Navigation]}
        navigation
        centeredSlides
        loop
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          1200: {
            slidesPerView: 2.5,
          },
        }}
      >
        {personal.map(people => (
          <SwiperSlide key={people.id}>
            <div className="Testimonials__slide">
              <div className="Testimonials__slide-head">
                <div className="Testimonials__image"></div>
                <div className="Testimonials__person">
                  <span className="Testimonials__name">{people.name}</span>
                  <span className="Testimonials__vacancy">
                    <span className="Testimonials__vacancy--bold">{people.position}</span>
                    {people.who}
                  </span>
                </div>
              </div>
              <p className="Testimonials__paragraph">
                {people.descr}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
