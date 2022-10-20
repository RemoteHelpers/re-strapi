import React from 'react';

// styles
import cl from './feedbackForm.module.scss';
import '../../formFields/feedbackFormSelect.scss';
// img
// import { FormsSvg } from "../../../icons/form/FormsSvg";
import ToTopButton from '../../toTopButton';
import FormFields from '../../formFields';

interface Props {
  img: string;
}

function FeedbackForm({ img }: Props) {
  const url = window.location.pathname === '/videoInterview';

  return (
    <div className={cl.feedback} id="form">
      <div className={cl.feedback_wr}>
        <div className={url ? cl.null_padding : cl.img_wr_desktop}>
          <img src={img} alt="Happy cat" />
        </div>
        <FormFields />
        <div className={cl.feedback_top}>
          <ToTopButton />
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
