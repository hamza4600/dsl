import React, { useContext, useReducer } from 'react';

export const initialState = {
  completed: {
    FMAssignment: false,
    FundingSource: false,
    AMFIProducts: false,
    DealDetails: false,
    ReviewSpotInstructions: false,
    DealCompletionChecklist: false,
    ProofDMSPosting: false,
    InvoiceSA1: false,
    ExecutedDealPackageSA2: false,
    AccountingInvoiceSA3: false,
    Other: false
  }
};

export const dealReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_COMPLETED':
      return {
        ...state,
        completed: {
          ...state.completed,
          ...payload
        }
      };
    default:
      return state;
  }
};

const DetailProvider = React.createContext(null);

export default function DealProvider({ children }) {
  const [state, dispatch] = useReducer(dealReducer, initialState);

  return (
    <DetailProvider.Provider
      value={{
        completed: state.completed,
        setCompleted: (name, completed) => {
          dispatch({ type: 'UPDATE_COMPLETED', payload: { [name]: completed } });
        }
      }}
    >
      {React.Children.only(children)}
    </DetailProvider.Provider>
  );
}

// HOOK
export const useDetail = () => useContext(DetailProvider);
