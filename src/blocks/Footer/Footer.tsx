import React from 'react';
import './Footer.scss';

import Logo from '../../images/Footer/logo.png';
import Instagram from '../../images/Footer/instagram.svg';
import Facebook from '../../images/Footer/facebook.svg';
import Telegram from '../../images/Footer/telegram.svg';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__links">
        <img src={Logo} alt="Logo" className="Footer__logo" />
        <div className="Footer__social-wrapper">
          <a href="google.com" className="Footer__link">
            <img src={Instagram} alt="Instagram" />
          </a>
          <a href="google.com" className="Footer__link">
            <img src={Facebook} alt="Facebook" />
          </a>
          <a href="google.com" className="Footer__link">
            <img src={Telegram} alt="Telegram" />
          </a>
        </div>
      </div>
      <div className="Footer__contacts">
        <h4 className="Footer__title">Контакти</h4>
        <span className="Footer__contacts-text">м, Харків вул. Римарська, 22</span>
        <a href="google.com" className="Footer__contacts-text">+3 (098) 000-00-00</a>
        <a href="google.com" className="Footer__contacts-text">info@remote.employees.com.ua</a>
      </div>
    </div>
  );
};

export default Footer;
