import React from 'react';

// styles
import cl from './feedbackForm.module.scss';
import '../../formFields/feedbackFormSelect.scss';
// img
// import { FormsSvg } from "../../../icons/form/FormsSvg";
import FormFields from '../../formFields';
import { ToTopButton } from '../../toTopButton/ToTopButton';
import { useStateContext } from '../../../context/StateContext';

import feedbackCat from '../../../images/formImg.png';
import vacancyCat from '../../../icons/interview_form_kitekat.png';

function FeedbackForm() {
  const url = window.location.pathname === '/videoInterview';
  const { scrollToTop } = useStateContext();

  return (
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
        <button
          type="button"
          className={cl.feedback_top}
          onClick={() => scrollToTop?.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
        >
          <ToTopButton />
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;
