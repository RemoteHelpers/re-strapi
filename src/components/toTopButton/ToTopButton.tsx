/* eslint-disable no-console */
import React from 'react';
import { FormsSvg } from '../../icons/form/FormsSvg';
import cl from './toTopButton.module.scss';

export const ToTopButton = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    console.log('click');
  };

  return (
    <button
      type="button"
      className={cl.to_top_btn}
      onClick={scrollTop}
    >
      <FormsSvg id="top" />
    </button>
  );
};
