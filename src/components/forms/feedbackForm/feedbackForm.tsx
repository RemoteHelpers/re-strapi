
import cl from "./feedbackForm.module.scss";
import "../../formFields/feedbackFormSelect.scss";
import FormFields from "../../formFields";
import { useStateContext } from "../../../context/StateContext";
import feedbackCat from "../../../images/formImg.png";
import vacancyCat from "../../../icons/interview_form_kitekat.png";
import ToTopButton from "../../toTopButton/ToTopButton";

const FeedbackForm = () => {
  const { localization, scrollToHomeForm, formData } = useStateContext();

  const url = window.location.pathname === `/${localization}/videoInterview`;
  const urlRu = window.location.pathname === `/videoInterview`;

  return (
    <div className={cl.feedback_form_wrapper}>
      <h1
        ref={scrollToHomeForm}
        className={url ? cl.feedback_video_form_title : cl.feedback_form_title}
      >
        {formData?.title}
      </h1>
      <div className={cl.feedback} id="form">
        <div className={cl.feedback_wr}>
          <div className={url ? cl.null_padding : cl.img_wr_desktop}>
            {url || urlRu ? (
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
    </div>
  );
}

export default FeedbackForm;
