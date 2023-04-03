/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

import cl from "./thankYouPage.module.scss";

import { API, PhotoAPI } from "../../constants";

export const ThankYouPage = () => {
  const { localization, scrollToTop, footerData } = useStateContext();
  const [thankYouData, setThankYouData] = useState<any>();

  const routingRule = localization === "ru";

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/thank-you?locale=${
          localization === "ua" ? "uk" : localization
        }&populate=*`
      )
      .then((res) => {
        setThankYouData(res.data.data.attributes);
        // console.log(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  return (
    <div className={cl.section}>
      <div className={cl.container}>
        <h1 className={cl.title}>{thankYouData?.title}</h1>

        <ul className={cl.list}>
          <li className={cl.item}>
            <h2 className={cl.subtitle}>{thankYouData?.subTitle}</h2>
            <p className={cl.text}>{thankYouData?.paragraph}</p>
            <NavLink
              end
              to={
                routingRule
                  ? "/videoInterview"
                  : `/${localization}/videoInterview`
              }
              className={cl.button}
            >
              {thankYouData?.linkText}
            </NavLink>
          </li>
          <li className={cl.item}>
            <h2 className={cl.subtitle}>{thankYouData?.titleViber}</h2>
            <p className={cl.text}>{thankYouData?.paragraphViber}</p>
            <a
              href={`viber://chat?number=${footerData?.footerNumber}`}
              className={cl.button}
            >
              {thankYouData?.linkViber}
            </a>
          </li>
          <div className={cl.img_wr}>
            <img
              alt="Cat with stars"
              src={
                PhotoAPI + thankYouData?.thankYouCat?.data[0]?.attributes.url
              }
              className={cl.img}
            />
          </div>
        </ul>
      </div>
      <div className={cl.decoration}></div>
    </div>
  );
};
