import styles from "./index.module.sass";

export default function Button({ children, variant, onClick }) {
  const variantStyle = styles[variant];

  return (
    <button
      className={[styles.button, variantStyle].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
