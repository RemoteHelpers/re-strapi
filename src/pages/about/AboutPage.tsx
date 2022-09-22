/* eslint-disable max-len */
import React from 'react';
import cl from './aboutPage.module.scss';
import kitekat from '../../icons/kitekat.png';
import play from '../../icons/play.png';

export const AboutPage = () => {
  return (
    <>
      <section>
        <div className={cl.container}>
          <div className={cl.intro_wrapper}>
            <div className={cl.into_information}>
              <h1>RemotEmployees - Аутстафінгова компанія</h1>
              <p>
                Ми надаємо робочі місця в Україні, орієнтуючись на Європейський та Американський ринок. Співпраця з нашою компанією дозволить вам набути нових умінь у сфері IT та маркетингу, a також розвинути навички спілкування з носіями іноземної мови.
              </p>
              <p>
                Наша компанія вже понад три роки надає послуги в галузі IT технологій та маркетингу. Ми співпрацюємо з компаніями з усього світу та підтримуємо позитивну репутацію на західному ринку праці.
              </p>
              <div className={cl.video_intro}>
                <img src={play} alt="" />
              </div>
            </div>
            <div className={cl.intro_kitekat}>
              <img src={kitekat} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
