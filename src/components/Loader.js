import React from 'react';
import styles from './Loader.module.css';
const Loader = ({ title }) => {
  return (
    <div className={styles["loader-container"]}>
      <div className="spinner"></div>
      <p className="loader-text">{title}</p>
    </div>
  );
};

export default Loader;