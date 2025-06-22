import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from './Error.module.css';

const Error = () => {
  return (
    <div className={styles["error-container"]}>
      <FaExclamationTriangle className="error-icon" />
      <h3 className="error-title">Failed to Load Content</h3>
      <p className="error-message">Please try again later</p>
      <button 
        className="error-retry"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;