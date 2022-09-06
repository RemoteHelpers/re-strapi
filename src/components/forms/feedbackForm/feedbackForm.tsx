import React, { useEffect } from 'react';
import Api from '../../../api';

import './feedbackForm.scss';

function FeedbackForm() {
  return (
    <form className="feedback-form">
      <div className="feedback-form_input">
        <input type="text" name="name" placeholder="ПІБ" />
      </div>
      <div className="feedback-form_input">
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div className="feedback-form_input">
        <textarea name="description" placeholder="Опис" />
      </div>
      <button type="submit" className="feedback-form_submit">Надіслати</button>
    </form>
  );
}

export default FeedbackForm;
