/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";

// styles
import cl from "./feedbackForm.module.scss";
import "../../formFields/feedbackFormSelect.scss";
// img
// import { FormsSvg } from "../../../icons/form/FormsSvg";
import FormFields from "../../formFields";
import { useStateContext } from "../../../context/StateContext";

import feedbackCat from "../../../images/formImg.png";
import vacancyCat from "../../../icons/interview_form_kitekat.png";
import ToTopButton from "../../toTopButton/ToTopButton";
import { FORM_FIELDS } from "../../../database/common/formFields";

function FeedbackForm() {
  const { localization } = useStateContext();

  const localizedFormFieldData = FORM_FIELDS.find(
    (el: any) => el.language === localization
  )?.data;

  const url = window.location.pathname === `/${localization}/videoInterview`;

  return (
    <>
      <h1
        className={url ? cl.feedback_video_form_title : cl.feedback_form_title}
      >
        {localizedFormFieldData?.title}
      </h1>
      <div className={cl.feedback} id="form">
        <div className={cl.feedback_wr}>
          <div className={url ? cl.null_padding : cl.img_wr_desktop}>
            {url ? (
              <img src={vacancyCat} alt="Happy cat" />
            ) : (
              <img src={feedbackCat} alt="Happy cat" />
            )}
          </div>
          <FormFields />
        </div>
      </div>
      <div className={cl.toTopButton}>
        <ToTopButton />
      </div>
    </>
  );
}

export default FeedbackForm;
