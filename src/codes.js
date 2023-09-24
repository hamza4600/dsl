// DEPENDENCIES
import _ from 'lodash';

// UTILITY FUNCTIONS

export const getCodes = object => _.filter(object).map(({ code }) => code);
export const getByCode = (collection, code) => _.find(collection, o => o.code === code) || {};
export const getByNumeric = (collection, numeric) => _.find(collection, o => o.numeric === numeric) || {};

// INVENTORY

export const INVENTORY_LOCATION = {
  sourceLocation: {
    label: 'Purchased - At Source Location',
    code: 'PSL'
  },
  inTransit: {
    label: 'Purchased - In Transit',
    code: 'PIT'
  },
  atDealership: {
    label: 'Checked In and At Dealership Location',
    code: 'CAD'
  },
  notDealership: {
    label: 'Checked In and Not At Dealership Location',
    code: 'CND'
  }
};

export const INVENTORY_SOURCE = {
  dealer: {
    label: 'Dealer DX',
    code: 'D',
  },
  manufacturer: {
    label: 'Manufacturer',
    code: 'M'
  },
  other: {
    label: 'Other',
    code: 'O'
  },
  purchase: {
    label: 'Purchase',
    code: 'P'
  },
  trade: {
    label: 'Trade',
    code: 'T'
  }
};

export const INVENTORY_STATUS = {
  preStock: {
    label: 'Pre Stock',
    code: 'PS',
    variant: 'warning'
  },
  order: {
    label: 'Order',
    code: 'O',
    variant: 'highlight'
  },
  inStock: {
    label: 'In Stock',
    code: 'I',
    variant:'secondary'
  },
  sold: {
    label: 'Sold',
    code: 'S',
    variant: 'highlight'
  },
  fallout: {
    label: 'Fallout',
    code: 'F',
    variant: 'danger'
  },
  dilivered: {
    label: 'Delivered',
    code: 'D',
    variant: 'none'
  },
  ret: {
    label: 'Retail',
    code: 'RET',
    variant: 'none'
  },
  backout: {
    label: 'Backout',
    code: 'B',
    variant: 'danger'
  }
};

export const INVENTORY_TYPE = {
  inStock: {
    label: 'In Stock',
    code: 'I'
  },
  priceAnalysis: {
    label: 'Pricing Analysis',
    code: 'A'
  },
  problems: {
    label: 'Problems',
    code: 'P'
  },
  delivered: {
    label: 'Delivered',
    code: 'D'
  },
  funded: {
    label: 'Funded',
    code: 'F'
  }
};

export const NEW_USED = {
  new: {
    label: 'New',
    code: 'N',
    numeric: 1
  },
  used: {
    label: 'Pre-Owned',
    code: 'P',
    numeric: 0
  }
};

export const RETAIL_WHOLESALE = {
  retail: {
    label: 'Retail',
    code: 'R'
  },
  wholesale: {
    label: 'Wholesale',
    code: 'W'
  }
};

export const RETAIL_LEASE = {
  R: {
    label: 'Retail',
    code: 'R'
  },
  L: {
    label: 'Lease',
    code: 'L'
  }
};

export const WARRANTY_STATUS = {
  needToDetermine: {
    label: 'Need to Determine',
    code: 'ND',
    variant: 'danger'
  },
  factory: {
    label: 'Factory Warranty',
    code: 'FW',
    variant: 'success'
  },
  cpo: {
    label: 'CPO Warranty',
    code: 'CW',
    variant: 'success'
  },
  dealer: {
    label: 'Dealer Warranty',
    code: 'DW',
    variant: 'success'
  },
  asIs: {
    label: 'As Is',
    code: 'AI',
    variant: 'success'
  },
  vip: {
    label: 'VIP Demo',
    code: 'VD',
    variant: 'success'
  }
};

export const KEY_STATUS = {
  notAvailable: {
    label: 'Not Available',
    code: 'NA',
    variant: 'danger'
  },
  sourceDetails: {
    label: 'Source Details',
    code: 'SD',
    variant: 'success'
  }
};

export const HOMENET_STATUS = {
  notAvailable: {
    label: 'Not Available',
    code: 'NA',
    variant: 'danger'
  },
  available: {
    label: 'Available',
    code: 'AV',
    variant: 'success'
  },
  Vstatus: {
    label: 'VS ',
    code: 'VS',
    variant: 'success'
  },
  SVstatus: {
    label: 'SV ',
    code: 'SV',
    variant: 'success'
  }
};
export const SPARE_KEY_STATUS = {
  customerProvide: {
    label: 'Customer to Provide',
    code: 'CP',
    variant: 'warning'
  },
  needAskCustomer: {
    label: 'Need to Ask Customer',
    code: 'AC',
    variant: 'danger'
  },
  available: {
    label: 'Available',
    code: 'AV',
    variant: 'success'
  }
};
export const EMISSION = {
  needToDetermine: {
    label: 'Need to Determine',
    code: 'ND',
    variant: 'danger'
  },
  completed: {
    label: 'Completed',
    code: 'C',
    variant: 'success'
  },
  requestPending: {
    label: 'Request / Pending',
    code: 'EM',
    variant: 'warning'
  }
};
export const DETAILS = {
  needToDetermine: {
    label: 'Need to Determine',
    code: 'ND',
    variant: 'danger'
  },
  completed: {
    label: 'Completed',
    code: 'C',
    variant: 'success'
  },
  requestDetail: {
    label: 'Request Detail',
    code: 'DT',
    variant: 'warning'
  },
  requestClean: {
    label: 'Request Clean Up',
    code: 'CU',
    variant: 'warning'
  }
};

export const INSPECTION = {
  needToDetermine: {
    label: 'Need to Determine',
    code: 'ND',
    variant: 'danger'
  },
  requestPending: {
    label: 'Request / Pending',
    code: 'IN',
    variant: 'warning'
  },
  completed: {
    label: 'Completed',
    code: 'C',
    variant: 'success'
  },
};
export const PICTURE_STATUS = {
  notAvailable: {
    label: 'Not Photo Available',
    code: 'NP',
    variant: 'danger'
  },
  available: {
    label: 'Available',
    code: 'A',
    variant: 'success'
  },
};
export const ASSIGNMENT_STATUS = {
  Completed: {
    label: 'Completed',
    code: 'C',
    variant: 'success'
  },
  Assigned: {
    label: 'Assigned',
    code: 'A',
    variant: 'warning'
  },
  Waiting: {
    label: 'Waiting',
    code: 'W',
    variant: 'danger'
  }
};

export const DEELIVEREY_LOG_TYPE = {
  Delivered: {
    label: 'Delviered',
    code: 'D',
  },
  OverView: {
    label: 'OverView',
    code: 'O',
  }
};


export const IMV_STATUS = {
  yes: {
    label: 'Yes',
    code: 'Y',
    variant: 'success'
  },
  no: {
    label: 'No',
    code: 'N',
    variant: 'danger'
  },
  notAvailable: {
    label: 'Not Available',
    code: 'N/A',
    variant: ''
  },
}

export const GLOBAL_SEARCH = {
  Delivered: {
    label: 'Delivered ',
    code: 'Delivered',
    variant: 'success'
  },
  fallout: {
    label: 'Fallout ',
    code: 'Fallout',
    variant: 'danger'
  },
  backout: {
    label: 'Backout ',
    code: 'Backout',
    variant: 'danger'
  },
  returned: {
    label: 'Returned ',
    code: 'Returned',
    variant: 'secondary'
  },
  inStock: {
    label: 'In Stock ',
    code: 'In Stock',
    variant: 'secondary'
  },
  order: {
    label: 'Order ',
    code: 'Order',
    variant: 'highlight'
  },
  preStock: {
    label: 'Pre Stock ',
    code: 'Pre Stock',
    variant: 'warning'
  },
  sold: {
    label: 'Sold ',
    code: 'Sold',
    variant: 'highlight'
  },
  WsDelivered: {
    label: 'WS Delivered ',
    code: 'WS Delivered',
    variant: 'secondary'
  },
 
 
  
}