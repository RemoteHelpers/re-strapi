import React from 'react';
import './MainScreen.scss';
import MainImage from '../../images/MainScreen.png';

const MainScreen = () => {
  return (
    <div className="MainScreen">
      <div className="MainScreen__info">
        <h3 className="MainScreen__title">Хочешь pаботать в сфере IT удаленно?</h3>
        <p className="MainScreen__paragraph">
          Аутстаффинговая компания RemotEmployees предлагает
          Вам удаленную работу на международных проектах.
          Мы дадим вам возможность работать из любой точки мира уже сейчас!
        </p>
        <button
          type="button"
          className="MainScreen__button"
        >
          Получить работу
        </button>
      </div>

      <img src={MainImage} alt="cat with idea" className="MainScreen__image" />
    </div>
  );
};

export default MainScreen;
