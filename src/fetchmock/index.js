import fetchMock from 'fetch-mock';

// GLOBAL VARIABLES
import { INVENTORY_LOCATION, INVENTORY_SOURCE, INVENTORY_STATUS, NEW_USED, RETAIL_LEASE, RETAIL_WHOLESALE, WARRANTY_STATUS } from 'codes.js';
import { ENDPOINTS } from 'endpoints.js';
import { IMV_LABELS } from 'globals.js';

// LOCAL VARIABLES
import { OPTIONS, USER, VEHICLE_MANAGEMENT } from './variables.js';

// LOCAL FUNCTIONS
import { bodyParams, failure, getRandom, listData, makeURL, random, success, tokenExp, urlParams, vehicleManagmentID } from './functions.js';

// ENDPOINTS
fetchMock

  /****************************************************************************/
  /* SESSION
  /****************************************************************************/

  // CONFIGURATION
  .get(makeURL(ENDPOINTS.session.getConfiguration), success({
    version: "2.0.0",
    two_step_verification: false
  }), OPTIONS)

  // LOGIN
  .post(makeURL(ENDPOINTS.session.login), (url, { body }) => {
    const { username, password } = bodyParams(body);
    return username !== 'hsmith' || password !== 'foobar' ? failure({
      message: "Invalid username or password."
    }) : success({
      token: "eyJ0eXAi...",
      token_exp: tokenExp(),
      result: USER
    })
  }, OPTIONS)

  // LOGOUT
  .get(makeURL(ENDPOINTS.session.logout), success({
    message: "Logged out successfully."
  }), OPTIONS)

  // REQUEST PASSWORD
  .post(makeURL(ENDPOINTS.session.forgotPassword), success(), OPTIONS)

  // REQUEST SECURITY CODE
  .post(makeURL(ENDPOINTS.session.requestCode), success(), OPTIONS)

  // ENTER SECURITY CODE
  .post(makeURL(ENDPOINTS.session.enterCode), success(), OPTIONS)

  // CHOOSE STORE
  .post(makeURL(ENDPOINTS.session.chooseStore), (url, { body }) => {
    const { make_dealer_id } = JSON.parse(body);
    return success({
      make_dealer_id,
      token: "eyJ0eXAi...",
      token_exp: tokenExp(),
      result: {
        ...USER,
        make_dealer_id
      }
    })
  }, OPTIONS)

  // EXTEND SESSION
  .post(makeURL(ENDPOINTS.session.extendSession), success({
    token_exp: tokenExp()
  }), OPTIONS)

  /****************************************************************************/
  /* LOOKUPS
  /****************************************************************************/

  .get(makeURL(ENDPOINTS.lookup.inventorySource), [
    {
      inventory_source_id: "1",
      inventory_source_code: "MANUFACT",
      inventory_source: "Manufacturer"
    },
    {
      inventory_source_id: "2",
      inventory_source_code: "RETAILER",
      inventory_source: "Retailer"
    },
    {
      inventory_source_id: "3",
      inventory_source_code: "AUCTION0",
      inventory_source: "Auction"
    }
  ], OPTIONS)
  .get(makeURL(ENDPOINTS.lookup.inventoryStatus), [
    {
      inventory_status_id: "1",
      status_code: "I",
      status_name: "In Stock"
    },
    {
      inventory_status_id: "2",
      status_code: "O",
      status_name: "Out of Stock"
    },
  ], OPTIONS)
  .get(makeURL(ENDPOINTS.lookup.vehicleManagement), VEHICLE_MANAGEMENT, OPTIONS)

  /****************************************************************************/
  /* DEAL TASKS
  /****************************************************************************/

  // LIST
  .get(`begin:${makeURL(ENDPOINTS.dealTasks.list)}`, url => {
    const { start_row = 0, num_rows = 50 } = urlParams(url);
    const startDate = random.date({ years: 0, months: -3 });
    return success({
      message: '',
      total_records: '97',
      startRow: start_row,
      result: listData(() => ({
        sales_id: 2345,
        delivered_date: random.date({ startDate, months: -5 }),
        delivered_age: random.number(1, 12),
        customer_name: random.name(),
        sale_type: random.code(RETAIL_LEASE),
        stock_num: random.alphanumeric(7),
        age: random.number(1, 12),
        front_end_gross: random.number(-10000, 10000),
        am_gross: random.number(-10000, 10000),
        fi_gross: random.number(-10000, 10000),
        total_gross: random.number(-10000, 10000),
        salesperson: random.name(),
        fm_manager: random.name(),
        tasks: listData(() => ({
          task_id: random.number(100, 999),
          task_age: random.number(1, 12),
          task_created_date: random.date({ startDate, weeks: -6 }),
          task_created_by: random.name(),
          comments: "Lorem ipsum dolor sit amet, consectetuer ad..."
        }), random.number(0, 5)),
        trades: listData(() => ({
          daily_sales_inventory_id: random.number(1000, 9999),
          vehicle: random.vehicle(),
          trade_in_allowance: random.number(500, 30000),
          stock_num: random.alphanumeric(7)
        }), random.number(0, 5))
      }), Math.min(num_rows, 97 - start_row))
    })
  }, OPTIONS)

  /****************************************************************************/
  /* INVENTORY
  /****************************************************************************/

  // LIST
  .get(`begin:${makeURL(ENDPOINTS.inventory.list)}`, url => {
    const { start_row = 0, num_rows = 50 } = urlParams(url);
    const startDate = random.date({ years: 0, months: -3 });
    return success({
      message: '',
      total_records: '143',
      retail_records: '92',
      wholesale_records: '51',
      new_records: '75',
      preowned_records: '68',
      startRow: start_row,
      result: listData(() => ({
        sales_id: 2345,
        purchased_date: random.date({ startDate, years: -5 }),
        delivered_date: startDate,
        funded_date: random.date({ startDate, months: 2 }),
        stock_num: random.alphanumeric(7),
        make_model: random.vehicle(),
        mileage: random.number(100, 100000),
        sale_type: random.code(RETAIL_WHOLESALE),
        new_used: random.code(NEW_USED),
        inventory_age: random.number(1, 12),
        inventory_source: random.code(INVENTORY_SOURCE),
        inventory_status: random.code(INVENTORY_STATUS),
        inventory_location: random.code(INVENTORY_LOCATION),
        acv: random.number(5000, 20000),
        dms_invoice: 5000.00,
        advertised_price: 5500.00,
        adjusted_price: undefined,
        imv_label: getRandom(IMV_LABELS),
        imv_price: 5750.00,
        imv_difference: -250.00,
        imv_updated: random.date({ startDate, months: 2 }),
        warranty: random.code(WARRANTY_STATUS),
        key: vehicleManagmentID(2),
        spare_key: vehicleManagmentID(3),
        homenet: vehicleManagmentID(4),
        detail: vehicleManagmentID(6),
        inspection: vehicleManagmentID(7),
        emission: vehicleManagmentID(8),
        picture: vehicleManagmentID(9),
        miscellaneous: vehicleManagmentID(10, true)
      }), Math.min(num_rows, 173 - start_row))
    })
  }, OPTIONS)

  /****************************************************************************/
  /* SETTINGS - USER
  /****************************************************************************/

  // DEALER AM/FINANCE
  .get(`begin:${makeURL(ENDPOINTS.admin.dealerAMFinanceProduct)}`, url => {
    const product = n => i => ({
      dealer_amfinance_id: n + i,
      product_title: random.array('Tire and Wheel', 'Resource Dent', 'Resource Key Replacement', 'Term Care', 'Reserve'),
      product_description: 'Dealer Product description...',
      product_type: random.array('F & I', 'AM'),
      product_code: random.alphanumeric(7),
      new_used: random.code(NEW_USED),
      is_active: random.array('Yes', 'No'),
      sort_order: 70 - n - i,
      updated_on: random.date({ years: -3 }),
      updated_by: random.name()
    })
    return success({
    	message: '',
    	result: [
        {
          sale_type_category_id: 0,
          sale_type_category: 'DX',
          products: listData(product(), 12)
        },
        {
          sale_type_category_id: 1,
          sale_type_category: 'Retail',
          products: listData(product(12), 31)
        },
        {
          sale_type_category_id: 2,
          sale_type_category: 'Wholesale',
          products: listData(product(43), 27)
        },
      ]
    })
  }, OPTIONS)

  // LIST
  .get(`begin:${makeURL(ENDPOINTS.admin.user.list)}`, url => {
    const { start_row = 0, num_rows = 50 } = urlParams(url);
    return success({
    	message: '',
    	total_records: '73',
    	startRow: start_row,
    	result: listData(() => {
        const first = random.first();
        const last = random.last();
        return ({
          created_by: random.name(),
          active_flag: random.number(0, 1),
          created_date: random.date( {months: - 24 }),
          site_user_id: random.number(20, 300),
          site_role_id: random.number(1, 4),
          last_name: last,
          dealerid: random.number(1, 20),
          first_name: first,
          cell_phone_number: random.tel(),
          make_dealer_id: random.number(1, 30),
          email_address: `${first.toLowerCase()}.${last.toLowerCase()}@genevamedia.com`,
          username: `${first.toLowerCase().charAt(0)}${last.toLowerCase()}`,
          access_level: 'W',
          org_title_id: random.number(1, 30),
          sales_dept_type_id: random.number(1, 30)
        })
      }, Math.min(num_rows, 53 - start_row))
    })
  }, OPTIONS)

  /****************************************************************************/
  /* AM Finance PRODUCTS
  /****************************************************************************/

  // LIST
  .get(`begin:${makeURL(ENDPOINTS.admin.dealerAMFinanceProduct, 'list')}`, url => {
    const startDate = random.date({ years: 0, months: -3 });
    return success({
    	message: '',
    	result: listData(() => ({
        sale_type_category_id: random.number(1, 3),
        sale_type_category: random.saleType(),
        products: listData(() => ({
          dealer_amfinance_id: 2,
          product_title: random.letter(10),
          product_description: random.letter(20),
          product_type: random.select(['AM', 'F & I']),
          product_code: random.letter(7),
          new_used: random.select(['N', 'P']),
          is_active: random.select(['Yes', 'No']),
          sort_order: random.number(1, 5),
          updated_on: random.date({ startDate, years: -5 }),
          updated_by: random.name(),
        }), 20)
      }), 3)
    })
  }, OPTIONS)

  /****************************************************************************/
  /* AM Finance LENDERS
  /****************************************************************************/

  // LIST
  .get(`begin:${makeURL(ENDPOINTS.admin.amFinance.lenders, 'list')}`, url => {
    const startDate = random.date({ years: 0, months: -3 });
    return success({
    	message: '',
    	result: listData(() => ({
        dsl_lender_id: 31,
        updated_by: random.name(),
        lender_name: random.name(),
        is_active: random.select([0, 1]),
        updated_on: random.date({ startDate, years: -5 }),
        created_by_site_user_id: '',
        updated_by_site_user_id: ''
      }), 3)
    })
  }, OPTIONS)
