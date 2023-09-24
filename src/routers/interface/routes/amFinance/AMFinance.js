import React, { useContext } from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS } from './variables';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Filters from 'parts/filters/Filters';
import Main from 'parts/main/Main';
import Title from 'parts/title/Title';

// LOCAL COMPONENTS
import Row from './parts/Row';
import Cell from './parts/Cell';
import RowNumberCol from './tools/RowNumberCol';
import DownloadButton from '../../tools/DownloadButton';
import Tooltip from 'core/tools/Tooltip';

// MAIN COMPONENT
const AMFinance = () => {
  const {
    result,
    columns,
    preferences: { filters }
  } = useContext(ListContext);

  return (
    <Main>
      <Title documentTitle='AM/Finance ' title="AM/Finance" tools={[
        <Tooltip
        tip='Export to Excel'
        >
      <DownloadButton endpoint={ENDPOINTS.amFinance.list} filters={filters} />
      </Tooltip>
      ]} />
      <Filters>
        <Filters.Date.Range />
        <Filters.Button.SalesType />
        <Filters.Button.NewUsed />
      </Filters>
      {result.map((r, i) => {
        return (
          <Card key={i} className="rounded border mb-0">
            <Row>
              <RowNumberCol>{i + 1}</RowNumberCol>
              {columns.map((c, j) => {
                const { key, label, component: Component, ...column } = c;
                const value = r[key];

                return (
                  <Cell key={j} label={label} {...column}>
                    {Component ? (
                      <Component key={key} label={label} rowValues={r} {...column}>
                        {value}
                      </Component>
                    ) : (
                      value
                    )}
                  </Cell>
                );
              })}
            </Row>
          </Card>
        );
      })}
    </Main>
  );
};

// EXPORT
export default getListData(AMFinance, {
  key: SETTINGS.path,
  fetchArgs: {
    endpoint: ENDPOINTS.amFinance.list,
    params: {}
  },
  settings: SETTINGS,
  columns: [
    COLUMNS.purchased,
    COLUMNS.salesperson,
    COLUMNS.customer,
    COLUMNS.type,
    COLUMNS.ss,
    COLUMNS.rl,
    COLUMNS.stockNum,
    COLUMNS.vehicle,
    COLUMNS.trade,
    COLUMNS.frtGross,
    COLUMNS.openDetail,
    COLUMNS.am,
    COLUMNS.fm,
    COLUMNS.sa1,
    COLUMNS.sa2,
    COLUMNS.sa3
  ]
});
