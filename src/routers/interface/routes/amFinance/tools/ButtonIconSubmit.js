import React from 'react';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './buttonIconSubmit.module.scss';

// MAIN COMPONENT
const ButtonIconSubmit = ({ ...props }) => {
  return (
    <Button //
      {...props}
      type="submit"
      className={styles.btn}
      icon="checkmark"
      square
      variant="outline-success"
    />
  );
};

// EXPORT
export default ButtonIconSubmit;
