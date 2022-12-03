import React from "react";
import cn from "classnames";

import { RatingProps } from "./Rating.props";

import StarIcon from "./star.svg";

import styles from "./Rating.module.css";

export const Rating = ({ className, isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = React.useState<JSX.Element[]>(new Array(5).fill(<></>));

  React.useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
        >
          <StarIcon
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: React.KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
          />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) return;
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) return;
    setRating(i);
  };

  const handleSpace = (i: number, e: React.KeyboardEvent<SVGAElement>) => {
    if (e.code != "Space" || !setRating) return;
    setRating(i);
  };

  return (
    <div className={cn(styles.ratings, className, {})} {...props}>
      {ratingArray.map((r, i) => (
        <span className={cn(styles.rating)} key={i}>
          {r}
        </span>
      ))}
    </div>
  );
};
