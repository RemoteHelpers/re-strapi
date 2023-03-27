import React from "react";
import cl from "./footer.module.scss";
import { FooterIconsSVG } from "../../icons/footer/FooterIconsSVG";
import { useStateContext } from "../../context/StateContext";
import { Logo } from "../SVGSelector";

export const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { localization, footerData } = useStateContext();

  return (
    <footer className={cl.Footer}>
      <div className={cl.Footer__links}>
        <Logo id="logo" />
        <div className={cl.Footer__socialWrapper}>
          <a href={footerData?.footerInsta} target="_blank" rel="noreferrer" className={cl.Footer__link}>
            <FooterIconsSVG id="inst" />
          </a>
          <a href={footerData?.footerFB} target="_blank" rel="noreferrer" className={cl.Footer__link}>
            <FooterIconsSVG id="face" />
          </a>
        </div>
      </div>
      <div className={cl.Footer__contacts}>
        <h4 className={cl.Footer__title}>{footerData?.footerContacts}</h4>
        <span
          className={cl.Footer__contactsText}
        >
          {footerData?.footerAdress}
        </span>
        <a href={`viber://chat?number=${footerData?.footerNumber}`} className={cl.Footer__contactsText}>
          +
          {footerData?.footerNumber}
        </a>
        <a
          target="_blank"
          href={`mailto: ${footerData?.footerMail}`}
          className={cl.Footer__contactsText}
          rel="noreferrer"
        >
          {footerData?.footerMail}
        </a>
      </div>
    </footer>
  );
};
