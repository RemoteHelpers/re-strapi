/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

import img from "../../images/thankPage/cat_thankYouPage.png";
import cl from "./thankYouPage.module.scss";
import { THANKYOU_PAGE } from "../../database/thankYouPage";

export const ThankYouPage = () => {
  const { localization, scrollToTop, footerData } = useStateContext();

  const routingRule = localization === "ru";

  const [data, setData] = useState<any>();

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    const res = THANKYOU_PAGE.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  return (
    <div className={cl.section}>
      <div className={cl.container}>
        <h1 className={cl.title}>{data?.title}</h1>

        <ul className={cl.list}>
          <li className={cl.item}>
            <h2 className={cl.subtitle}>{data?.subTitle}</h2>
            <p className={cl.text}>{data?.paragraph}</p>
            <NavLink
              end
              to={
                routingRule
                  ? "/videoInterview"
                  : `/${localization}/videoInterview`
              }
              className={cl.button}
            >
              {data?.linkText}
            </NavLink>
          </li>
          <li className={cl.item}>
            <h2 className={cl.subtitle}>{data?.titleViber}</h2>
            <p className={cl.text}>{data?.paragraphViber}</p>
            <a href={`viber://chat?number=${footerData?.footerNumber}`} className={cl.button}>
              {data?.linkViber}
            </a>
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
