import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import './Header.scss';
import { useStateContext } from '../../context/StateContext';

import Logo from '../../images/Logo.png';
import SelectIcon from '../../images/selectArrow.svg';

const Header = () => {
  const { localization, setLocalization } = useStateContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const selectLocalization = [
    { value: 'en', label: 'English' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'ru', label: 'Russian' },
  ];

  const getLocalization = () => {
    return localization ? selectLocalization.find(c => c.value === localization) : '';
  };

  const DropdownIndicator = (
    props: any,
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={SelectIcon} alt="dropdown" />
      </components.DropdownIndicator>
    );
  };

  const handleLocalizationSelect = useCallback((selected: any) => {
    setLocalization(selected.value);
  }, []);

  const handleMenuClick = useCallback(() => {
    // eslint-disable-next-line no-shadow
    setIsMenuOpened(isMenuOpened => !isMenuOpened);
  }, []);

  return (
    <div className="Header">
      <img src={Logo} alt="logo" className="Header__logo" />
      <div className="Header__functionality">
        <nav className="Header__navbar">
          <a href="http://localhost:3000/" className="Header__link">
            Вакансии
          </a>
          <a href="http://localhost:3000/" className="Header__link">
            О Нас
          </a>
          <a href="http://localhost:3000/" className="Header__link">
            Видеоинтервью
          </a>
        </nav>
        <Select
          classNamePrefix="custom-select-header"
          options={selectLocalization}
          value={getLocalization()}
          onChange={handleLocalizationSelect}
          placeholder={localization}
          components={
            {
              DropdownIndicator,
            }
          }
        />

        <button
          type="button"
          onClick={handleMenuClick}
          className="Header__menu-button"
        >
          <div className={classNames('Header__menu-icon', { 'Header__menu-icon--active': isMenuOpened })}></div>
        </button>
      </div>

      <div className={classNames('Header__drop-menu', { 'Header__drop-menu--active': isMenuOpened })}>
        <h4 className="Header__drop-menu--title">Меню</h4>
        <nav className="Header__navbar--mobile">
          <a href="http://localhost:3000/" className="Header__link--mobile">
            Вакансії
          </a>
          <a href="http://localhost:3000/" className="Header__link--mobile">
            Про нас
          </a>
          <a href="http://localhost:3000/" className="Header__link--mobile">
            Інтерв’ю
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Header;
