import React, { useMemo } from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Main from 'parts/main/Main';
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import Header from './Header';

// STYLES
import styles from './updateForm.module.scss';

// MAIN COMPONENT
const UpdateForm = ({
  children,
  title,
  label = '',
  method,
  endpoint,
  backButton,
  backPathname,
  buttons,
  buttonsBefore = false,
  buttonsAfter = true,
  headerTools,
  headerRight,
  // REST
  ...props
}) => {
  buttons = useMemo(
    () =>
      buttons || (
        <div className={styles.buttons}>
          <Button.Save size="sm" />
        </div>
      ),
    [buttons]
  );

  return (
    <Main>
      <Header
        title={title}
        backButton={backButton}
        backPathname={backPathname}
        headerTools={headerTools}
        rightItems={headerRight}
      />
      <Form
        className={styles.form}
        method={method}
        endpoint={endpoint}
        loadingMessage={`Saving ${label.toLowerCase()}`}
        successMessage={`${label} saved.`}
        errorMessage={`Unable to save ${label.toLowerCase()}.`}
        {...props}
      >
        {buttonsBefore ? buttons : null}
        {children}
        {buttonsAfter ? buttons : null}
      </Form>
    </Main>
  );
};

// EXPORT
export default UpdateForm;
