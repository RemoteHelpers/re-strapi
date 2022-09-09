import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import Api from '../../../api';
import { IFeedbackFormData } from '../../../types/types';

// styles
import './feedbackForm.scss';
// img
import formImg from '../../../images/formImg.png';

type TOption = {
  value: string;
  label: string;
};

const EnglishLevel = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'elementary ', label: 'Elementary' },
  { value: 'pre-intermediate', label: 'Pre-Intermediate' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'upper-intermediate', label: 'Upper-Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'Proficiency', label: 'Proficiency' },
];

function FeedbackForm() {
  const [selectedOption, setSelectedOption] = useState<TOption | null>();
  const {
    register, handleSubmit, watch, formState: { errors, isSubmitting }, reset, setValue,
  } = useForm<IFeedbackFormData>();
  const [phone, setPhone] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const arrFile = await Api.uploadFile({
        files: data.file[0],
      });

      if (arrFile?.[0]?.id) {
        await Api.feedBackForm({
          ...data,
          file: arrFile[0].id,
        });
        setPhone('');
        setSelectedOption(null);
        reset();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, 'send feedBack form');
    }
  });

  useEffect(() => {
    register('EnglishLevel', {
      required: true,
    });
    register('phone', {
      required: true,
    });
  }, []);

  const changeEnglishLevel = (value: any) => {
    setValue('EnglishLevel', value.value, { shouldValidate: true });
    setSelectedOption(value);
  };

  const changePhone = (e: any) => {
    setValue('phone', e.target.value, { shouldValidate: true });
    setPhone(e.target.value);
  };

  return (
    <div className="feedback">
      <div className="feedback-wr">
        <div className="feedback-wr_title">
          Готовы присоединиться прямо сейчас?
        </div>
        <div className="feedback-wr_form">
          <form className="feedback-form" onSubmit={onSubmit}>
            <div className="feedback-form_input">
              <div className="feedback-form_input_name retreat">
                <input
                  className={`${errors.name ? 'invalid' : ''} ${watch('name') && 'valid'}`}
                  type="text"
                  placeholder="ПІБ"
                  {...register('name', { required: true })}
                />
              </div>
              <div className="feedback-form_input_phone retreat">
                <InputMask
                  mask="+380 (099) 999-999-9"
                  value={phone}
                  className={`${errors.phone ? 'invalid' : ''} ${watch('phone') && 'valid'}`}
                  placeholder="+380"
                  onChange={changePhone}
                />
              </div>
            </div>
            <div className="feedback-form_input">
              <div className="feedback-form_input_email retreat">
                <input
                  type="email"
                  className={`${errors.email ? 'invalid' : ''} ${watch('email') && 'valid'}`}
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
              </div>
              <div className="feedback-form_input_age retreat">
                <input
                  type="text"
                  minLength={2}
                  maxLength={2}
                  className={`${errors.age ? 'invalid' : ''} ${watch('age') && 'valid'}`}
                  placeholder="Вік"
                  {...register('age', { required: true })}
                />
              </div>
            </div>
            <div className="feedback-form_input">
              <div className="feedback-form_input_text">Рівень англійської</div>
              <Select
                classNamePrefix="feedback-form_select"
                className={`${errors.EnglishLevel ? 'invalid' : ''} ${watch('EnglishLevel') ? 'valid' : ''} feedback-form_select`}
                placeholder="Level"
                defaultValue={selectedOption}
                onChange={changeEnglishLevel}
                options={EnglishLevel}
              />
            </div>
            <div className="feedback-img">
              <img src={formImg} alt="#" />
            </div>
            <div className="feedback-form_btn">
              <label className="feedback-form_file">
                <input
                  type="text"
                  name="fileName"
                  readOnly
                  className={`${errors.file ? 'invalid' : ''} ${watch('file' as any)?.[0]?.name && 'valid'} feedback-form_download`}
                  placeholder="Прикріпити резюме"
                  value={watch('file' as any)?.[0]?.name || ''}
                />
                <input
                  className="feedback-form_button"
                  type="file"
                  {...register('file', { required: true })}
                />
              </label>
              <div className="feedback-form_send">
                <button
                  type="submit"
                  className="feedback-form_submit"
                  disabled={isSubmitting}
                >
                  Надіслати
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default FeedbackForm;
