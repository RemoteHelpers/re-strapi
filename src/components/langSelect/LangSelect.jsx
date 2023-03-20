/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useStateContext } from '../../context/StateContext';

const LangSelect = ({ mask }) => {
  const [value, setValue] = useState();
  const { setLangInputValue } = useStateContext();

  useEffect(() => {
    setLangInputValue(value);
  }, [value]);

  return (
    <PhoneInput
      defaultCountry="UA"
      placeholder={mask}
      international
      value={value}
      onChange={setValue}
    />
  );
};

export default LangSelect;
