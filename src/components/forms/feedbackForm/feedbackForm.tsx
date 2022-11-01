import React from 'react';

// styles
import cl from './feedbackForm.module.scss';
import '../../formFields/feedbackFormSelect.scss';
// img
// import { FormsSvg } from "../../../icons/form/FormsSvg";
import FormFields from '../../formFields';
import ToTopButton from '../../toTopButton/ToTopButton';
import { useStateContext } from '../../../context/StateContext';

import feedbackCat from '../../../images/formImg.png';
import vacancyCat from '../../../icons/interview_form_kitekat.png';

function FeedbackForm() {
  const { localization } = useStateContext();

  const url = window.location.pathname === `/${localization}/videoInterview`;

  return (
    <>
      <h1 className={url ? cl.feedback_video_form_title : cl.feedback_form_title}>
        Готовы присоединиться
        <br />
        прямо сейчас?
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
          <div className={cl.feedback_top}>
            <ToTopButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackForm;
