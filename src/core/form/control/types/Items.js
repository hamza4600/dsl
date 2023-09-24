import React, { Children, cloneElement, useCallback, useEffect, useMemo, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { cloneDeep, get, startCase } from 'lodash';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { BUTTON } from 'defaults.js';

// GLOBAL FUNCTIONS
import { controlName } from 'functions.js';

// HELPERS
import { formGroup } from '../helpers/layout/formGroup';
import { inputLabel } from '../helpers/layout/inputLabel';

// PARTS
import Body from '../../parts/Body';
import Col from '../../parts/Col';
import Row from '../../parts/Row';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './items.module.scss';

// MAIN COMPONENT
const Items = compose(
  formGroup,
  inputLabel
)(({
  className,
  name,
  itemLabel = 'Item',
  min = 1,
  max,
  ...props
}) => {

  // PROPS
  const { disabled, plaintext, fullWidth } = props;

  // FORMIK CONTEXT
  const { errors, values, setFieldValue } = useFormikContext() || {};

  // MEMOS
  const value = useMemo(
    () => cloneDeep(get(values, name)),
    [name, values]
  )

  // STATE
  const [ length, setLength ] = useState(min);

  // CALLBACKS
  const addItem = useCallback(
    () => {
      setLength(length + 1);
    },
    [length, setLength]
  )
  const removeItem = useCallback(
    () => {
      setLength(length - 1);
    },
    [length, setLength]
  )
  const handleDelete = useCallback(
    async i => {
      if (!value) {
        removeItem();
        return;
      }
      value.splice(i, 1);
      await setFieldValue(name, value);
      removeItem();
    },
    [name, value, setFieldValue, removeItem]
  )

  // EFFECTS
  useEffect(
    () => {
      if (value && value.length > length) setFieldValue(name, value.slice(0, length));
    },
    [name, value, length, setFieldValue]
  )
  // useEffect(
  //   () => {
  //     console.log(values);
  //     console.log(errors);
  //   },
  //   [values, errors]
  // )

  // RENDER
  return (
    <Row
      className={clsx(
        styles.items,
        fullWidth && styles.fullWidth,
        className
      )}
    >
      {Array(length).fill().map((_item, i) => (
        <Item
          key={i}
          name={controlName(i, name)}
          rowNum={i}
          allowDelete={length > min}
          onDelete={() => handleDelete(i)}
          {...props}
        />
      ))}
      {(!max || max > length) && !plaintext &&
        <Col className={styles.addButton}>
          <Button.Link
            label={`Add ${startCase(itemLabel)}`}
            icon={BUTTON.add.icon}
            onClick={addItem}
            disabled={disabled}
          />
        </Col>
      }
    </Row>
  )
})

// CHILD COMPONENT
const Item = ({
  children,
  name,
  rowNum,
  onDelete,
  allowDelete,
  ...props
}) => (
  <Col
    className={styles.item}
    xs={24}
  >
    <Row>
      <Col>
        <Body.Inline className={styles.itemControls}>
          {Children.map(children, (child, i) => cloneElement(child, Object.assign({}, props, child.props, {
            key: i,
            name: controlName(child.props.name, name)
          })))}
        </Body.Inline>
      </Col>
      {allowDelete &&
        <Col className={styles.deleteButton}>
          <Button.Link
            icon={BUTTON.delete.icon}
            onClick={onDelete}
          />
        </Col>
      }
    </Row>
  </Col>
)

export default Items
