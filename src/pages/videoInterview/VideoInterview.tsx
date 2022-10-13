/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import cl from './videoInterview.module.scss';
import '../../global-styles/colors.scss';
import cameraKitekat from '../../icons/kitekat_camera.png';
import FeedbackForm from '../../components/forms/feedbackForm';
import interviewKitekat from '../../icons/interview_form_kitekat.png';
import { ArrowSvg } from './ArrowSvg';
import interviewCat from '../../icons/interview_kitekat.png';
import play from '../../icons/play.png';

export const VideoInterview = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={cl.container}>
        <div className={cl.main_wrapper}>
          <div className={cl.left_intro}>
            <div>
              <img src={cameraKitekat} alt="" />
            </div>
            <p>
              Відеоінтерв’ю – це нововведення, яке вже давно практикується у
              багатьох західних країнах і, як правило, замінює Вашу співбесіду в
              офісі.
            </p>
            <p>
              Відео потрібно записувати в спокійній, звичній для вас атмосфері,
              без сторонніх звуків та дратівливих факторів. Інтерв’ю має бути
              англійською мовою та тривалістю до 3-х хвилин!
            </p>
          </div>
          <div className={cl.right_intro}>
            <h1>Як записати інтерв'ю?</h1>
            <p>
              Ми розповімо Вам, як поетапно записати Ваше інтерв’ю для нашої
              компанії. Для Вас це стане невеликим “вступним іспитом”, який
              обов’язково потрібно скласти!
            </p>
            <p>
              Відеоінтерв’ю економить Ваш час. Замість того, щоб їздити кілька
              разів на тиждень на співбесіди та перекроювати всі свої плани, Ви
              записуєте інтерв’ю лише 1 раз і спите спокійно.
            </p>
            <div className={cl.absoluted_interview_cat}>
              <img src={interviewCat} alt="" />
            </div>
          </div>
        </div>
      </div>
      <main className={cl.instruction}>
        <div className={cl.container}>
          <div className={cl.instruction_wrapper}>
            <h1>Сцена, камера, мотор!</h1>

            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              sx={{
                boxShadow: 0,
                backgroundColor: 'transparent',
              }}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  paddingLeft: 0,
                }}
              >
                <Typography className={cl.accordion_title}>
                  <div
                    className={
                      expanded === 'panel1'
                        ? cl.expanded_show
                        : cl.accordion_arrow
                    }
                  >
                    <ArrowSvg id="arrow" />
                  </div>
                  <h1>КРОК 1. Знімальний процес</h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={cl.accordion_content}>
                  <p>
                    Для початку визначтеся з пристроєм, на який буде зйомка. Це
                    може бути мобільний телефон, ноутбук, фото або відеокамера.
                    Головне – досягти максимально гарної якості зображення.
                  </p>
                  <p>
                    Отже, закріпіть вибраний пристрій запису у стійкому
                    положенні, перевірте ще раз кадр. Для цього можна зробити,
                    наприклад, кілька фото. Налаштуйте експозицію, встановіть
                    фокус так, щоб все виглядало максимально привабливим. Відео
                    необхідно знімати у горизонтальному форматі, без музики та
                    візуальних ефектів на фоні.
                  </p>
                  <p>
                    При виборі навколишнього середовища враховуйте фактори
                    освітлення та заднього плану. Ідеальний варіант – записувати
                    відео при яскравому денному світлі або якісному внутрішньому
                    освітленні. Денне світло є найвигіднішим, натуральним і
                    нейтральним. А задній план за такого способу освітлення буде
                    фактично непомітний.
                  </p>
                  <p>
                    Найкраще використовувати гарнітуру, щоб звук був “чистішим”.
                    Для початку радимо записати невеликий відрізок Вашого
                    виступу, послухати себе та переконатися, що з картинкою та
                    звуком все гаразд.
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              sx={{
                boxShadow: 0,
                '&::before': {
                  display: 'none',
                },
                backgroundColor: 'transparent',
              }}
            >
              <AccordionSummary
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                sx={{
                  paddingLeft: 0,
                }}
              >
                <Typography className={cl.accordion_title}>
                  <div
                    className={
                      expanded === 'panel2'
                        ? cl.expanded_show
                        : cl.accordion_arrow
                    }
                  >
                    <ArrowSvg id="arrow" />
                  </div>
                  <h1>КРОК 2. Зовнішній вигляд</h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={cl.accordion_content}>
                  <p>
                    Так, звичайно, зйомки створюватимуть враження домашньої
                    обстановки. Але це не означає, що про це говоритиме і ваш
                    зовнішній вигляд. Просто подумайте, як би Ви з'явилися на
                    співбесіді з начальником?! Ми рекомендуємо не впадати в
                    крайнощі, а використовувати Ваш повсякденний гардероб,
                    зачіску, макіяж та інші елементи стилю. Просто будьте собою,
                    це підкреслить вашу індивідуальність.
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
              sx={{
                boxShadow: 0,
                '&::before': {
                  display: 'none',
                },
                backgroundColor: 'transparent',
              }}
            >
              <AccordionSummary
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                sx={{
                  paddingLeft: 0,
                }}
              >
                <Typography className={cl.accordion_title}>
                  <div
                    className={
                      expanded === 'panel3'
                        ? cl.expanded_show
                        : cl.accordion_arrow
                    }
                  >
                    <ArrowSvg id="arrow" />
                  </div>
                  <h1>КРОК 3. Написання розповіді про себе</h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={cl.accordion_content}>
                  <p>
                    Ми надамо Вам низку питань, їх не потрібно озвучувати або
                    приймати за обов'язковий сценарій, це просто контрольні
                    точки до Вашої розповіді, щоб Ви не прогавили нічого
                    важливого, так що просто постарайтеся вибудувати свою
                    розповідь у зазначеній логічній послідовності.
                  </p>
                  <p>
                    Безпосередньо при зйомці не варто читати з листочка, рух
                    очей дуже помітний у кадрі і це справляє не найкраще
                    враження. Найкращий варіант на наш погляд – прочитайте
                    написану Вами розповідь та перекажіть її кілька разів, поки
                    Ви не будете впевнені в тому, що цього Вам достатньо.
                    Нагадаємо, відеоінтерв'ю створено для того, щоб Ви розповіли
                    про себе та про свій досвід роботи, так що просто будьте
                    собою.
                  </p>
                  <p>
                    Нижче ми надаємо перелік питань, за допомогою яких Ви
                    створите своє незабутнє відеоінтерв'ю.
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
              sx={{
                boxShadow: 0,
                '&::before': {
                  display: 'none',
                },
                backgroundColor: 'transparent',
              }}
            >
              <AccordionSummary
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                sx={{
                  paddingLeft: 0,
                }}
              >
                <Typography className={cl.accordion_title}>
                  <div
                    className={
                      expanded === 'panel4'
                        ? cl.expanded_show
                        : cl.accordion_arrow
                    }
                  >
                    <ArrowSvg id="arrow" />
                  </div>
                  <h1>Interview Script</h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={cl.accordion_content}>
                  <p>1. Introduce yourself (name, age, city)</p>
                  <p>
                    2. Tell us about your past experiences (company, position,
                    responsibilities)
                  </p>
                  <p>
                    3. How do you handle difficult situations? Can you give us
                    an example? (situation – task – action – result)
                  </p>
                  <p>4. What type of work would you love to do and why?</p>
                  <p>5. Tell us about your hobbies</p>
                  <p>
                    6. What is your online experience ( Did you manage social
                    network groups or pages, did you write texts or make design
                    for something online, how often do you use computer and what
                    do you usually do in computer?).
                  </p>
                  <p>7. Do you prefer to work in team or alone? Explain why.</p>
                  <p>
                    8. Why should we choose you among the other candidates?
                    (personal qualities)
                  </p>
                  <p>
                    9. Are you looking for a full-time job or part-time one?
                  </p>
                  <p>10. What are your plans for the future?</p>
                  <p>11. What goals would you like to achieve in life?</p>
                  <p>12. What are your life principles?</p>
                  <p>13. Describe your strengths and weaknesses.</p>
                  <p>
                    14. Are you a humanitarian or prefer to work with numbers?
                  </p>
                  <p>15. What do you love/hate in work?</p>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel5'}
              onChange={handleChange('panel5')}
              sx={{
                boxShadow: 0,
                '&::before': {
                  display: 'none',
                },
                backgroundColor: 'transparent',
              }}
            >
              <AccordionSummary
                aria-controls="panel5bh-content"
                id="panel4bh-header"
                sx={{
                  paddingLeft: 0,
                }}
              >
                <Typography className={cl.accordion_title}>
                  <div
                    className={
                      expanded === 'panel5'
                        ? cl.expanded_show
                        : cl.accordion_arrow
                    }
                  >
                    <ArrowSvg id="arrow" />
                  </div>
                  <h1>Додатково</h1>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={cl.accordion_content}>
                  <p>
                    Великим плюсом буде, якщо Вам є що прикріпити разом з
                    інтерв'ю. Наприклад, якщо Ви дизайнер, то Ви можете
                    продемонструвати і розповісти про свої роботи. За бажання
                    файли можна відразу оформити у презентацію PowerPoint.
                  </p>
                  <p>
                    Будь-який креатив у розумних межах з Вашого боку лише
                    вітається.
                    <strong>
                      Відеоінтерв'ю - це Ваш шанс отримати роботу!
                    </strong>
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </main>

      <div className={cl.container}>
        <div className={cl.video_block}>
          <div className={cl.video_instruction_block}>
            <div className={cl.instruction_video_title}>
              <img src={play} alt="" />
            </div>
            <div className={cl.video_instruction}>
              <h1>Чому нам важливе якісне відео?</h1>
              <p>
                Пам’ятай – твоє відео зберігатиметься на наших ресурсах тривалий
                час, а перше враження можна зробити лише один раз. Використовуй
                наш відеоролик із підказками, щоб записати гарне відео для
                тривалого користування.
              </p>
            </div>
          </div>

          <div className={cl.video_examples}>
            <h1>Приклади відеоінтерв'ю співробітників</h1>
            <div className={cl.video_examples_wrapper}>
              <div className={cl.instruction_video_title}>
                <img src={play} alt="" />
              </div>
              <div className={cl.instruction_video_title}>
                <img src={play} alt="" />
              </div>
              <div className={cl.instruction_video_title}>
                <img src={play} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cl.container}>
        <FeedbackForm img={interviewKitekat} />
      </div>
    </>
  );
};
