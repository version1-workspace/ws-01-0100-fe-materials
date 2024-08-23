import styles from "./index.module.css";

const variantStyles = {
  default: styles.default,
  primary: styles.primary,
  secondary: styles.secondary,
};

export default function Button({
  children,
  variant,
  className,
  ...rest
}) {
  const variantClass = variantStyles[variant || "default"];
  return (
    <button
      className={[styles.button, variantClass, className].join(" ")}
      type="button"
      {...rest}>
      {children}
    </button>
  );
}
