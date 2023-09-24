import React from "react";

import { Modal, Spinner } from "react-bootstrap";

import styles from "./loader.module.scss";

export default function Loader({ children, hasData = false, label, loading }) {
  return loading ? (
    <>
      {hasData ? children : null}
      <Modal
        show
        keyboard={false}
        dialogAs='div'
        dialogClassName='d-flex flex-column align-items-center justify-content-center h-100'
        backdrop='static'
        backdropClassName='bg-black'
      >
        <Spinner animation='border' role='status' className={styles.spinner} />
        {label || <span className='sr-only'>Loading...</span>}
      </Modal>
    </>
  ) : (
    children
  );
}
