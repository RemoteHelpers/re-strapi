/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import cl from "./footer.module.scss";

import Logo from "../../images/Footer/logo.png";
import { FooterIconsSVG } from "../../icons/footer/FooterIconsSVG";

export const Footer = () => {
  return (
    <footer className={cl.Footer}>
      <div className={cl.Footer__links}>
        <img src={Logo} alt="Logo" className={cl.Footer__logo} />
        <div className={cl.Footer__socialWrapper}>
          <a href="https://google.com" className={cl.Footer__link}>
            <FooterIconsSVG id="inst" />
          </a>
          <a href="https://google.com" className={cl.Footer__link}>
            <FooterIconsSVG id="face" />
          </a>
          <a href="https://google.com" className={cl.Footer__link}>
            <FooterIconsSVG id="telega" />
          </a>
        </div>
      </div>
      <div className={cl.Footer__contacts}>
        <h4 className={cl.Footer__title}>Контакти</h4>
        <a
          target="_blank"
          href="https://goo.gl/maps/PXsdBHfVXmeLcZGt5"
          className={cl.Footer__contactsText}
          rel="noreferrer"
        >
          м, Харків вул. Римарська, 22
        </a>
        <a href="tel:+380980000000" className={cl.Footer__contactsText}>
          +39 (098) 000-00-00
        </a>
        <a
          target="_blank"
          href="mailto:info@remote.employees.com.ua"
          className={cl.Footer__contactsText}
          rel="noreferrer"
        >
          info@remote.employees.com.ua
        </a>
      </div>
    </footer>
  );
};
