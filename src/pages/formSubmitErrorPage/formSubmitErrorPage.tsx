/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { FOOTER } from "../../database/common/footer";
import catImg from "../../images/catVacanciesNotFound.png";
import cl from "./formSubmitErrorPage.module.scss";
import viberIcon from "../../icons/viber.svg";
import telegramIcon from "../../icons/telegram.svg";
import emailIcon from "../../icons/email.svg";
/* eslint-disable @typescript-eslint/quotes */
export default function FormSubmitErrorPage() {
  const { localization } = useStateContext();

  const localizedFooterData = FOOTER.find(
    (el: any) => el.language === localization
  )?.data;

  return (
    <div className={cl.container}>
      <div className={cl.wrapper}>
        <h4 className={cl.title}>Упсс!</h4>
        <p className={cl.subtitle}>
          Нажаль форма не відправлена через проблеми на нашому боці
        </p>
        <div className={cl.img_wrapper}>
          <img src={catImg} alt="sad cat" />
        </div>
        <p className={cl.text}>Але ви можете з нами зв‘язатися: </p>
        <ul className={cl.links}>
          <li className={cl.link}>
            <img src={emailIcon} alt="email icon" />
            <a
              target="_blank"
              href="mailto:info@remote.employees.com.ua"
              className={cl.contactsText}
              rel="noreferrer"
            >
              {localizedFooterData?.email}
            </a>
          </li>
          <li className={cl.link}>
            <img src={viberIcon} alt="viber Icon" />
            <a href="viber://chat?number=380980000000" className={cl.button}>
              {localizedFooterData?.phone}
            </a>
          </li>
          <li className={cl.link}>
            <img src={telegramIcon} alt="telegram Icon" />
            <a
              target="_blank"
              href="https://t.me/RemotEmployeesOlha"
              className={cl.contactsText}
              rel="noreferrer"
            >
              @RemotEmployeesOlha
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
