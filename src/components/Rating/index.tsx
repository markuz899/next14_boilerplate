import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme";
import Icon from "../Icon";

export interface RatingProps {
  rate?: number;
  disable?: boolean;
  numberStar?: number;
  onChange?: any;
  size?: string;
}

const Rating = ({
  rate,
  disable,
  numberStar = 5,
  onChange,
  size = theme.spaces.space6,
}: RatingProps) => {
  const [totalStars, setTotalStars] = useState<number>(numberStar);
  const [rating, setRating] = useState<any>(rate);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setRating(rate);
    setTotalStars(numberStar);
  }, [rate, numberStar]);

  const onSelect = (rate: number) => {
    setRating(rate);
    onChange && onChange(rate);
  };

  return (
    <ContentRating>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating: any = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => !disable && onSelect(currentRating)}
            />
            <span
              className="star"
              onMouseEnter={() => !disable && setHover(currentRating)}
              onMouseLeave={() => !disable && setHover(false)}
            >
              <Icon
                className="star"
                name="star"
                size={size}
                color={
                  currentRating <= (hover || rating)
                    ? theme.colors.warning
                    : theme.colors.greyIcon
                }
              />
            </span>
          </label>
        );
      })}
    </ContentRating>
  );
};

export default React.memo(Rating);

const ContentRating = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: ${theme.spaces.space1};
  input[type="radio"] {
    display: none;
  }
  .star {
    display: block;
    cursor: pointer;
    font-size: 2rem;
  }
`;
