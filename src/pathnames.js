//PATHNAMES
export const AUTHENTICATION = {
  login:          'login',
  loginVerify:    'login-verify',
  forgotPassword: 'forgot-password',
  forgotPasswordSent: 'forgot-password-sent',
  resetPassword: 'reset-password/:tokenId',
  resetPasswordExpired: 'reset-password-expired',
  resetPasswordSuccess:'reset-password-success',
  chooseStore:    'choose-store',
  requestCode:    'request-code',
  enterCode:      'enter-code',
  terms:          'terms-and-conditions',
  privacy:        'privacy-policy'
}

export const INTERFACE = {
  // MAIN MENU
  accountingTasks: 'accounting-tasks',
  amFinance:       'am-finance',
  dailySales:      'daily-sales',
  dashboard:       'dashboard',
  dealTasks:       'deal-tasks',
  deliveryLog:     'delivery-log',
  sales:           'sales',
  fallout:         'fallout',
  forms:           'forms',
  inventory:       'inventory',
  order:           'order',
  settings:        'settings',
  results:         'results',
  // OTHER
  notifications:   'notifications'
}

export const SALES = {
  view:            'view'
}

export const DELIVERY_LOG = {
  overview:    'overview',
  delivered:   'delivered',
  rebilled:    'rebilled',
  dealPosting: 'deal-posting',
  funded:      'funded'
}

export const ACCOUNTING_TASKS = {
  dealCount: 'deal-count',
  frontend:  'frontend-gross-analysis',
  backend:   'backend-gross-analysis'
}

export const INVENTORY = {
  inStock:       'in-stock',
  priceAnalysis: 'price-analysis',
  problems:      'problems',
  delivered:     'delivered',
  funded:        'funded'
}

export const SETTINGS = {
  amFinance:        'am-finance',
  dealerSettings:   'dealer-settings',
  emailSettings:    'email-settings',
  inventoryPacks:   'inventory-packs',
  dealPacks:        'deal-packs',
  customerRebates:  'customer-rebates',
  dealerForms:      'dealer-forms',
  dealerIncentives: 'dealer-incentives',
  spotInstructions: 'spot-instructions',
  reports:          'reports',
  dynamicForms:     'dynamic-forms',
  staff:            'staff',
  users:            'users'
}

export const AM_FINANCE = {
  products: 'products',
  lenders:  'lenders'
}

export const REPORTS = {
  reports:      'reports',
  categories:   'categories',
  emailReports: 'email-reports'
}

export const USER = {
  emailSettings: 'email-settings',
  profile:       'profile'
}
