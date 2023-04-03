import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import cl from "./notFoundPage.module.scss";
import { useStateContext } from "../../context/StateContext";

import { API, PhotoAPI } from "../../constants";

export default function NotFoundPage() {
  const { localization } = useStateContext();
  const [visible, setVisible] = useState(false);
  const [notFoundData, setNotFoundData] = useState<any>();

  const routingRule = localization === "ru";

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/not-found?locale=${
          localization === "ua" ? "uk" : localization
        }&populate=*`
      )
      .then((res) => {
        setNotFoundData(res.data.data.attributes);
        console.log(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  return (
    <>
      {visible && (
        <div className={cl.section}>
          <div className={cl.container}>
            <h1 className={cl.title}>404</h1>
            <h2 className={cl.subtitle}>{notFoundData?.title}</h2>
            <p className={cl.text}>{notFoundData?.subTitle}</p>
            <div className={cl.buttons_wr}>
              <NavLink
                end
                to={routingRule ? "/" : `/${localization}`}
                className={cl.button}
              >
                {notFoundData?.link1}
              </NavLink>

              <NavLink
                end
                to={routingRule ? "/vacancies" : `/${localization}/vacancies`}
                className={cl.button}
              >
                {notFoundData?.link2}
              </NavLink>
            </div>
          </div>
          <div className={cl.img_wr}>
            <img
              alt="Cat with stars"
              src={
                PhotoAPI + notFoundData?.notFoundCat?.data[0]?.attributes.url
              }
              className={cl.img}
            />
          </div>
        </div>
      )}
    </>
  );
}
