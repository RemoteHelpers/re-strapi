/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import cl from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={cl.loader__wrapper}>
      <div className={cl.loading}>
        <div className={cl.roller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
