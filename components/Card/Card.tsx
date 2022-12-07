import cn from "classnames";

import { CardProps } from "./Card.props";

import styles from "./Card.module.css";
import React from "react";

export const Card = React.forwardRef(
  ({ className, children, color = "white", ...props }: CardProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color === "blue",
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
