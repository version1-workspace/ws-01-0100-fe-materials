import styles from "./index.module.css";
import ShowIf from "../showIf";

const ErrorMessage = ({ message }) => {
  return (
    <ShowIf value={message}>
      <p className={styles.message}>{message}</p>
    </ShowIf>
  );
};

export default ErrorMessage;
