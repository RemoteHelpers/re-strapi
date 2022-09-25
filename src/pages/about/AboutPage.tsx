/* eslint-disable max-len */
import React from 'react';
import cl from './aboutPage.module.scss';
import kitekat from '../../icons/kitekat.png';
import play from '../../icons/play.png';
import FeedbackForm from '../../components/forms/feedbackForm';
import Footer from '../../components/footer';

// Cards for section "What we do"
import card1 from '../../icons/whatWeDo/card1.png';
import card2 from '../../icons/whatWeDo/card2.png';
import card3 from '../../icons/whatWeDo/card3.png';
import card4 from '../../icons/whatWeDo/card4.png';
import card5 from '../../icons/whatWeDo/card5.png';
import card6 from '../../icons/whatWeDo/card6.png';

import memberTeam from '../../icons/team_member.png';
import { AboutPageSvg } from './AboutPageSvg';
import formImg from '../../images/formImg.png';

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
      <div className={cl.container}>
        <div className={cl.what_we_do}>
          <h1>Чим ми займаємося?</h1>
          <p>Ми працюємо за трьома основними напрямками, які включають багато спеціальностей.</p>
          <p>
            Можливо, Ви не маєте досвіду роботи, тільки закінчили навчальний заклад і поки не знаєте, де застосувати свої знання та навички. Ми готові надати вам можливість отримати роботу і освоїти нову спеціальність.
          </p>
          <div className={cl.activity_cards}>
            <div>
              <img src={card1} alt="" />
              <p>Маркетинг</p>
            </div>
            <div>
              <img src={card2} alt="" />
              <p>Менеджмент</p>
            </div>
            <div>
              <img src={card3} alt="" />
              <p>Розробка</p>
            </div>
            <div>
              <img src={card4} alt="" />
              <p>Дизайн</p>
            </div>
            <div>
              <img src={card5} alt="" />
              <p>Переклади</p>
            </div>
            <div>
              <img src={card6} alt="" />
              <p>Освіта</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cl.container}>
        <div className={cl.our_team}>
          <h1>Наша команда</h1>
          <p>Ми допоможемо Вам адаптуватися до роботи у нашій команді та познайомимо з колективом.</p>
          <div className={cl.team_cards}>
            <div className={cl.team_card}>
              <div className={cl.member_photo}>
                <img src={memberTeam} alt="" />
              </div>
              <div className={cl.member_info}>
                <h2>Тетяна</h2>
                <span>Recruiter</span>
                <div>
                  <AboutPageSvg id="telegram" />
                  <span>@REmployees</span>
                </div>
                <div>
                  <AboutPageSvg id="viber" />
                  <span>+380666146404</span>
                </div>
              </div>
            </div>
            <div className={cl.team_card}>
              <div className={cl.member_photo}>
                <img src={memberTeam} alt="" />
              </div>
              <div className={cl.member_info}>
                <h2>Ольга</h2>
                <span>Recruiter</span>
                <div>
                  <AboutPageSvg id="telegram" />
                  <span>@RemoteEmployeesOlha</span>
                </div>
                <div>
                  <AboutPageSvg id="viber" />
                  <span>+380995664454</span>
                </div>
              </div>
            </div>
            <div className={cl.team_card}>
              <div className={cl.member_photo}>
                <img src={memberTeam} alt="" />
              </div>
              <div className={cl.member_info}>
                <h2>Марія</h2>
                <span>Recruiter</span>
                <div>
                  <AboutPageSvg id="telegram" />
                  <span>@MashaRemotEmployees</span>
                </div>
                <div>
                  <AboutPageSvg id="viber" />
                  <span>+380987286405</span>
                </div>
              </div>
            </div>
            <div className={cl.team_card}>
              <div className={cl.member_photo}>
                <img src={memberTeam} alt="" />
              </div>
              <div className={cl.member_info}>
                <h2>Тетяна</h2>
                <span>Recruiter</span>
                <div>
                  <AboutPageSvg id="telegram" />
                  <span>@REmployees</span>
                </div>
                <div>
                  <AboutPageSvg id="viber" />
                  <span>+380666146404</span>
                </div>
              </div>
            </div>
            <div className={cl.team_card}>
              <div className={cl.member_photo}>
                <img src={memberTeam} alt="" />
              </div>
              <div className={cl.member_info}>
                <h2>Ольга</h2>
                <span>Recruiter</span>
                <div>
                  <AboutPageSvg id="telegram" />
                  <span>@RemoteEmployeesOlha</span>
                </div>
                <div>
                  <AboutPageSvg id="viber" />
                  <span>+380995664454</span>
                </div>
              </div>
            </div>
            <div className={cl.team_card}>
              <div className={cl.member_photo}>
                <img src={memberTeam} alt="" />
              </div>
              <div className={cl.member_info}>
                <h2>Марія</h2>
                <span>Recruiter</span>
                <div>
                  <AboutPageSvg id="telegram" />
                  <span>@MashaRemotEmployees</span>
                </div>
                <div>
                  <AboutPageSvg id="viber" />
                  <span>+380987286405</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cl.footer_decoration}>
        <div className={cl.container}>
          <FeedbackForm img={formImg} />
        </div>
      </div>
      <Footer />
    </>
  );
};
