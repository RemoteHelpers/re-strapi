/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import cl from "./partners.module.scss";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/autoplay/autoplay";

import Convertise from "../../images/Partners/Convertise.svg";
import Chiko from "../../images/Partners/Chiko.svg";
import Collectmedia from "../../images/Partners/Collectmedia.svg";
import ChangeConsulting from "../../images/Partners/Change-Consulting.svg";
import Clevver from "../../images/Partners/Clevver.png";
import TakeTask from "../../images/Partners/TakeTask.svg";
import FancyGames from "../../images/Partners/FancyGames.svg";
import LearnerOn from "../../images/Partners/LearnerOn.svg";
import Silicon from "../../images/Partners/Silicon.svg";
import EvolutionU from "../../images/Partners/EvolutionU.svg";
import Online from "../../images/Partners/Online.svg";
import Eurekos from "../../images/Partners/Eurekos.svg";
import Itica from "../../images/Partners/Itica.png";
import ThreeDgency from "../../images/Partners/3Dgency.svg";
import Metropolitans from "../../images/Partners/Metropolitans.svg";
import Terranova from "../../images/Partners/Terranova.svg";

const data = [
  {
    title: "Convertise",
    image: Convertise,
  },
  {
    title: "Chiko",
    image: Chiko,
  },
  {
    title: "Collectmedia",
    image: Collectmedia,
  },
  {
    title: "Change-Consulting",
    image: ChangeConsulting,
  },
  {
    title: "Clevver",
    image: Clevver,
  },
  {
    title: "TakeTask",
    image: TakeTask,
  },
  {
    title: "FancyGames",
    image: FancyGames,
  },
  {
    title: "Change-LearnerOn",
    image: LearnerOn,
  },
  {
    title: "Silicon",
    image: Silicon,
  },
  {
    title: "EvolutionU",
    image: EvolutionU,
  },
  {
    title: "Online",
    image: Online,
  },
  {
    title: "Eurekos",
    image: Eurekos,
  },
  {
    title: "Itica",
    image: Itica,
  },
  {
    title: "3Dgency",
    image: ThreeDgency,
  },
  {
    title: "Metropolitans",
    image: Metropolitans,
  },
  {
    title: "Terranova",
    image: Terranova,
  },
];

const Partners = () => {
  return (
    <div className={cl.container}>
      <h3 className={cl.title}>
        Компании с
        <br />
        которыми мы работаем
      </h3>
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
        {data.map((el, i) => (
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
