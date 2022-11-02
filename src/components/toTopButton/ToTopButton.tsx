import React from 'react';
import { FormsSvg } from '../../icons/form/FormsSvg';
import { useStateContext } from '../../context/StateContext';
import cl from './toTopButton.module.scss';

const ToTopButton = () => {
  const { scrollToTop } = useStateContext();

  // const scrollTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };

  return (
    <button
      type="button"
      className={cl.to_top_btn}
      onClick={() => scrollToTop?.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
    >
      <FormsSvg id="top" />
    </button>
  );
};

export default ToTopButton;
