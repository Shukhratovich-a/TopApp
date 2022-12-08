import cn from "classnames";
import { motion } from "framer-motion";

import { ButtonProps } from "./Button.props";

import ArrowIcon from "./arrow.svg";

import styles from "./Button.module.css";

export const Button = ({ children, className, appearance, arrow = "none", ...props }: ButtonProps): JSX.Element => {
  return (
    <motion.button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
      })}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span className={cn(styles.arrow, { [styles.down]: arrow === "down" })}>
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
