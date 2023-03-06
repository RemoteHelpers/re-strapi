/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/navigation/navigation.scss";

import "./testimonials.scss";
import { useStateContext } from "../../context/StateContext";

import Eliar from '../../images/testimonials/Eliar.jpeg';
import Taniuha from '../../images/testimonials/Taniuha.jpeg';
import Timur from '../../images/testimonials/Timur.jpg';

const Testimonials = () => {
  const { homeData } = useStateContext();
  const personal = [
    {
      id: 1,
      name: 'Тетяна',
      position: 'Copywriter ',
      who: 'Lead',
      img: Taniuha,
      descr: `Робота у RemotEmployees дозволила мені значно покращити навички володіння іноземними мовами. Дружний колектив, комфортна атмосфера в офісі, можливість самовдосконалення та гідна винагорода – все це дарує гарний настрій та бажання розвиватись!`,
    },
    {
      id: 2,
      name: 'Тімур',
      position: 'Seo',
      who: 'Specialist',
      img: Timur,
      descr: `Приємна атмосфера, доброзичливий та чуйний колектив, до якого ти швидко звикаєш і вже за тиждень почуваєшся як удома. Розуміюче керівництво, з яким можна обговорити будь-яку проблему. Тебе вислухають і завжди підкажуть як вийти із конкретної ситуації. Все це надає впевненості та бажання рухатися вперед.`,
    },
    {
      id: 3,
      name: 'Елйар',
      position: 'Project Manager',
      who: 'Manager',
      img: Eliar,
      descr: `Робота в компанії Remote Employees принесла мені багато позитивних емоцій і колосальний досвід. Дружньо налаштований, молодий колектив дизайнерів, розробників, перекладачів тощо завжди готовий прийти на допомогу незалежно від ситуації. Я впевнений – цей колектив і ця компанія саме те, що необхідно для впевненого швидкого професійного та особистісного росту.`,
    },
  ];

  return (
    <div className="Testimonials">
      <h3 className="Testimonials__title">{homeData?.attributes.testimonialsTitle}</h3>

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
                <div className="Testimonials__image">
                  <img src={people.img} alt={people.name} />
                </div>
                <div className="Testimonials__person">
                  <span className="Testimonials__name">{people.name}</span>
                  <span className="Testimonials__vacancy">
                    <span className="Testimonials__vacancy--bold">
                      {people.position}
                      &nbsp;
                    </span>
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
