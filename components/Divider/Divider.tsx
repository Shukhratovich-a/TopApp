import cn from "classnames";

import { PProps } from "./Divider.props";

import styles from "./Divider.module.css";

export const Divider = ({ className, ...props }: PProps): JSX.Element => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
