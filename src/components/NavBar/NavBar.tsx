import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../icons/RhLogo.png';
import cl from './navBar.module.scss';
import '../../App.scss';

export const NavBar = () => {
  return (
    <header>
      <div className={cl.container}>
        <div className={cl.wrapper}>
          <div className={cl.logo}>
            <img src={logo} alt="" />
          </div>
          <nav>
            <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} end to="/">Home</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} end to="/vacancies">Vacancies</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} end to="/about">
              About us
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} end to="/videoInterview">Video interview</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
