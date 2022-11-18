/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable comma-dangle */
/* eslint-disable no-redeclare */
/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/quotes */
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import cl from "./chooseLanguageModal.module.scss";
import ModalContent from "../modalContent";
import { useStateContext } from "../../context/StateContext";

const modalRoot = document.querySelector("#modal-root")!;

export default function ChooseLanguageModal() {
  const { isSubmitLocalization, setIsOpenModal, isOpenModal } =
    useStateContext();

  const onClose = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.code === "Escape") {
        onClose();
      }
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropclick = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={isOpenModal ? cl.overlay : cl.hidden}
      onClick={handleBackdropclick}
    >
      <div className={cl.modal}>
        <CloseIcon
          className={cl.iconClose}
          onClick={onClose}
          sx={{
            cursor: "pointer",
            position: "absolute",
            right: "2%",
            top: "5%",
            textDecoration: "none",
            color: "#000000",
            display: "block",
          }}
        />
        <div className={cl.wrapper}>
          <ModalContent />
        </div>
      </div>
    </div>,
    modalRoot
  );
}
