import React from 'react';
import cl from './footer.module.scss';

import Logo from '../../images/Footer/logo.png';
import Instagram from '../../images/Footer/instagram.svg';
import Facebook from '../../images/Footer/facebook.svg';
import Telegram from '../../images/Footer/telegram.svg';

const Footer = () => {
  return (
    <div className={cl.Footer}>
      <div className={cl.Footer__links}>
        <img src={Logo} alt="Logo" className={cl.Footer__logo} />
        <div className={cl.Footer__socialWrapper}>
          <a href="google.com" className={cl.Footer__link}>
            <img src={Instagram} alt="Instagram" />
          </a>
          <a href="google.com" className={cl.Footer__link}>
            <img src={Facebook} alt="Facebook" />
          </a>
          <a href="google.com" className={cl.Footer__link}>
            <img src={Telegram} alt="Telegram" />
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

export default Footer;
