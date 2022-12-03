import cn from "classnames";

import { ButtonProps } from "./Button.props";

import ArrowIcon from "./arrow.svg";

import styles from "./Button.module.css";

export const Button = ({ children, className, appearance, arrow = "none", ...props }: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
      })}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span className={cn(styles.arrow, { [styles.down]: arrow === "down" })}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
