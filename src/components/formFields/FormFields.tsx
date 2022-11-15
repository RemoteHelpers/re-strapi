/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import cl from "./formFields.module.scss";
import Api from "../../api";
import { IFeedbackFormData } from "../../types/types";
import { useStateContext } from "../../context/StateContext";
import vacancyCat from "../../icons/vacancyCat.png";
import feedbackCat from "../../images/formImg.png";
import interviewCat from "../../icons/interview_form_kitekat.png";
import Loader from "../loader/Loader";

type TOption = {
  value: string;
  label: string;
};

export const FormFields = () => {
  const { localization } = useStateContext();
  const { vacancyID } = useParams();
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

  const [selectedOption, setSelectedOption] = useState<TOption | null>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IFeedbackFormData>();

  const [number, setNumber] = useState("");

  const onSubmit = handleSubmit(async (data: IFeedbackFormData) => {
    try {
      const arrFile = await Api.uploadFile({
        files: data.CV[0],
      });

      await Api.feedBackForm({
        ...data,
        CV: arrFile[0].id,
      });
      setNumber("");
      setSelectedOption(null);
      reset();
      navigate(`/${localization}/thankyou`);
    } catch (error) {
      console.log(error, "send feedBack form");
    }
  });

  useEffect(() => {
    register("englishLevel", {
      required: true,
    });
    register("number", {
      required: true,
    });
  }, []);

  const changeEnglishLevel = (value: any) => {
    setValue("englishLevel", value.value, { shouldValidate: true });
    setSelectedOption(value);
  };

  const changePhone = (e: any) => {
    setValue("number", e.target.value, { shouldValidate: true });
    setNumber(e.target.value);
  };

  const url =
    window.location.pathname === `/${localization}/vacancies/${vacancyID}`;
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
                  className={`${errors.name && url ? cl.invalid : ""} ${watch("name") && cl.valid} + ${url ? cl.white : cl.main}`}
                  type="text"
                  placeholder="ПІБ"
                  {...register("name", { required: true })}
                />
              </div>
              <div className={cl.input_phone}>
                <InputMask
                  mask="+38 (099) 999-99-99"
                  value={number}
                  className={`${errors.number ? cl.invalid : ""} ${watch("number") && cl.valid} + ${url ? cl.white : cl.main}`}
                  placeholder="+380"
                  onChange={changePhone}
                />
              </div>
              <div className={cl.input_email}>
                <input
                  type="email"
                  className={`${errors.eMail ? cl.invalid : ""} ${watch("eMail") && cl.valid} + ${url ? cl.white : cl.main}`}
                  placeholder="Email"
                  {...register("eMail", { required: true })}
                />
              </div>
              <div className={cl.input_age}>
                <input
                  type="text"
                  minLength={2}
                  maxLength={2}
                  className={`${errors.age ? cl.invalid : ""} ${watch("age") && cl.valid} + ${url ? cl.white : cl.main}`}
                  placeholder="Вік"
                  {...register("age", { required: true })}
                />
              </div>
            </div>
            <div className={cl.input_wr}>
              <div className={cl.input_text}>Рівень англійської</div>
              <Select
                className={`react-select-container ${errors.englishLevel ? "invalid" : ""} ${watch("englishLevel") ? "valid" : ""} `}
                placeholder="Level"
                classNamePrefix={url ? "react-select" : "select"}
                defaultValue={selectedOption}
                onChange={changeEnglishLevel}
                options={EnglishLevel}
              />
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
              <label className={cl.label_file}>
                <input
                  type="text"
                  name="fileName"
                  readOnly
                  className={`${errors.CV ? cl.invalid : ""} ${watch("CV" as any)?.[0]?.name && cl.valid} ${cl.download_btn}`}
                  placeholder="Прикріпити резюме"
                  value={watch("CV" as any)?.[0]?.name || ""}
                />
                <input
                  className={cl.attach_CV_btn}
                  type="file"
                  {...register("CV", { required: false })}
                />
              </label>
              <button
                type="submit"
                className={cl.submit_btn}
                disabled={isSubmitting}
              >
                Надіслати
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
