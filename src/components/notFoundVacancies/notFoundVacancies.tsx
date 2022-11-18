/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
import React, { useEffect, useState } from "react";
import cl from "./notFoundVacancies.module.scss";
import catImg from "../../images/catVacanciesNotFound.png";
import { useStateContext } from "../../context/StateContext";
import { NOTFOUNDVACANCIES } from "../../database/common/notFoundVacancies";

export default function NotFoundVacancies() {
  const { localization } = useStateContext();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const res = NOTFOUNDVACANCIES.filter(el => (el.language === localization));

    setData(res[0]);
  }, [localization]);

  return (
    <div className={cl.wrapper}>
      <h4 className={cl.title}>{data?.title}</h4>
      <p className={cl.subtitle}>
        {data?.subTitle}
      </p>
      <div className={cl.img_wrapper}>
        <img src={catImg} alt="sad cat" />
      </div>
    </div>
  );
}
