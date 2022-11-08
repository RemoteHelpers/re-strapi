/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import cl from "./notFoundVacancies.module.scss";
import catImg from "../../images/catVacanciesNotFound.png";

export default function NotFoundVacancies() {
  return (
    <div className={cl.wrapper}>
      <h4 className={cl.title}>Упсс!</h4>
      <p className={cl.subtitle}>
        Схоже, що за твоїм запитом нічого не знайдено
      </p>
      <div className={cl.img_wrapper}>
        <img src={catImg} alt="sad cat" />
      </div>
    </div>
  );
}
