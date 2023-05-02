/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createPortal } from "react-dom";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import cl from "./chooseLanguageModal.module.scss";
import ModalContent from "../modalContent";
import { useStateContext } from "../../context/StateContext";

const modalRoot = document.querySelector("#modal-root")!;

export default function ChooseLanguageModal() {
  const {
    setIsOpenModal,
    isOpenModal,
    setIsSubmitLocalization
  } = useStateContext();

  const onClose = () => {
    setIsOpenModal(false);
    setIsSubmitLocalization(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.code === "Escape") {
        onClose();
      }
      // document.body.style.overflow = "hidden";
      // return () => (document.body.style.overflow = "unset");
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
