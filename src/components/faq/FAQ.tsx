/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { ArrowSvg } from '../../pages/videoInterview/ArrowSvg';

import cl from './faq.module.scss';

const data = [
  {
    question: 'Что такое аутстаффинг, аутсорсинг?',
    answer: 'Аутстаффинг и аутсорсинг это бизнес модели, в которых компания привлекает команду или человека для работы над конкретным проектом. В обоих случаях специалисты работают удаленно. Основное отличие состоит в том, что под аутсорсингом понимается поддержка всего проекта, а под аутстаффингом подразумевается наем и обслуживание отдельных сотрудников.',
  },
  {
    question: 'Нужен ли опыт или проф образование?',
    answer: 'Аутстаффинг и аутсорсинг это бизнес модели, в которых компания привлекает команду или человека для работы над конкретным проектом. В обоих случаях специалисты работают удаленно. Основное отличие состоит в том, что под аутсорсингом понимается поддержка всего проекта, а под аутстаффингом подразумевается наем и обслуживание отдельных сотрудников.',
  },
  {
    question: 'Какой уровень английского требуется для работы?',
    answer: 'Аутстаффинг и аутсорсинг это бизнес модели, в которых компания привлекает команду или человека для работы над конкретным проектом. В обоих случаях специалисты работают удаленно. Основное отличие состоит в том, что под аутсорсингом понимается поддержка всего проекта, а под аутстаффингом подразумевается наем и обслуживание отдельных сотрудников.',
  },
  {
    question: 'Какое время работы?',
    answer: 'Аутстаффинг и аутсорсинг это бизнес модели, в которых компания привлекает команду или человека для работы над конкретным проектом. В обоих случаях специалисты работают удаленно. Основное отличие состоит в том, что под аутсорсингом понимается поддержка всего проекта, а под аутстаффингом подразумевается наем и обслуживание отдельных сотрудников.',
  },
  {
    question: 'Что такое иностранный проект и как на него попасть?',
    answer: 'Аутстаффинг и аутсорсинг это бизнес модели, в которых компания привлекает команду или человека для работы над конкретным проектом. В обоих случаях специалисты работают удаленно. Основное отличие состоит в том, что под аутсорсингом понимается поддержка всего проекта, а под аутстаффингом подразумевается наем и обслуживание отдельных сотрудников.',
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  // const [selected, setSelected] = useState(null);

  // const toggle = (i: any) => {
  //   if (selected === i) {
  //     return setSelected(null);
  //   }

  //   setSelected(i);
  // };

  return (
    <div className={cl.FAQ}>
      <h3 className={cl.FAQ__title}>Вопрос - Ответ</h3>
      <div className={cl.FAQ__accordion}>
        {data.map((item, i) => (
          // <div key={i} className={cl.FAQ__item} onClick={() => toggle(i)}>
          //   <div className={cl.FAQ__accordionTitle}>
          //     {selected === i && (
          //       <img className={cl.FAQ__icon} src={ReversedArrow} alt="open" />
          //     )}
          //     {selected !== i && (
          //       <img className={cl.FAQ__icon} src={Arrow} alt="open" />
          //     )}
          //     <h4 className={cl.FAQ__question}>{item.question}</h4>
          //     {/* <span>{selected === i}</span> */}
          //   </div>
          //   <div className={(selected === i) ? `${cl.show} ${cl.FAQ__content}`
          // : cl.FAQ__content}>
          //     {item.answer}
          //   </div>
          // </div>
          <Accordion
            key={i}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
            sx={{
              boxShadow: 0,
              '&::before': {
                display: 'none',
              },
              paddingLeft: 0,
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
                    expanded === `panel${i}`
                      ? cl.expanded_show
                      : cl.accordion_arrow
                  }
                >
                  <ArrowSvg id="arrow" />
                </div>
                <h1>{item.question}</h1>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={cl.accordion_content}>
                <p>{item.answer}</p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
