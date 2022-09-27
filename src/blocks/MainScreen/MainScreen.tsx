import React from 'react';
import './MainScreen.scss';
import MainImage from '../../images/mainScreen/MainScreen.png';

import buttonIcon from '../../images/mainScreen/button-icon.svg';

const MainScreen = () => {
  return (
    <div className="MainScreen">
      <div className="MainScreen__info">
        <h3 className="MainScreen__title">Хочешь pаботать в сфере IT удаленно?</h3>
        <p className="MainScreen__paragraph">
          Аутстаффинговая компания
          {' '}
          <span className="MainScreen__paragraph--strong">
            RemotEmployees
          </span>
          {' '}
          предлагает Вам удаленную работу на международных проектах.
          Мы дадим вам возможность работать из любой точки мира уже сейчас!
        </p>
        <button
          type="button"
          className="MainScreen__button"
        >
          Получить работу
          <img src={buttonIcon} alt="button icon" className="MainScreen__button-icon" />
        </button>
      </div>

      <img src={MainImage} alt="cat with idea" className="MainScreen__image" />
    </div>
  );
};

export default MainScreen;
