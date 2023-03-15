/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
// import Lottie from 'react-lottie';
// import animationData from '../../images/Spheres/anim/cat-hand-1.json';
import React from "react";
import Marketing from "../../images/Spheres/Marketing.png";
import Management from "../../images/Spheres/Management.png";
import Developing from "../../images/Spheres/Developing.png";
import Design from "../../images/Spheres/Design.png";
import Translate from "../../images/Spheres/Translate.png";
import Education from "../../images/Spheres/Education.png";

import "./spheres.scss";

import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const Spheres = () => {
  const { localization, globalCategories } = useStateContext();

  const routingRule = localization === 'ru';

  function chooseImage(id: string | number) {
    switch (id) {
      case "development":
        return Developing;
      case "design":
        return Design;
      case "marketing":
        return Marketing;
      case "managers":
        return Management;
      case "translators":
        return Translate;
      case "tutors":
        return Education;
      default:
        return Education;
    }
  }

  return (
    <div className="Spheres">
      <div className="Spheres__block">
        {globalCategories.map((sphere: any) => (
          <Link
            key={sphere.id}
            to={
              routingRule
                ? `/${sphere.attributes.categorySlug}`
                : `/${localization}/${sphere.attributes.categorySlug}`
            }
            className="Spheres__sphere"
          >
            <img
              src={chooseImage(sphere.attributes.categorySlug as string)}
              alt="sphere"
              className="Spheres__icon"
            />
            <h5 className="Spheres__sphere-title">
              {sphere.attributes.categoryTitle}
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Spheres;
