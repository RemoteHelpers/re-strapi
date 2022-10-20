/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import React, { useState, useEffect } from "react";
import Select from "react-select";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import Api from "../../../api";
import { IFeedbackFormData } from "../../../types/types";

// styles
import cl from "./feedbackForm.module.scss";
import "./feedbackFormSelect.scss";
// img
import { FormsSvg } from "../../../icons/form/FormsSvg";

type TOption = {
  value: string;
  label: string;
};

const EnglishLevel = [
  { value: "beginner", label: "Beginner" },
  { value: "elementary ", label: "Elementary" },
  { value: "pre-intermediate", label: "Pre-Intermediate" },
  { value: "intermediate", label: "Intermediate" },
  { value: "upper-intermediate", label: "Upper-Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "Proficiency", label: "Proficiency" },
];

interface Props {
  img: string;
}

function FeedbackForm({ img }: Props) {
  const [selectedOption, setSelectedOption] = useState<TOption | null>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IFeedbackFormData>();

  const [phone, setPhone] = useState("");

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onSubmit = handleSubmit(async (data: IFeedbackFormData) => {
    try {
      const arrFile = await Api.uploadFile({
        files: data.file[0],
      });

      if (arrFile?.[0]?.id) {
        await Api.feedBackForm({
          ...data,
          file: arrFile[0].id,
        });
        setPhone("");
        setSelectedOption(null);
        reset();
      }
    } catch (error) {
      console.log(error, "send feedBack form");
    }
  });

  useEffect(() => {
    register("EnglishLevel", {
      required: true,
    });
    register("phone", {
      required: true,
    });
  }, []);

  const changeEnglishLevel = (value: any) => {
    setValue("EnglishLevel", value.value, { shouldValidate: true });
    setSelectedOption(value);
  };

  const changePhone = (e: any) => {
    setValue("phone", e.target.value, { shouldValidate: true });
    setPhone(e.target.value);
  };

  const url = window.location.pathname === "/videoInterview";

  return (
    <div className={cl.feedback} id="form">
      <div className={cl.feedback_wr}>
        <div className={cl.title}>Готові приєднатися прямо зараз?</div>

        <form className={url ? cl.form_padding : cl.form} onSubmit={onSubmit}>
          <div className={cl.img_wr_desktop}>
            <img
              className={url ? cl.imgIterview : cl.img}
              src={img}
              alt="Happy cat"
            />
          </div>
          <div className={cl.wr_form}>
            <div className={cl.input_wr}>
              <div className={cl.input_name}>
                <input
                  className={`${errors.name ? cl.invalid : ""} ${
                    watch("name") && cl.valid
                  }`}
                  type="text"
                  placeholder="ПІБ"
                  {...register("name", { required: true })}
                />
              </div>
              <div className={cl.input_phone}>
                <InputMask
                  mask="+380 (099) 999-999-9"
                  value={phone}
                  className={`${errors.phone ? cl.invalid : ""} ${
                    watch("phone") && cl.valid
                  }`}
                  placeholder="+380"
                  onChange={changePhone}
                />
              </div>
              <div className={cl.input_email}>
                <input
                  type="email"
                  className={`${errors.email ? cl.invalid : ""} ${
                    watch("email") && cl.valid
                  }`}
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className={cl.input_age}>
                <input
                  type="text"
                  minLength={2}
                  maxLength={2}
                  className={`${errors.age ? cl.invalid : ""} ${
                    watch("age") && cl.valid
                  }`}
                  placeholder="Вік"
                  {...register("age", { required: true })}
                />
              </div>
            </div>
            <div className={cl.input_wr}>
              <div className={cl.input_text}>Рівень англійської</div>
              <Select
                className={`react-select-container ${
                  errors.EnglishLevel ? "invalid" : ""
                } ${watch("EnglishLevel") ? "valid" : ""} `}
                placeholder="Level"
                classNamePrefix="react-select"
                defaultValue={selectedOption}
                onChange={changeEnglishLevel}
                options={EnglishLevel}
              />
            </div>
            <div className={cl.img_wr_tablet}>
              <img
                className={url ? cl.imgIterview : cl.img}
                src={img}
                alt="Happy cat"
              />
            </div>
            <div className={cl.buttons_wr}>
              <label className={cl.label_file}>
                <input
                  type="text"
                  name="fileName"
                  readOnly
                  className={`${errors.file ? cl.invalid : ""} ${
                    watch("file" as any)?.[0]?.name && cl.valid
                  } ${cl.download_btn}`}
                  placeholder="Прикріпити резюме"
                  value={watch("file" as any)?.[0]?.name || ""}
                />
                <input
                  className={cl.attach_CV_btn}
                  type="file"
                  {...register("file", { required: true })}
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

        <div className={cl.to_top_btn} onClick={scrollTop}>
          <FormsSvg id="top">Scroll Top</FormsSvg>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
