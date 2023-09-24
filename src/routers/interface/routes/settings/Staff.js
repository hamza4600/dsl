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
import { COLUMNS, STAFF_SETTINGS } from './staff/variables';

// STYLES
import style from '../settings/staff/style.module.scss';

// MAIN COMPONENT
const Staff = () => {

  // CONTEXT
  const { result, columns } = useContext(ListContext) || {};

  return (
    <Main>
      <Title
        title="Staff"
        tools={[
          <Button.Link
            icon="download-excel"
          />
        ]}
      />
      <Filters>
        <Filters.Search name="q" />
      </Filters>
      <div>
        {result?.map(({
          title,
          users = []
        }, i) => {

          const numRows = users.length + 1;
          const tableHeight = `calc(4rem * ${numRows})`;

          return (
            <div className={style.container} style={numRows < 10 ? { 'minHeight': `${tableHeight}` } : {}} key={i}>
              <h3 >{title}</h3>
              <div className={style.tableContainer}>
                <Table.Header rowNumber={false} />
                <Table.Body className={numRows < 10 && style.tableContent}>
                  {users?.map((user, j) => {
                    return (
                      <Table.Entry
                        key={j}
                        record={user}
                        columns={columns}
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
export default getListData(Staff, {
  key: 'site_user_id',
  fetchArgs: {
    endpoint: `${ENDPOINTS.admin.staff.list}`,
  },
  settings: STAFF_SETTINGS,
  columns: [
    COLUMNS.firstName,
    COLUMNS.lastName,
    COLUMNS.cell,
    COLUMNS.email,
    COLUMNS.lastLogin
  ]
});
