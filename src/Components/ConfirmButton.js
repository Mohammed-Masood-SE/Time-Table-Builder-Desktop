import { useState } from "react";
import toast from "react-hot-toast";
import styles from "../Styles/ConfirmButton.module.css";

function ConfirmButton({ value, onClick }) {
  const [hide, setHide] = useState(false);

  const handleNoClick = () => {
    setHide(true);
  };

  if (hide) {
    return null; // Don't render the component
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Are You Sure You Want To Delete {value}</h1>
      <button
        className={`${styles.buttons} ${styles.yes}`}
        onClick={() => {
          onClick();
          handleNoClick();
        }}
      >
        Yes
      </button>
      <button
        className={`${styles.buttons} ${styles.no}`}
        onClick={handleNoClick}
      >
        No
      </button>
    </div>
  );
}

export default ConfirmButton;
