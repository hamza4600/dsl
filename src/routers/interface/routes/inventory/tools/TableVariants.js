// REACT COMPONENTS
import Table from 'parts/table/Table';

// MAIN COMPONENT
const TableVariants = ({
  record,
  columnKey,
  children,
  ...props
}) =>  (
    <Table.Code
    className='ml-2'
    tip={record[columnKey.replace('code', 'name')]}
    children={children}
    record={record}
    columnKey={columnKey}
    {...props}
     />
  )

// EXPORT
export default TableVariants;
