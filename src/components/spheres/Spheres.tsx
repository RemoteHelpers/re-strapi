/* eslint-disable @typescript-eslint/quotes */
import React from "react";

import "./spheres.scss";
import "../../global-styles/grid.scss";

import Marketing from "../../images/Spheres/Marketing.png";
import Management from "../../images/Spheres/Management.png";
import Developing from "../../images/Spheres/Developing.png";
import Design from "../../images/Spheres/Design.png";
import Translate from "../../images/Spheres/Translate.png";
import Education from "../../images/Spheres/Education.png";
import { useStateContext } from "../../context/StateContext";

const Spheres = () => {
  const { homeData } = useStateContext();

  return (
    <div className="Spheres">
      <div className="Spheres__block grid">
        <div
          className={`
          Spheres__sphere grid__item--desktop-1-2
          grid__item--1
          Spheres__sphere grid__item--tablet-1
          `}
        >
          <img src={Marketing} alt="Marketing" className="Spheres__icon" />
          <h5 className="Spheres__sphere-title">{homeData?.attributes.marketingSphere}</h5>
        </div>
        <div
          className="
          Spheres__sphere grid__item--desktop-3-4
          grid__item--1
          Spheres__sphere grid__item--tablet-2"
        >
          <img src={Management} alt="Management" className="Spheres__icon" />
          <h5 className="Spheres__sphere-title">{homeData?.attributes.managementSphere}</h5>
        </div>
        <div
          className="
          Spheres__sphere grid__item--desktop-5-6
          grid__item--1
          Spheres__sphere grid__item--tablet-3"
        >
          <img src={Developing} alt="Developing" className="Spheres__icon" />
          <h5 className="Spheres__sphere-title">{homeData?.attributes.developmentSphere}</h5>
        </div>
        <div
          className="
          Spheres__sphere grid__item--desktop-7-8
          grid__item--1
          Spheres__sphere grid__item--tablet-1
          "
        >
          <img src={Design} alt="Design" className="Spheres__icon" />
          <h5 className="Spheres__sphere-title">{homeData?.attributes.designSphere}</h5>
        </div>
        <div
          className="
          Spheres__sphere grid__item--desktop-9-10
          grid__item--1
          Spheres__sphere grid__item--tablet-2"
        >
          <img src={Translate} alt="Translate" className="Spheres__icon" />
          <h5 className="Spheres__sphere-title">{homeData?.attributes.translationSphere}</h5>
        </div>
        <div
          className="
          Spheres__sphere grid__item--desktop-11-12
          grid__item--1
          Spheres__sphere grid__item--tablet-3"
        >
          <img src={Education} alt="Education" className="Spheres__icon" />
          <h5 className="Spheres__sphere-title">{homeData?.attributes.educationSphere}</h5>
        </div>
      </div>
    </div>
  );
};

export default Spheres;
