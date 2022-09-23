import React from 'react';
import cl from './footer.module.scss';
// eslint-disable-next-line import/extensions
import logo from '../../icons/footer_logo.png';
import { FooterIconsSVG } from './FooterIconsSVG';

export const Footer = () => {
  return (
    <footer className={cl.footer}>
      <div className={cl.container}>
        <div className={cl.wrapper}>
          <div className={cl.social_block}>
            <div>
              <img src={logo} alt="" />
            </div>
            <div className={cl.social_icons}>
              <span className={cl.icon_circle}>
                <FooterIconsSVG id="inst" />
              </span>
              <span className={cl.icon_circle}>
                <FooterIconsSVG id="face" />
              </span>
              <span className={cl.icon_circle}>
                <FooterIconsSVG id="telega" />
              </span>
            </div>
          </div>
          <div className={cl.info_block}>
            <h2>Контакти</h2>
            <p>м, Харків вул. Римарська, 22</p>
            <p>+3 (098) 000-00-00</p>
            <p>info@remote.employees.com.ua</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
