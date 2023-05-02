/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import Select, { components } from "react-select";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./header.scss";
import "../../global-styles/search.scss";
import LanguageIcon from "@mui/icons-material/Language";
import { useStateContext } from "../../context/StateContext";
import { Category, Vacancy, Collection } from "../../types/types";
// import Logo from "../../images/mainScreen/Logo.png";
import SelectIcon from "../../images/selectArrow.svg";
import useOutsideAlerter from "../../hooks/useClickOutside";
import NextIcon from "../../images/header/nextIcon.svg";
import Loader from "../loader/Loader";

import { API, requestPagStart, requestPagLimit } from "../../constants";

import dev from "../../images/header/categories-icons/developer.png";
import trns from "../../images/header/categories-icons/translation.png";
import management from "../../images/header/categories-icons/management.png";
import marketing from "../../images/header/categories-icons/marketing.png";
import illustrator from "../../images/header/categories-icons/illustrator.png";
import teacher from "../../images/header/categories-icons/teacher.png";
import { Logo } from "../SVGSelector";

const Header = () => {
  function chooseImage(id: string | number) {
    switch (id) {
      case "developers":
        return <img src={dev} alt="" />;
      case "designers":
        return <img src={illustrator} alt="" />;
      case "marketers":
        return <img src={marketing} alt="" />;
      case "managers":
        return <img src={management} alt="" />;
      case "translators":
        return <img src={trns} alt="" />;
      case "tutors":
        return <img src={teacher} alt="" />;
      default:
        return <img src={teacher} alt="" />;
    }
  }

  const searchRef = useRef<HTMLDivElement>(null);
  const {
    localization,
    isDesktopMenuOpened,
    setIsDesktopMenuOpened,
    setCurrentVacancy,
    headerData,
    setIsOpenModal,
    setCurrentGlobalVacancies,
    setGlobalCategories,
  } = useStateContext();

  
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [activeMenu, setActiveMenu] = useState("main");
  const [changeLangLoader, setChangeLangLoader] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [total, setTotal] = useState<number>(0);

  const routingRule = localization === "ru";

  useOutsideAlerter(searchRef, () => {
    setIsDesktopMenuOpened(false);
  });

  useEffect(() => {
    axios
      .get(
        `${API}/categories?locale=${
          localization === "ua" ? "uk" : localization
        }`
      )
      .then((res) => {
        setCategories(res.data.data);
        // Отказаться от хуйни сверху
        setGlobalCategories(res.data.data);
        // console.log("Categories from header", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  const fetchData = async () => {
    await axios
      .get(
        `${API}/vacancies?locale=${
          localization === "ua" ? "uk" : localization
        }&${requestPagStart}=${
          vacancies.length
        }&${requestPagLimit}=-1&populate=*`
      )
      .then((res) => {
        setTotal(res.data.meta.pagination.total);
        res.data.data.length
          ? setVacancies([...vacancies, ...res.data.data])
          : "";
      })
      .catch((error) => {
        console.error("Vacancy error >>>", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [localization]);

  useEffect(() => {
    vacancies.length < total ? fetchData() : "";
    setCurrentGlobalVacancies(vacancies);
  }, [vacancies, localization]);

  useOutsideAlerter(searchRef, () => {
    setIsDropdown(false);
  });

  const handleMenuClick = useCallback(() => {
    setIsMenuOpened(!isMenuOpened);
    setActiveMenu("main");
  }, [isMenuOpened]);

  const bodyEl = document.querySelector("body");

  isMenuOpened
    ? bodyEl?.classList.add("lock")
    : bodyEl?.classList.remove("lock");

  const handleCategorySelect = useCallback((event: any) => {
    setCurrentCategory(event.target.innerText);
    setActiveMenu("vacancies");
  }, []);

  useEffect(() => {
    setSelectedVacancies(
      vacancies.filter((el) =>
        el.attributes.categories.data[0]
          ? el.attributes.categories.data[0].attributes.categoryTitle ===
            currentCategory
          : ""
      )
    );
  }, [currentCategory, vacancies]);

  // Initial load first active category in desktop menu
  useEffect(() => {
    const firstElement = document.querySelector(
      ".Header__dropMenuDesktop_category_item label"
    );
    
    setSelectedVacancies(
      vacancies.filter((el) =>
        el.attributes.categories.data[0]
          ? el.attributes.categories.data[0].attributes.categorySlug ===
          'designers' || firstElement?.classList.add("active_label")
          : "" || firstElement?.classList.remove("active_label")
      )
    );
  }, [vacancies]);

  const categoryItems = document.querySelectorAll(
    ".Header__dropMenuDesktop_category_item label"
  );

  categoryItems.forEach((item: Element) => {
    item.addEventListener("click", () => {
      categoryItems.forEach((item) => {
        item.classList.remove("active_label");
      });

      item.classList.add("active_label");
    });
  });

  const handleCategoryMenuSelect = useCallback(
    (event: any) => {
      if (currentCategory === event.target.name) {
        setCurrentCategory("");
      } else {
        setCurrentCategory(event.target.name);
      }
    },
    [currentCategory]
  );

  const handleVacancyMenuSelect = useCallback(() => {
    setIsMenuOpened(false);
  }, []);

  const handleDesktopVacancyMenuSelect = useCallback(() => {
    setIsDesktopMenuOpened(false);
  }, []);

  document.getElementById("vacancies")?.addEventListener("mouseover", () => {
    setIsDesktopMenuOpened(true);
  });

  // document.querySelector('.Header__link')?.classList.add('hide_link');

  return (
    <header id="header" className="Header">
      <div className="header_wrapper">
        <NavLink to={routingRule ? "/" : `/${localization}`}>
          <Logo id="logo" />
        </NavLink>
        <div className="Header__functionality">
          <nav className="Header__navbar">
            {headerData?.menu.map(({ path_id, title }: any) => (
              <NavLink
                key={path_id}
                className={({ isActive }) =>
                  isActive ? "active-link Header__link" : "link Header__link"
                }
                end
                id={path_id}
                to={routingRule ? `/${path_id}` : `/${localization}/${path_id}`}
              >
                {path_id === ' ' ? '' : title}
              </NavLink>
            ))}
          </nav>
          {changeLangLoader ? (
            <div className={changeLangLoader ? "darker_bg" : ""}>
              <Loader />
            </div>
          ) : (
            // <Select
            //   classNamePrefix="custom-select-header"
            //   options={selectLocalization}
            //   value={getLocalization()}
            //   onChange={handleLocalizationSelect}
            //   placeholder={localization}
            //   isSearchable={false}
            //   components={{
            //     DropdownIndicator,
            //   }}
            // />
            <button
              className="select-language"
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              {localization}
              <LanguageIcon />
            </button>
          )}

          <button
            type="button"
            onClick={handleMenuClick}
            className="Header__menuButton"
          >
            <div
              className={classNames("Header__menuIcon", {
                Header__menuIcon_active: isMenuOpened,
              })}
            ></div>
          </button>
        </div>

        <div
          className={classNames("Header__dropMenu", {
            Header__dropMenu_active: isMenuOpened,
          })}
        >
          <h4 className="Header__dropMenu_title">{headerData?.menuValue}</h4>
          <nav className="Header__navbar_mobile">
            <CSSTransition
              in={activeMenu === "main"}
              unmountOnExit
              timeout={500}
              classNames="menu_primary"
            >
              <div className="menu">
                {/* <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-link Header__link_mobile"
                      : "link Header__link_mobile"
                  }
                  end
                  to={routingRule ? "/" : `/${localization}`}
                  onClick={() => setIsMenuOpened(false)}
                >
                  {headerData?.menu[0].title}
                </NavLink> */}
                <a
                  className="Header__link_mobile"
                  onClick={() => "categories" && setActiveMenu("categories")}
                >
                  <span> {headerData?.menu[1].title}</span>
                </a>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-link Header__link_mobile"
                      : "link Header__link_mobile"
                  }
                  end
                  to={routingRule ? "/about" : `/${localization}/about`}
                  onClick={() => setIsMenuOpened(false)}
                >
                  <span> {headerData?.menu[2].title}</span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-link Header__link_mobile"
                      : "link Header__link_mobile"
                  }
                  end
                  to={routingRule ? "/contacts" : `/${localization}/contacts`}
                  onClick={() => setIsMenuOpened(false)}
                >
                  <span>{headerData?.menu[3].title}</span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-link Header__link_mobile"
                      : "link Header__link_mobile"
                  }
                  end
                  to={
                    routingRule
                      ? "/videoInterview"
                      : `/${localization}/videoInterview`
                  }
                  onClick={() => setIsMenuOpened(false)}
                >
                  <span>{headerData?.menu[4].title}</span>
                </NavLink>
              </div>
            </CSSTransition>

            <CSSTransition
              in={activeMenu === "categories"}
              unmountOnExit
              timeout={500}
              classNames="menu_Secondary"
            >
              <div className="menu">
                <span
                  className="Header__link_mobile Header__link_mobile-back"
                  onClick={() => "main" && setActiveMenu("main")}
                >
                  <img
                    className="Header__link_mobile-icon"
                    src={NextIcon}
                    alt="Next button"
                  />
                  <span>{headerData?.backValue}</span>
                </span>
                {!query && (
                  <Link
                    className="Header__link_mobile"
                    to={
                      routingRule ? "/vacancies" : `/${localization}/vacancies`
                    }
                    onClick={() => setIsMenuOpened(false)}
                  >
                    <span> {headerData?.allVacanciesValue}</span>
                  </Link>
                )}
                {!query &&
                  // TODO Переписать на тернарник
                  categories.map((category) => {
                    if (category.attributes.categorySlug === "other") {
                      return null;
                    }

                    return (
                      <span
                        key={category.id}
                        className="Header__link_mobile"
                        onClick={handleCategorySelect}
                      >
                        {chooseImage(
                          category.attributes.categorySlug as string
                        )}
                        <span>{category.attributes.categoryTitle}</span>
                      </span>
                    );
                  })}
                {query &&
                  selectedVacancies.map((vacancy) => (
                    <Link
                      key={vacancy.id}
                      className="Header__link_mobile"
                      to={
                        routingRule
                          ? `/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`
                          : `/${localization}/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`
                      }
                      onClick={() => {
                        setCurrentVacancy(vacancy.attributes.vacancySlug);
                        handleVacancyMenuSelect();
                      }}
                    >
                      <span>{vacancy.attributes.title}</span>
                    </Link>
                  ))}
              </div>
            </CSSTransition>

            <CSSTransition
              in={activeMenu === "vacancies"}
              unmountOnExit
              timeout={500}
              classNames="menu_Thirdly"
            >
              <div className="menu">
                <span
                  className="Header__link_mobile Header__link_mobile-back"
                  onClick={() => "categories" && setActiveMenu("categories")}
                >
                  <img
                    className="Header__link_mobile-icon"
                    src={NextIcon}
                    alt="Next button"
                  />
                  <span>{headerData?.backValue}</span>
                </span>

                {selectedVacancies.map((vacancy) => (
                  <Link
                    key={vacancy.id}
                    className="Header__link_mobile"
                    to={
                      routingRule
                        ? `/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`
                        : `/${localization}/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`
                    }
                    onClick={() => {
                      setCurrentVacancy(vacancy.attributes.vacancySlug);
                      handleVacancyMenuSelect();
                    }}
                  >
                    <span>{vacancy.attributes.title}</span>
                  </Link>
                ))}
              </div>
            </CSSTransition>
          </nav>
        </div>

        <div
          className={classNames("Header__dropMenuDesktop", {
            Header__dropMenuDesktop_active: isDesktopMenuOpened,
          })}
          onMouseOver={() => setIsDesktopMenuOpened(true)}
          onMouseLeave={() => setIsDesktopMenuOpened(false)}
          ref={searchRef}
        >
          {query.length === 0 && (
            <div className="Header__dropMenuDesktop_categories">
              {categories.map((category) => {
                if (category.attributes.categorySlug === "other") {
                  return null;
                }
                return (
                  <div
                    className="Header__dropMenuDesktop_category_item"
                    key={category.id}
                  >
                    <input
                      type="checkbox"
                      checked={
                        currentCategory === category.attributes.categoryTitle
                      }
                      key={category.id}
                      id={category.id}
                      name={category.attributes.categoryTitle}
                      value={currentCategory}
                      onChange={handleCategoryMenuSelect}
                      className={classNames("Header__link_desktop")}
                    />
                    <label className="label" htmlFor={category.id}>
                      {chooseImage(category.attributes.categorySlug as string)}
                      <span className="label-title">
                        {category.attributes.categoryTitle}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          <div className="Header__dropMenuDesktop_vacancies">
            {selectedVacancies.map((vacancy) => (
              <Link
                key={vacancy.id}
                className="Header__link_desktop--vacancy"
                to={
                  routingRule
                    ? `/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`
                    : `/${localization}/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`
                }
                onClick={() => {
                  setCurrentVacancy(vacancy.attributes.vacancySlug);
                  handleDesktopVacancyMenuSelect();
                }}
              >
                {vacancy.attributes.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
