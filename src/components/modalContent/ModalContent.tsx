/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/quotes */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import cl from "./modalContent.module.scss";
import ua from "../../images/languages/ukrainian.png";
import sk from "../../images/languages/slovenský.png";
import en from "../../images/languages/english.png";
import pl from "../../images/languages/polski.png";
import ru from "../../images/languages/ru.png";

import uaGif from "../../images/languages/ua.gif";
import skGif from "../../images/languages/sk.gif";
import enGif from "../../images/languages/en.gif";
import plGif from "../../images/languages/pl.gif";
import ruGif from "../../images/languages/ru.gif";

import languageCat from "../../images/languages/languageCat.png";
import { useStateContext } from "../../context/StateContext";

const selectLocalization = [
  { value: "ua", label: "Українська", img: ua, gif: uaGif },
  { value: "pl", label: "Polski", img: pl, gif: plGif },
  { value: "en", label: "English", img: en, gif: enGif },
  { value: "sk", label: "Slovenský", img: sk, gif: skGif },
  { value: "ru", label: "російська", img: ru, gif: ruGif },
];

export default function ModalContent() {
  // const [selectedLocalization, setSelectedLocalization] = useState("ua");
  const {
    setLocalization,
    setIsSubmitLocalization,
    isSubmitLocalization,
    localization,
    setIsOpenModal,
  } = useStateContext();
  const [itemHover, setItemHover] = useState("ru");
  const handleSelectLocalization = (event: any) => {
    setLocalization(event.target.value);
  };

  const routingRule = localization === "ru";
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsOpenModal(false);
  };
  const setHover = (event: any) => {
    setItemHover(event.currentTarget.id);
  };

  return (
    <>
      <h1 className={cl.title}>Обери мову</h1>
      <form className={cl.form}>
        {selectLocalization.map(({ value, label, img, gif }) => {
          return (
            <div className={cl.option} key={value}>
              <input
                type="checkbox"
                checked={localization === value}
                id={value}
                name={label}
                value={value}
                onChange={handleSelectLocalization}
                className={cl.input}
              />
              <label
                id={value}
                className={cl.label}
                htmlFor={value}
                onMouseOver={setHover}
                onMouseDown={setHover}
              >
                <img
                  alt={label}
                  src={localization === value ? gif : img}
                  className={cl.img}
                />
                {label}
              </label>
            </div>
          );
        })}
        <img alt="Language Cat" src={languageCat} className={cl.mainImg} />
        <button type="button" onClick={handleSubmit} className={cl.button}>
          Обрати
        </button>
      </form>
    </>
  );
}
