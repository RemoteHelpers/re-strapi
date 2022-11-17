/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";

import "./spheres.scss";

import { useStateContext } from "../../context/StateContext";
import { SPHERES_SECTION } from "../../database/common/spheres_section";

const Spheres = () => {
  const { localization } = useStateContext();

  const localizadSpheresData = SPHERES_SECTION.find(
    (el) => el.language === localization
  )?.data.spheres;

  return (
    <div className="Spheres">
      <div className="Spheres__block">
        {localizadSpheresData?.map(({ title, id, img }) => (
          <div
            key={id}
            className="
        Spheres__sphere"
          >
            <img src={img} alt="Education" className="Spheres__icon" />
            <h5 className="Spheres__sphere-title">{title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spheres;
