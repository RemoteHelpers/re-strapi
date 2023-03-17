/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import ReactMarkdown from "react-markdown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useStateContext } from "../../context/StateContext";

import { ArrowSvg } from "../../pages/videoInterview/ArrowSvg";

import cl from "./faq.module.scss";

interface FaqQuestionsTypes {
  Answer: string;
  Question: string;
  id: number;
}

interface FaqQuestionsProps {
  faqData: [];
}

const FAQ = ({ faqData }: FaqQuestionsProps) => {
  const { homeData } = useStateContext();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={cl.FAQ__accordion}>
      {faqData.map(({ Answer, Question, id }: FaqQuestionsTypes) => (
        <Accordion
          key={id}
          expanded={expanded === `panel${id}`}
          onChange={handleChange(`panel${id}`)}
          sx={{
            boxShadow: 0,
            "&::before": {
              display: "none",
            },
            paddingLeft: 0,
            backgroundColor: "transparent",
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
                  expanded === `panel${id}`
                    ? cl.expanded_show
                    : cl.accordion_arrow
                }
              >
                <ArrowSvg id="arrow" />
              </div>
              <h1>{Question}</h1>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={cl.accordion_content}>
              <ReactMarkdown children={Answer} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
