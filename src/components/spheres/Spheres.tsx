/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";
// import Lottie from 'react-lottie';
// import animationData from '../../images/Spheres/anim/cat-hand-1.json';

import "./spheres.scss";

import { useStateContext } from "../../context/StateContext";
import { SPHERES_SECTION } from "../../database/common/spheres_section";

const Spheres = () => {
  const { localization } = useStateContext();

  const localizadSpheresData = SPHERES_SECTION.find(
    (el) => el.language === localization
  )?.data.spheres;

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };

  return (
    <div className="Spheres">
      <div className="Spheres__block">
        {localizadSpheresData?.map(({ title, id, img }) => (
          <div
            key={id}
            className="Spheres__sphere"
          >
            <img src={img} alt="sphere" className="Spheres__icon" />
            <h5 className="Spheres__sphere-title">{title}</h5>
          </div>
        ))}
        {/* <Lottie
          isPaused
          options={defaultOptions}
          width="100%"
          height="100%"
        /> */}
      </div>
    </div>
  );
};

export default Spheres;
