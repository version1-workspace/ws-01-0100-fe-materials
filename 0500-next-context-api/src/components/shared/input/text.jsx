import { join } from "@/lib/cls";
import { forwardRef } from "react";
import styles from "./text.module.css";

export default forwardRef(function Input(
  {
    type,
    value,
    placeholder,
    containerClassName,
    inputClassName,
    onChange,
    readOnly,
  },
  ref,
) {
  return (
    <div className={join(styles.container, containerClassName)}>
      <input
        readOnly={readOnly}
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
