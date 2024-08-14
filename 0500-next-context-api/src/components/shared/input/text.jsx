import { join } from "@/lib/cls";
import { ChangeEvent, ForwardedRef, forwardRef } from "react";
import styles from "./text.module.css";

export default forwardRef(function Input(
  {
    type,
    value,
    placeholder,
    containerClassName,
    inputClassName,
    onChange,
  },
  ref,
) {
  return (
    <div className={join(styles.container, containerClassName)}>
      <input
        ref={ref}
        className={join(styles.text, inputClassName)}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});
