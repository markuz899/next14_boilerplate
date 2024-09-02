import React, { useState } from "react";
import styled from "styled-components";

const ReadMore = ({
  text,
  max = 700,
  active = true,
}: {
  text: string;
  max?: number;
  active?: boolean;
}) => {
  const [isReadMore, setIsReadMore] = useState(active);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <ReadStyle>
      {isReadMore ? text.slice(0, max) : text}
      {text.length > max && (
        <span className="text-primary" onClick={toggleReadMore}>
          {isReadMore ? "...leggi di più" : " ...mostra meno"}
        </span>
      )}
    </ReadStyle>
  );
};

export default ReadMore;

const ReadStyle = styled.p`
  line-height: 1.3;
  span {
    cursor: pointer;
  }
`;
