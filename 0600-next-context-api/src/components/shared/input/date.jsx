import { join } from "@/lib/cls";
import { forwardRef } from "react";
import styles from "./date.module.css";

export default forwardRef(function DateInput(
  {
    value,
    placeholder,
    max,
    min,
    containerClassName,
    inputClassName,
    onChange,
  },
  ref
) {
  const _value = (value?.toString() || "").replaceAll("/", "-");
  return (
    <div className={join(styles.container, containerClassName)}>
      <input
        ref={ref}
        className={join(styles.input, inputClassName)}
        type="date"
        value={_value}
        max={max}
        min={min}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});
