import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Tooltip from 'core/tools/Tooltip';

// LOCAL COMPONENTS
import TableCell from './TableCell';
import TableCol from './TableCol';
import SortButton from '../tools/SortButton';
import Button from 'core/tools/Button';

// STYLES
import styles from './tableHeaderCell.module.scss';

// MAIN COMPONENT
const TableHeaderCell = ({
  children,
  className,
  name,
  label = children || name,
  icon,
  tooltip = name !== label ? name : undefined,
  tooltips,
  sortable = true,
  align,
  hidden,
  placement,
  hoverTip,
  ...props
}) =>
  hidden ? null : (
    <TableCol className={clsx('table-header-col', styles.col, styles[align], className)} {...props}>
      <Tooltip placement={placement ||"top"} tip={tooltip} tooltips={tooltips}  hoverTip={ hoverTip}>
        {sortable ? (
          <SortButton as={TableCell} className={clsx('table-header-cell d-flex', styles.cell, className)} {...props}>
            {label}
          </SortButton>
        ) : (  
          <TableCell className={clsx('table-header-cell', styles.cell, className)} {...props}>
            {icon?<>
              {label}
            <Button.Link
          className={clsx(styles.icon)}
          icon={icon}/>
          </>:
            label
            }
          </TableCell>
        )}
      </Tooltip>
    </TableCol>
  );

// EXPORT
export default TableHeaderCell;
