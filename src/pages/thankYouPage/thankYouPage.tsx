/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

import img from "../../images/thankPage/cat_thankYouPage.png";
import cl from "./thankYouPage.module.scss";

export const ThankYouPage = () => {
  return (
    <div className={cl.section}>
      <div className={cl.container}>
        <h1 className={cl.title}>
          Спасибо, что
          <br />
          оставили заявку!
        </h1>

        <ul className={cl.list}>
          <li className={cl.item}>
            <h2 className={cl.subtitle}>Запишите видеоинтервью</h2>
            <p className={cl.text}>
              Вместо собеседования запишите небольшой рассказ о себе на
              английском.
            </p>
            <button className={cl.button} type="button">
              Дивитися більше
            </button>
          </li>
          <li className={cl.item}>
            <h2 className={cl.subtitle}>Напишите нам в Viber</h2>
            <p className={cl.text}>
              Чтобы получить работу, Вам осталось совсем немного - свяжитесь с
              нами в Viber.
            </p>
            <button className={cl.button} type="button">
              Написати
            </button>
          </li>
          <div className={cl.img_wr}>
            <img alt="Cat with stars" src={img} className={cl.img} />
          </div>
        </ul>
      </div>
      <div className={cl.decoration}></div>
    </div>
  );
};
