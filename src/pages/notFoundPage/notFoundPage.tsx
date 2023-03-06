/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/quotes */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cl from "./notFoundPage.module.scss";
import img from "../../images/notFoundPage/notFoundCat.png";
import { useStateContext } from "../../context/StateContext";
import { NOTFOUND_PAGE } from "../../database/notFoundPage";

export default function NotFoundPage() {
  const { localization } = useStateContext();
  const [visible, setVisible] = useState(false);

  const routingRule = localization === "ru";

  const [data, setData] = useState<any>();

  useEffect(() => {
    const res = NOTFOUND_PAGE.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  return (
    <>
      {visible && (
        <div className={cl.section}>
          <div className={cl.container}>
            <h1 className={cl.title}>404</h1>
            <h2 className={cl.subtitle}>{data?.title}</h2>
            <p className={cl.text}>{data?.subTitle}</p>
            <div className={cl.buttons_wr}>
              <NavLink
                end
                to={routingRule ? "/" : `/${localization}`}
                className={cl.button}
              >
                {data?.link1}
              </NavLink>

              <NavLink
                end
                to={routingRule ? "/vacancies" : `/${localization}/vacancies`}
                className={cl.button}
              >
                {data?.link2}
              </NavLink>
            </div>
          </div>
          <div className={cl.img_wr}>
            <img alt="Cat with stars" src={img} className={cl.img} />
          </div>
        </div>
      )}
    </>
  );
}
