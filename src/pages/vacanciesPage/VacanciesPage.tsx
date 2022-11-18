/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
import Vacancies from "../../blocks/Vacancies";

export const VacaniesPage = () => {
  useEffect(() => {
    document.title = "Вакансії";
  }, []);

  return (
    <>
      <Vacancies />
    </>
  );
};
