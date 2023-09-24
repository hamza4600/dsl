import React, { Children, cloneElement, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { useFormikContext } from 'formik';
import { Spinner } from 'react-bootstrap';

// FUNCTIONS
import { apiFetch, doCallback } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './saveField.module.scss';

export default function SaveField({
  children: parentChildren,
  disableButton,
  endpoint,
  onSuccess,
  useButton,
  params,
  label: controlledLabel,
  args
}) {
  const [saving, setSaving] = useState(false);
  const { values } = useFormikContext();

  const submitField = ({ name, label: childLabel }) => {
    const label = controlledLabel || childLabel;
    apiFetch({
      method: 'PUT',
      endpoint,
      params: isFunction(params)
        ? params(values[name])
        : params || {
            [name]: values[name]
          },
      onSuccess: () => doCallback(onSuccess, values[name]),
      loadingMessage: `Saving ${label}`,
      successMessage: `${label} saved.`,
      errorMessage: `Unable to save ${label}`,
      ...args
    });
  };

  const handleChange = ({ target: { value } }, { name, label: childLabel }) => {
    const label = controlledLabel || childLabel;
    apiFetch({
      method: 'PUT',
      endpoint,
      params: isFunction(params)
        ? params(value)
        : params || {
            [name]: value
          },
      onFetch: () => setSaving(true),
      onSuccess: () => doCallback(onSuccess, value),
      onComplete: () => setSaving(false),
      errorMessage: `Unable to save ${label}`,
      ...args
    });
  };

  const renderChild = ({ children, child, index }) => {
    const isLast = index === Children.count(children) - 1;
    const { name, disabled, onChange } = child.props;

    return cloneElement(child, {
      key: index,
      input: {
        append: isLast ? (
          useButton ? (
            <Button
              className={clsx(styles.btn, 'ml-3')}
              icon="checkmark"
              onClick={() => submitField(child.props)}
              square
              variant="outline-success"
              disabled={disableButton || disabled || (isString(values[name]) && values[name].trim() === '')}
            />
          ) : (
            <div className={clsx(styles.status, 'text-center')}>
              {saving ? <Spinner animation="border" variant="primary" /> : null}
            </div>
          )
        ) : null
      },
      ...child.props,
      onChange: e => {
        if (!useButton) handleChange(e, child.props);
        doCallback(onChange, e);
      }
    });
  };

  return (
    <div className="d-flex align-items-end align-items-md-center w-100">
      <div className="flex-grow-1">
        {Children.map(parentChildren, (child, index) => {
          // Allow for nested children
          const childChildren = (child.props.children || []).filter(c => c);
          if (childChildren.length) {
            return Children.map(childChildren, (c, i) => renderChild({ children: childChildren, child: c, index: i }));
          }
          return renderChild({ children: parentChildren, child, index });
        })}
      </div>
    </div>
  );
}
