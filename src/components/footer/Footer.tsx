import React from 'react';
import cl from './footer.module.scss';

import Logo from '../../images/Footer/logo.png';
import { FooterIconsSVG } from './FooterIconsSVG';

export const Footer = () => {
  return (
    <div className={cl.Footer}>
      <div className={cl.Footer__links}>
        <img src={Logo} alt="Logo" className={cl.Footer__logo} />
        <div className={cl.Footer__socialWrapper}>
          <a href="google.com" className={cl.Footer__link}>
            <FooterIconsSVG id="inst" />
          </a>
          <a href="google.com" className={cl.Footer__link}>
            <FooterIconsSVG id="face" />
          </a>
          <a href="google.com" className={cl.Footer__link}>
            <FooterIconsSVG id="telega" />
          </a>
        </div>
      </div>
      <div className={cl.Footer__contacts}>
        <h4 className={cl.Footer__title}>Контакти</h4>
        <span className={cl.Footer__contactsText}>м, Харків вул. Римарська, 22</span>
        <a href="google.com" className={cl.Footer__contactsText}>+3 (098) 000-00-00</a>
        <a href="google.com" className={cl.Footer__contactsText}>info@remote.employees.com.ua</a>
      </div>
    </div>
  );
};
