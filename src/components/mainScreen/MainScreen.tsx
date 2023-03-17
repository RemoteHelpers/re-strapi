/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import ReactMarkdown from "react-markdown";
import cl from "./mainScreen.module.scss";
import MainImage from "../../images/mainScreen/MainScreen.png";

import buttonIcon from "../../images/mainScreen/button-icon.svg";
import { useStateContext } from "../../context/StateContext";

const MainScreen = () => {
  const { scrollToHomeForm, homeData } = useStateContext();

  return (
    <div className={cl.mainScreen} id="mainScreen">
      <div className={cl.info}>
        <h3 className={cl.title}>{homeData?.mainScreenTitle}</h3>
        <p className={cl.paragraph}>
          <ReactMarkdown children={homeData?.mainScreenParagraph} />
        </p>
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
          {homeData?.mainScreenButton}
          <img src={buttonIcon} alt="button icon" className={cl.buttonIcon} />
        </button>
      </div>

      <img src={MainImage} alt="cat with idea" className={cl.image} />
    </div>
  );
};

export default MainScreen;
