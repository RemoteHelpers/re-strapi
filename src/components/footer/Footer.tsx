/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import cl from "./footer.module.scss";

import Logo from "../../images/Footer/logo.png";
import { FooterIconsSVG } from "../../icons/footer/FooterIconsSVG";
import { useStateContext } from "../../context/StateContext";
import { FOOTER } from "../../database/common/footer";

export const Footer = () => {
  const { localization } = useStateContext();

  const localizedFooterData = FOOTER.find(
    (el: any) => el.language === localization
  )?.data;

  return (
    <footer className={cl.Footer}>
      <div className={cl.Footer__links}>
        <img src={Logo} alt="Logo" className={cl.Footer__logo} />
        <div className={cl.Footer__socialWrapper}>
          <a href="https://www.instagram.com/remotemployees/" target="_blank" rel="noreferrer" className={cl.Footer__link}>
            <FooterIconsSVG id="inst" />
          </a>
          <a href="https://fb.com/remotemployees" target="_blank" rel="noreferrer" className={cl.Footer__link}>
            <FooterIconsSVG id="face" />
          </a>
        </div>
      </div>
      <div className={cl.Footer__contacts}>
        <h4 className={cl.Footer__title}>{localizedFooterData?.label}</h4>
        <a
          target="_blank"
          href="https://goo.gl/maps/PXsdBHfVXmeLcZGt5"
          className={cl.Footer__contactsText}
          rel="noreferrer"
        >
          {localizedFooterData?.address}
        </a>
        <a href="tel:+380980000000" className={cl.Footer__contactsText}>
          {localizedFooterData?.phone}
        </a>
        <a
          target="_blank"
          href="mailto:info@remote.employees.com.ua"
          className={cl.Footer__contactsText}
          rel="noreferrer"
        >
          {localizedFooterData?.email}
        </a>
      </div>
    </footer>
  );
};
