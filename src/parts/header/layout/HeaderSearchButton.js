import React, { useMemo, useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
// import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';
import { Button } from 'react-bootstrap';
import Form from 'core/form/Form';
import Sprite from 'core/tools/Sprite';
// import { apiFetch } from 'functions.js';

// LOCAL COMPONENTS
// STYLES
import style from './headerSearchButton.module.scss';
import { apiFetch } from 'functions';
import { ENDPOINTS } from 'endpoints';
import { useHistory } from 'react-router';
import clsx from 'clsx';

// MAIN COMPONENT
const SearchForm = compose(
  connect(
    ({
      dealership,
      user
    }) => ({
      dealership,
      user
    }),
    { ...sessionActions }
  )
)(({
  setShow,
  show,
  // REDUX STATE
  dealership,
  user: {
    stores
  },
  // REDUX DISPATCH
  setStore
}) => {
  //STATE
  const [search, setSearch] = useState('');

  const history = useHistory();
  
  const handleClose = () => setShow(false)

  const handleChange = (e) => setSearch(e.target.value);

  const handelSubmit = () => {
    const params = `?searchField=${search}&&searchKeyword=stock_num`;

          history.push({
            pathname : "/results",
            search: params,
            state : {
              // searchField: 'stock_num',
              searchKeyword: search,
            }
          })
    setSearch('')
  };
  return (
    <Form className={style.container} onSubmit={handelSubmit}>
      <Button className={clsx(style.search, 'pl-0' )} onClick={handleClose}>
        <Sprite use='cancel' size='xl' />
      </Button>
      <input
        className={style.keyword}
        name="search"
        placeholder="Search by Keyword"
        onChange={handleChange}
      />
      <Button className={style.search} onClick={handelSubmit}>
        <Sprite use='search' size='xl' />
      </Button>
    </Form>
  )
})

// EXPORT
export default SearchForm
