// SESSION

export const configuration = (state = null, { type, ...action }) => {
  switch (type) {
    case 'SET_CONFIGURATION':
      return { ...action.configuration };
    case 'CLEAR_CONFIGURATION':
      return null;
    default:
      return state;
  }
};

export const user = (state = {}, { type, ...action }) => {
  switch (type) {
    case 'LOGIN_USER':
      return { ...action.result };
    case 'SET_VERIFICATION':
      return {
        ...state,
        verified: action.verified,
      };
    case 'SET_STORE':
      return {
        ...state,
        ...action.result,
      };
    default:
      return state;
  }
};

export const token = (state = null, { type, ...action }) => {
  switch (type) {
    case 'LOGIN_USER':
      return action.token;
    case 'SET_STORE':
      return action.token;
    default:
      return state;
  }
};

export const tokenExp = (state = null, { type, ...action }) => {
  switch (type) {
    case 'LOGIN_USER':
      return action.token_exp;
    case 'SET_STORE':
      return action.token_exp;
    case 'EXTEND_SESSION':
      return action.token_exp;
    default:
      return state;
  }
};

export const dealership = (state = null, { type, ...action }) => {
  switch (type) {
    case 'LOGIN_USER':
      if (action.result.stores.length > 1) return null;
      else return action.result.make_dealer_id;
    case 'SET_STORE':
      return action.make_dealer_id;
    default:
      return state;
  }
};

export const csrfTokens = (state = null, action) => {
  switch (action.type) {
    case 'SET_CSRF_TOKENS':
      return { ...action.crsfTokens };
    case 'CLEAR_CSRF_TOKENS':
      return null;
    default:
      return state;
  }
};

// INTERFACE

export const mobile = (state = false, { type, ...action }) => {
  switch (type) {
    case 'SET_SCREEN_SIZE':
      return {mobile :action.isMobile,
              isTab: action.isTab};
    default:
      return state;
  }
};
export const alerts = (state = [], { type, ...action }) => {
  let newState = [...state];

  switch (type) {
    case 'ADD_ALERTS':
      newState.unshift(...action.alerts);
      return newState;
    case 'REMOVE_ALERT':
      newState.splice(
        newState.findIndex((alert) => alert.ID === action.alertID),
        1
      );
      return newState;
    case 'CLEAR_ALERTS':
      newState = Array.isArray(action.alerts) ? [...action.alerts] : [];
      return newState;
    case 'LOGIN_USER':
      return [];
    default:
      return state;
  }
};

export const modals = (state = [], { type, ...action }) => {
  const newState = [...state];

  switch (type) {
    case 'ADD_MODAL':
      const insertionPoint = newState.findIndex(
        modal => modal.priority < action.modal.priority
      );
      insertionPoint === -1
        ? newState.push(action.modal)
        : newState.splice(insertionPoint, 0, action.modal);
      return newState;
    case 'REMOVE_MODAL':
      const modalIndex = newState.findIndex(
        modal => modal.ID === action.modalID
      );
      modalIndex === 0
        ? newState[modalIndex].close = true
        : newState.splice(modalIndex, 1);
      return newState;
    case 'INCREMENT_MODAL':
      newState.shift();
      return newState;
    case 'CLEAR_MODALS':
      return [];
    default:
      return state;
  }
};

export const sidebar = function(state = {}, { type, sidebarName, toggleState = !state[sidebarName] }) {
  switch(type) {
    case 'TOGGLE_SIDEBAR':
      return sidebarName ? {
        [sidebarName]: toggleState
      } : {}
    default:
      return state;
  }
}

// DATA/SETTINGS

export const preferences = (state = {}, { type, key, setting }) => {
  switch (type) {
    case 'SET_PREFERENCE':
      return {
        ...state,
        [key]: setting
      };
    case 'UPDATE_PREFERENCE':
      return {
        ...state,
        [key]: Object.assign({}, state[key], setting)
      };
    case 'CLEAR_PREFERENCE':
      return {
        ...state,
        [key]: undefined
      };
    default:
      return state;
  }
};

export const lookups = (state = {}, { type, ...action }) => {
  const { key, payload = [] } = action;
  switch (type) {
    case 'INIT_LOOKUP':
      return {
        ...state,
        [key]: undefined,
      };
    case 'LOAD_LOOKUP':
      return {
        ...state,
        [key]: Array.isArray(payload) ? [...payload] : { ...payload },
      };
    case 'LOOKUP_ERROR':
      return {
        ...state,
        [key]: new Error(),
      };
    case 'FLUSH_LOOKUP':
      const newState = { ...state };
      delete newState[key];
      return newState;
    default:
      return state;
  }
};
