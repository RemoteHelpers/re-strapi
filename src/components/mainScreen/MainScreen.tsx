/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/quotes */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import cl from "./mainScreen.module.scss";
import MainImage from "../../images/mainScreen/MainScreen.png";

import buttonIcon from "../../images/mainScreen/button-icon.svg";
import { useStateContext } from "../../context/StateContext";
import { MainScreenType } from "../../types/types";
import { HOME_PAGE } from "../../database/home_page";

const MainScreen = () => {
  const { scrollToHomeForm, localization } = useStateContext();

  const localizadHeroSectionData = HOME_PAGE.find(
    (el) => el.language === localization
  )?.data.hero_section;

  return (
    <div className={cl.mainScreen} id="mainScreen">
      <div className={cl.info}>
        <h3 className={cl.title}>{localizadHeroSectionData?.title}</h3>
        <p className={cl.paragraph}>{localizadHeroSectionData?.subtitle}</p>
        <button
          type="button"
          className={cl.button}
          onClick={() =>
            scrollToHomeForm?.current?.scrollIntoView({
              block: "start",
              behavior: "smooth",
            })
          }
        >
          {localizadHeroSectionData?.button_label}
          <img src={buttonIcon} alt="button icon" className={cl.buttonIcon} />
        </button>
      </div>

      <img src={MainImage} alt="cat with idea" className={cl.image} />
    </div>
  );
};

export default MainScreen;
