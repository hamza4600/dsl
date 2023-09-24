import React, { useEffect, useState } from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import HeaderSelect from '../layout/HeaderSelect';

// STYLES
import styles from './searchForm.module.scss';

import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

// VARIABLES
const OPTIONS = [
  {
    label: 'VIN#',
    value: 0,
    name: 'vin_num'
  },
  {
    label: 'Stock#',
    value: 1,
    name: 'stock_num'
  },
  {
    label: 'Customer',
    value: 2,
    name: 'customer'
  },
  {
    label: 'Deal Number',
    value: 3,
    name: 'deal_number'
  }
];

// MAIN COMPONENT
const SearchForm = compose(connect(({ mobile }) => ({ mobile })))(() => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const handleChange = e => setSearch(e.target.value);

  const handelSubmit = value => {
    const params = `?searchField=${search}&&searchKeyword=${OPTIONS[value]?.name}`;

          history.push({
            pathname : "/results",
            search: params,
            state : {
              searchField: OPTIONS[value]?.name,
              searchKeyword: search,
            }
          })
    setSearch('')
  };
  return (
    <div className={styles.container}>
      <Form>
        <Form.Group>
          <Form.Control
            name="search"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            prepend={{
              use: 'search'
            }}
            formGroup={{
              className: styles.keyword
            }}
            useFormik={false}
          />
          <HeaderSelect
            name="category"
            placeholder="Category"
            options={OPTIONS}
            formGroup={{
              className: styles.category
            }}
            onSelect={handelSubmit}
          />
        </Form.Group>
      </Form>
    </div>
  );
});

// EXPORT
export default SearchForm;
