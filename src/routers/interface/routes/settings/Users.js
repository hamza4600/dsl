//DEPENDENCIES
import React, { useContext } from 'react';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Filters from 'parts/filters/Filters';
import Main from 'parts/main/Main';
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { COLUMNS, USER_SETTINGS } from './users/variables';

// STYLES
import style from '../settings/staff/style.module.scss';

// MAIN COMPONENT
const Users = () => {

  // CONTEXT
  const { result, columns } = useContext(ListContext) || {};

  return (
    <Main>
      <Title
        title="Users"
        tools={[
          <Button.Link
            icon="download-excel"
          />
        ]}
      />
      <Filters>
        <Filters.Search
          name="q"
        />
      </Filters>
      <div>
        {result.map(({
          role_name,
          users = []
        }, i) => {

          const numRows = users.length ;
          const tableHeight = `calc(4rem * ${numRows})`;
          return (
            <div className={style.container} key={i} style={numRows < 10 ? { 'minHeight': `${tableHeight}` } : {}} >
              <h3 >{role_name}</h3>
              <div className={style.tableContainer}>
                <Table.Header />
                <Table.Body className={numRows < 10 && style.tableContent} >
                  {users.map((user, j) => {
                    return (
                      <Table.Entry
                        key={j}
                        columns={columns}
                        record={user}
                        rowNumber={(j + 1).toString()
                        }
                      />
                    )
                  })}
                </Table.Body>
              </div>
            </div>
          )
        })}
      </div>
    </Main >
  )
}

// EXPORT
export default getListData(Users, {
  key: 'site_user_id',
  fetchArgs: {
    endpoint: `${ENDPOINTS.admin.user.list}`,
  },
  settings: USER_SETTINGS,
  columns: [
    COLUMNS.firstName,
    COLUMNS.lastName,
    COLUMNS.cell,
    COLUMNS.email,
    COLUMNS.lastLogin
  ]
});
