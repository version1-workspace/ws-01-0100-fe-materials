import { forwardRef } from "react";
import styles from "./index.module.sass";

export const TextInput = forwardRef(
  ({ value, placeholder, onChange, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={[styles.input, styles.textInput].join(" ")}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  },
);
TextInput.displayName = "TextInput";

export const DateInput = forwardRef(({ value, onChange, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={[styles.input, styles.dateInput].join(" ")}
      type="date"
      value={value}
      onChange={onChange}
    />
  );
});

DateInput.displayName = "DateInput";
