import React from "react";
import cn from "classnames";

import { InputProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

export const Textarea = React.forwardRef(
  ({ className, error, ...props }: InputProps, ref: React.ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
      <div className={cn(styles.textareaWrapper, className)}>
        <textarea
          className={cn(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
