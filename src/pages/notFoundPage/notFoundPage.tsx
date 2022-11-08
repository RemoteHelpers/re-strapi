/* eslint-disable jsx-quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/quotes */
import { NavLink } from "react-router-dom";
import cl from "./notFoundPage.module.scss";
import img from "../../images/notFoundPage/notFoundCat.png";
import { useStateContext } from "../../context/StateContext";

export default function NotFoundPage() {
  const { localization } = useStateContext();

  return (
    <div className={cl.section}>
      <div className={cl.container}>
        <h1 className={cl.title}>404</h1>
        <h2 className={cl.subtitle}>Не хвилюйтеся, нічого не зламалося!</h2>
        <p className={cl.text}>
          Можливо ви скористалися недійсним посиланням або сторінку було
          видалено.
        </p>
        <div className={cl.buttons_wr}>
          <NavLink end to="/" className={cl.button}>
            На головну
          </NavLink>

          <NavLink end to={`/${localization}/vacancies`} className={cl.button}>
            Вакансії
          </NavLink>
        </div>
      </div>
      <div className={cl.img_wr}>
        <img alt="Cat with stars" src={img} className={cl.img} />
      </div>
    </div>
  );
}
