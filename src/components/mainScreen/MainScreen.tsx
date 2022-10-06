import React from 'react';
import cl from './mainScreen.module.scss';
import MainImage from '../../images/mainScreen/MainScreen.png';

import buttonIcon from '../../images/mainScreen/button-icon.svg';

const MainScreen = () => {
  return (
    <div className={cl.MainScreen} id="mainScreen">
      <div className={cl.MainScreen__info}>
        <h3 className={cl.MainScreen__title}>Хочешь pаботать в сфере IT удаленно?</h3>
        <p className={cl.MainScreen__paragraph}>
          Аутстаффинговая компания
          {' '}
          <span className={cl.MainScreen__paragraph_strong}>
            RemotEmployees
          </span>
          {' '}
          предлагает Вам удаленную работу на международных проектах.
          Мы дадим вам возможность работать из любой точки мира уже сейчас!
        </p>
        <button
          type="button"
          className={cl.MainScreen__button}
        >
          Получить работу
          <img src={buttonIcon} alt="button icon" className={cl.MainScreen__buttonIcon} />
        </button>
      </div>

      <img src={MainImage} alt="cat with idea" className={cl.MainScreen__image} />
    </div>
  );
};

export default MainScreen;
