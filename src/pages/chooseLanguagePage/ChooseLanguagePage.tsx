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
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

import cl from "./chooseLanguagePage.module.scss";
import ua from "../../images/languages/ukrainian.png";
import sk from "../../images/languages/slovenský.png";
import en from "../../images/languages/english.png";
import pl from "../../images/languages/polski.png";
import ru from "../../images/languages/ru.png";
import languageCat from "../../images/languages/languageCat.png";

const selectLocalization = [
  { value: "uk", label: "Українська", img: ua },
  { value: "pl", label: "Polski", img: pl },
  { value: "en", label: "English", img: en },
  { value: "sk", label: "Slovenský", img: sk },
  { value: "ru", label: "російська", img: ru },
];

export default function ChooseLanguagePage() {
  const [selectedLocalization, setSelectedLocalization] = useState("uk");

  const [localization, setLocalization] = useLocalStorage("localization", "uk");
  const [isSubmitLocalization, setIsSubmitLocalization] = useLocalStorage(
    "isSubmitLocalization",
    false
  );

  const handleSelectLocalization = (event: any) => {
    setSelectedLocalization(event.target.value);
  };

  const handleSubmit = () => {
    setLocalization(selectedLocalization);
    setIsSubmitLocalization(true);
    window.location.reload();
  };
  return (
    <div className={cl.section}>
      <div className={cl.container}>
        <h1 className={cl.title}>Обери мову</h1>
        <form className={cl.form}>
          {selectLocalization.map(({ value, label, img }) => {
            return (
              <div className={cl.option} key={value}>
                <input
                  type="checkbox"
                  checked={selectedLocalization === value}
                  id={value}
                  name={label}
                  value={value}
                  onChange={handleSelectLocalization}
                  className={cl.input}
                />
                <label className={cl.label} htmlFor={value}>
                  <img alt="#" src={img} className={cl.img} />
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
      </div>
    </div>
  );
}
