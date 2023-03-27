/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm } from "react-hook-form";
import cl from "./formFields.module.scss";
import Api from "../../api";
import { IFeedbackFormData } from "../../types/types";
import { useStateContext } from "../../context/StateContext";
import vacancyCat from "../../icons/vacancyCat.png";
import feedbackCat from "../../images/formImg.png";
import interviewCat from "../../icons/interview_form_kitekat.png";
import Loader from "../loader/Loader";
import { FORM_FIELDS } from "../../database/common/formFields";
import LangSelect from "../langSelect/LangSelect";

type TOption = {
  value: string;
  label: string;
};

const FormFields = () => {
  const {
    localization, setIsFormSubmitError, langInputValue
  } = useStateContext();
  const { vacancyID } = useParams();

  const routingRule = localization === "ru";

  const navigate = useNavigate();
  const EnglishLevel = [
    { value: "beginner", label: "Beginner" },
    { value: "elementary ", label: "Elementary" },
    { value: "pre-intermediate", label: "Pre-Intermediate" },
    { value: "intermediate", label: "Intermediate" },
    { value: "upper-intermediate", label: "Upper-Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "Proficiency", label: "Proficiency" },
  ];
  const localizedFormFieldData = FORM_FIELDS.find(
    (el: any) => el.language === localization
  )?.data;
  const [selectedOption, setSelectedOption] = useState<TOption | null>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IFeedbackFormData>();

  // const [number, setNumber] = useState("");

  const onSubmit = handleSubmit(async (data: IFeedbackFormData) => {
    try {
      const arrFile = await Api.uploadFile({
        files: data.CV[0],
      });

      await Api.feedBackForm({
        ...data,
        CV: arrFile[0].id,
        pageFrom: window.location.href,
        number: langInputValue
      });
      setSelectedOption(null);
      reset();
      routingRule
        ? navigate("/thankyou")
        : navigate(`/${localization}/thankyou`);
    } catch (error) {
      setIsFormSubmitError(true);
    }
  });

  useEffect(() => {
    register("englishLevel", {
      required: true,
    });
    register("CV", {
      required: true,
    });
  }, []);

  const changeEnglishLevel = (value: any) => {
    setValue("englishLevel", value.value, { shouldValidate: true });
    setSelectedOption(value);
  };

  const url = window.location.pathname === `/${localization}/${vacancyID}`;
  const interviewUrl =
    window.location.pathname === `/${localization}/videoInterview`;

  return (
    <>
      {isSubmitting ? (
        <div className={isSubmitting ? cl.darker_bg : ""}>
          <Loader />
        </div>
      ) : (
        <form onSubmit={onSubmit} className={cl.form_wrapper}>
          <div className={cl.wr_form}>
            <div className={cl.input_wr}>
              <div className={cl.input_name}>
                <input
                  className={`${errors.name && url ? cl.invalid : ""} ${
                    watch("name") && cl.valid
                  } + ${url ? cl.white : cl.main}`}
                  type="text"
                  placeholder={localizedFormFieldData?.fields.name.placeholder}
                  {...register("name", { required: true })}
                />
              </div>
              <div className={cl.input_phone}>
                <LangSelect mask="(099) 999-99-99" />
              </div>
              <div className={cl.input_email}>
                <input
                  type="email"
                  className={`${errors.eMail ? cl.invalid : ""} ${
                    watch("eMail") && cl.valid
                  } + ${url ? cl.white : cl.main}`}
                  placeholder={localizedFormFieldData?.fields.email.placeholder}
                  {...register("eMail", { required: true })}
                />
              </div>
              <div className={cl.input_age}>
                <input
                  type="text"
                  minLength={2}
                  maxLength={2}
                  className={`${errors.age ? cl.invalid : ""} ${
                    watch("age") && cl.valid
                  } + ${url ? cl.white : cl.main}`}
                  placeholder={localizedFormFieldData?.fields.age.placeholder}
                  {...register("age", { required: true })}
                />
              </div>
            </div>
            <div className={cl.input_wr}>
              <div className={cl.input_text}>
                {localizedFormFieldData?.fields.englishLevel.label}
              </div>
              <Select
                className={`react-select-container ${
                  errors.englishLevel ? "invalid" : ""
                } ${watch("englishLevel") ? "valid" : ""} `}
                placeholder={
                  localizedFormFieldData?.fields.englishLevel.placeholder
                }
                classNamePrefix={url ? "react-select" : "select"}
                defaultValue={selectedOption}
                onChange={changeEnglishLevel}
                options={EnglishLevel}
              />
            </div>
            <div className={cl.input_cvLink}>
              <input
                type="text"
                className={`${errors.cv_link ? cl.invalid : ""} ${
                  watch("cv_link") && cl.valid
                } + ${url ? cl.white : cl.main}`}
                placeholder="Add CV link of file..."
                {...register("cv_link", { required: true })}
              />
              <div className={cl.cv_submit}>
                <label className={cl.label_file}>
                  <input
                    type="text"
                    name="fileName"
                    readOnly
                    required
                    className={`${errors.CV ? cl.invalid : ""} ${
                      watch("CV" as any)?.[0]?.name && cl.valid
                    } ${cl.download_btn}`}
                    placeholder={localizedFormFieldData?.fields.cv.placeholder}
                    value={watch("CV" as any)?.[0]?.name || ""}
                  />
                  <input
                    className={cl.attach_CV_btn}
                    type="file"
                    accept=".doc,.docx,.xml,application/pdf"
                    required
                    {...register("CV", { required: true })}
                  />
                </label>
              </div>
            </div>
            {interviewUrl ? (
              <div className={cl.vacancy_mobile_cat}>
                <img src={interviewCat} alt="" />
              </div>
            ) : (
              <div>
                {url ? (
                  <div className={cl.vacancy_mobile_cat}>
                    <img src={vacancyCat} alt="" />
                  </div>
                ) : (
                  <div className={cl.vacancy_mobile_cat}>
                    <img src={feedbackCat} alt="" />
                  </div>
                )}
              </div>
            )}
            <div className={cl.buttons_wr}>
              <button
                type="submit"
                className={cl.submit_btn}
                disabled={isSubmitting}
              >
                {localizedFormFieldData?.submit}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default FormFields;