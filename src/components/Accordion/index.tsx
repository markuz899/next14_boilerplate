import React, { useState, useRef } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { AccordionProps, AccordionItemProps } from "./interface";
import theme from "@/theme";

const Accordion: React.FC<AccordionProps> = ({ options }) => {
  const [clicked, setClicked] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <ContentAccordion>
      {options?.map((faq, index) => (
        <AccordionItem
          onToggle={() => handleToggle(index)}
          active={clicked === index}
          key={index}
          faq={faq}
        />
      ))}
    </ContentAccordion>
  );
};

export default Accordion;

const AccordionItem: React.FC<AccordionItemProps> = ({
  faq,
  active,
  onToggle,
}) => {
  const { question, answer } = faq;
  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <li className={`accordion_item ${active ? "active" : ""}`}>
      <button className={`button ${active ? "active" : ""}`} onClick={onToggle}>
        <p>{question}</p>
        <Icon
          name={active ? "angle-top" : "angle-down"}
          size={theme.spaces.space4}
          color={theme.colors.primary}
        />
      </button>
      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          active
            ? { height: contentEl.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <div
          className="answer"
          dangerouslySetInnerHTML={{ __html: answer }}
        ></div>
      </div>
    </li>
  );
};

const ContentAccordion = styled.ul`
  width: 100%;
  list-style: none;
  .accordion_item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .button {
      position: relative;
      width: 100%;
      font-size: ${theme.font.size.normal};
      color: ${theme.colors.dark};
      text-transform: uppercase;
      text-align: left;
      border: 2px solid ${theme.colors.dark};
      border-radius: ${theme.extra.radius};
      background: ${({ theme }) => theme.body};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${theme.spaces.space5} ${theme.spaces.space6};
      z-index: 2;
      transition: all 0.5s;
      cursor: pointer;
      p {
        width: 100%;
      }
      &.active {
        color: ${theme.colors.primary};
      }
    }
    .answer {
      color: ${theme.colors.dark};
      font-size: ${theme.font.size.normal};
      padding: ${theme.spaces.space4} ${theme.spaces.space6};
      background: ${theme.colors.darkGrey};
    }

    .answer_wrapper {
      margin-top: -4px;
      position: relative;
      height: 0;
      overflow: hidden;
      transition: height ease 0.2s;
      text-align: left;
      z-index: 1;
      border: 2px solid ${theme.colors.dark};
      border-bottom-left-radius: ${theme.extra.radius};
      border-bottom-right-radius: ${theme.extra.radius};
    }
  }
`;
