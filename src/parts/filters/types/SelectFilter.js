import React, { useCallback } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
//import styles from './selectFilter.module.scss';

// MAIN COMPONENT
const SelectFilter = ({
  onUpdate,
  ...props
}) => {

  // PROPS
  const { name } = props;

  // CALLBACKS
  const handleSelect = useCallback(
    value => {
      doCallback(onUpdate, name, value)
    },
    [name, onUpdate]
  )

  // RENDER
  return (
    <Form.Select
      useBlank
      blankLabel="All"
      onSelect={handleSelect}
      htmlSize={12}
      {...props}
    />
  )
}

// CHILD COMPONENTS
SelectFilter.Active = props => (
  <SelectFilter
    name="isActive"
    options={[
      {
        label: 'Inactive',
        value: '0'
      },
      {
        label: 'Active',
        value: '1'
      }
    ]}
    {...props}
  />
)

SelectFilter.Global = props => (
  <SelectFilter
    name="isGlobal"
    options={[
      {
        label: 'Non-global only',
        value: '0'
      },
      {
        label: 'Global only',
        value: '1'
      }
    ]}
    {...props}
  />
)

SelectFilter.NewUsed = props => (
  <SelectFilter
    name="newUsed"
    options={[
      {
        label: 'Pre-Owned',
        value: '0'
      },
      {
        label: 'New',
        value: '1'
      }
    ]}
    {...props}
  />
)

SelectFilter.ProductType = props => (
  <SelectFilter
    name="productType"
    options={[
      {
        label: 'AM',
        value: '0'
      },
      {
        label: 'F & I',
        value: '1'
      }
    ]}
    {...props}
  />
)

SelectFilter.SalesType = props => (
  <SelectFilter
    name="saleTypeCategoryId"
    label="Sales Type"
    lookup="salesTypeCategory"
    optionKeys={{
      label: 'sale_type_category_name',
      value: 'sale_type_category_id'
    }}
    {...props}
  />
)

SelectFilter.InventorySource = props => (
  <SelectFilter
    name="inventorySource"
    label="Inventroy Source"
    placeholder="Source"
    lookup="inventorySource"
    optionKeys={{
      label: 'inventory_source',
      value: 'inventory_source_id'
    }}
    htmlSize={12}
    {...props}
  />
)

SelectFilter.InventoryStatus = props => (
  <SelectFilter
    name="inventoryStatus"
    label="Inventory Status"
    placeholder="Status"
    lookup="inventoryStatus"
    optionKeys={{
      label: 'status_name',
      value: 'inventory_status_id'
    }}
    optionsMapper={o => ([ { label: 'All Except Order', value: '1,3,4,5,13' }, ...o])}
    {...props}
  />
)

SelectFilter.SoldDate = props => (
  <SelectFilter
    name="sales_time"
    label="Sold Date"
    placeholder="Sold Date"
    useBlank={false}
    options={[
      {
        label: 'Est. Delv Date',
        name:'estimated_delivery_date',
        value: '0'
      },
      {
        label: 'Sold Date',
        name:'sales_time',
        value: '1'
      }
    ]}
    {...props}
  />
)

SelectFilter.Match = props => (
  <SelectFilter
    name="auditStatus"
    label="Audit Status"
    placeholder="No Matches"
    useBlank={false}
    options={[
      {
        label: 'No Matches',
        value: 'nomatches'
      },
      {
        label: 'Matches',
        value: 'matches'
      }
    ]}
    {...props}
  />
  
)
// EXPORT
export default SelectFilter;
