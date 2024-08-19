import theme from "@/theme";
import { setOptions } from "leaflet";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WordChanger = ({
  label,
  options = ["test", "esempio", "caso"],
  timing = 2000,
  color,
}: {
  label: string;
  options: any[];
  timing?: number;
  color?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState(options);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setWords(options);
  }, [options]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(false);
      }, 500);
    }, timing);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper color={color}>
      {label}{" "}
      <span className={`word ${fade ? "fade" : ""}`}>
        {words[currentWordIndex]}
      </span>
    </Wrapper>
  );
};

export default React.memo(WordChanger);

const Wrapper = styled.p<{ color?: string }>`
  .word {
    transition: opacity 0.5s ease-in-out;
    display: inline-block;
    color: ${({ color }) => (color ? color : theme.colors.primary)};
  }
  .fade {
    opacity: 0;
  }
`;
