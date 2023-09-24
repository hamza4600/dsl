export const ENDPOINTS = {
  session: {
    getConfiguration: 'application-configuration',
    login: 'authenticate',
    logout: 'logout',
    forgotPassword: 'reset-password',
    resetPassword: 'reset-password/new-password',
    checkToken: 'reset-password/token-confirm',
    googleSso: 'google-sso',
    requestCode: 'security-code-request',
    enterCode: 'security-code-authentication',
    chooseStore: 'change-dealership',
    extendSession: 'extend-session'
  },
  lookup: {
    inventorySource: 'lookup/inventory-source/list',
    inventoryStatus: 'lookup/inventory-status/list',
    salesTypeCategory: 'lookup/sales-type-category/list',
    vehicleManagement: 'lookup/vehicle-management/list',
    vehicleMakes: 'lookup/vehicle-make/list',
    salesManagers: 'user/list-by-title',
    salesStaff: 'user/list-by-title',
    financeStaff: 'amfinance/assignment-finance-staff',
    menuCount: 'sales/menu-counts',
    inventoryLocations: '/lookup/inventory-location/list/',
    vendor: '/vendor/list',
    lender: 'lookup/amfinance-funding-sources-lender/list',
    customer: 'lookup/amfinance-funding-sources-customer/list',
    states: 'lookup/states/list',
    warrantyTypes: '/lookup/warranty-type/list'
  },
  amFinance: {
    list: 'sales/amfin',
    get: 'amfinance',
    assignment: {
      save: 'amfinance/assignment-update'
    },
    fundingSource: {
      save: salesId => `amfinance/funding-source-update/${salesId}`
    },
    products: {
      save: salesId => `sales/amfiproduct/${salesId}`,
      update: salesId => `amfinance/amfi-products-update/${salesId}`
    },
    dealDetails: {
      save: 'amfinance/deal-number-update'
    },
    checklist: {
      spotInstructions: 'amfinance/checklist-spotinstructions',
      dealCompletion: 'amfinance/checklist-dealchecklist',
      save: 'amfinance/checklist-update'
    }
  },
  dealTasks: {
    list: 'deal-tasks/list',
    complete: 'deal-tasks/completed',
    comment: {
      add: 'deal-tasks/submit-comment',
      delete: 'deal-tasks/delete-comment'
    }
  },
  inventory: {
    list: 'inventory/list',
    single: 'inventory',
    getRecord: '/inventory',
    decodeVin: '/decode-vin',
    updateAdvertisedPrice: 'inventory/update-adjusted-price',
    comments: {
      list: 'inventory-comments/list',
      add: 'inventory-comments/add',
      delete: 'inventory-comments/delete'
    },
    salesActivity: 'inventory-sales-activity',
    activityLog: 'inventory-activity',
    return: 'inventory/return-vehicle',
    ePost: 'inventory/epost',
    updateWholeSale: 'inventory/updateIsForWholeSale',
    convert: 'inventory/convert-vehicle',
    updateTracking: 'inventory/tracking',
    repair: {
      save: id => `inventory/${id}/repair-invoice`,
      upload: 'upload/inventory/repair-invoice',
      viewAttachment: (inventoryId, invoiceId) => `inventory/${inventoryId}/repair-invoice/${invoiceId}/viewattachment`,
      deleteAttachment: (inventoryId, invoiceId) => `/inventory/${inventoryId}/repair-invoice/${invoiceId}`
    },
    imvInfo: 'inventory/getInventoryIMV',
    updateAdjustedPrice: 'inventory/update-adjusted-price',
    updateWarrantyType: 'inventory/updWarrantyType'
  },
  admin: {
    amFinance: {
      products: 'admin/dealer-am-finance-product',
      lenders: 'admin/lender'
    },
    dealerSettings: 'admin/dealer-setting',
    dealerForm: {
      list: 'admin/dealer-form/list',
      single: 'admin/dealer-form'
    },
    dealerIncentive: 'dealer-incentive',
    emailSettings: {
      list: 'admin/email-setting/list',
      single: 'admin/email-setting'
    },
    inventoryPacks: {
      list: 'admin/inventory-pack/list',
      single: 'admin/inventory-pack'
    },
    dealPacks: {
      list: 'admin/deal-pack/list',
      single: 'admin/deal-pack'
    },
    dealerRebates: {
      list: 'admin/dealer-rebate/list',
      single: 'admin/dealer-rebate'
    },
    user: {
      list: 'user/list'
    },
    staff: {
      list: 'user/staff'
    }
  },
  user: {
    profile: 'user-account-update',
    password: 'user-change-password'
  },
  dailySales: {
    listByDate: 'sales-by-make-dealer-id',
    listByStockNumber: 'inventory-by-stockNo'
  },
  delivereyLog: {
    delivered: 'sales/deliverylog'
  },
  sales: {
    print: {
      buyersOrder: 'sales/print/buyers-order/',
      recap: 'sales/print/recap/',
      cleanUp: 'sales/print/request-cleanup',
      twg: 'sales/print/twg-cancellation'
    },
    list: {
      order: 'sales/order',
      fallout: 'sales/fallout'
    },
    comments: {
      list: 'sales/comments/list',
      add: 'sales/comments',
      delete: 'sales/comments'
    },
    activityLog: 'sales/activity-log/list',
    getSales: 'sales',
    single: 'sales',
    save: salesId => (salesId ? `sales/${salesId}` : 'sales')
  },
  globalSearch: {
    search: 'search'
  },
  uploads: {
    amFinance: {
      temp: 'upload/temp-sales',
      upload: 'upload/sales',
      delete: 'deleteattachment/sales',
      view: 'viewattachment/sales'
    },
    inventory: {
      temp: 'upload/temp-inventory',
      upload: 'upload/inventory',
      delete: 'deleteattachment/inventory',
      view: 'viewattachment/inventory'
    },
    sales: {
      temp: 'upload/temp-sales',
      upload: 'upload/sales',
      delete: 'deleteattachment/sales',
      view: 'viewattachment/sales',
      viewRebate: 'viewattachment/sales/rebate'
    }
  },
  print: {
    inventory: {
      vehicleInfo: 'inventory/print/vehicle-info',
      requestDetail: 'inventory/print/request-detail',
      buyersGuide: 'inventory/print/buyers-guide',
      permissionToDrive: 'inventory/print/permission-to-drive',
      requestCleanup: 'inventory/print/request-cleanup'
    }
  },
  AccountingTasks: {
    FE_gross: {
      list: '/accounting-task/fe-gross-analysis/'
    },
    BE_gross: {
      list: 'accounting-task/be-gross-analysis'
    },
    deal_count: {
      list: '/accounting-task/deal-count'
    }
  }
};
