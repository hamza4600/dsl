// OPTIONS

export const INVENTORY_LOCATIONS = [
  {
    label: 'Purchased - At Source Location (PSL)',
    value: 1
  },
  {
    label: 'Purchased - In Transit (PIT)',
    value: 2
  },
  {
    label: 'Incoming New Vehicle from Factory (INC)',
    value: 5
  }
];

export const PURCHASE_METHOD = [
  {
    label: 'Trade',
    value: 1
  },
  {
    label: 'Purchase',
    value: 2
  }
];

// ENUMS

export const INVENTORY_SOURCE_IDS = {
  PURCHASE_FROM_CUSTOMER_FOR_INVENTORY: 3,
  MANUFACTURER: 4,
  PURCHASE_FROM_OTHER: 6,
  TRADE: 7,
  DEALER_DX: 8
};

export const FILE_TYPE_IDS = {
  FACTORY_INVOICE_NEW: 1,
  OTHER_NEW: 2,
  PURCHASE_INVOICE_USED: 3,
  OTHER_USED: 4,
  MSRP_STICKER_NEW: 5,
  BILL_OF_LADING_NEW: 6,
  BILL_OF_LADING_USED: 7,
  DX_DOCUMENTS_NEW: 8,
  DX_DOCUMENTS_USED: 9,
  INVENTORY_DETAIL_NEW: 10,
  INVENTORY_DETAIL_USED: 11,
  REPAIR_INVOICE_NEW: 12,
  REPAIR_INVOICE_USED: 13
};

export const LOCATION_TYPE_IDS = {
  CAD: 3
};
