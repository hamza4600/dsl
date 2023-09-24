import React from 'react';

// PROVIDERS
import DetailProvider from './helpers/DetailProvider';

// LOCAL COMPONENTS
import AMFinanceDetail from './parts/Detail';
import FMAssignment from './sections/fmAssignment/FMAssignment';
import FundingSource from './sections/FundingSource';
import AMFIProducts from './sections/AMFIProducts';
import DealDetails from './sections/DealDetails';
import ReviewSpotInstructions from './sections/ReviewSpotInstructions';
import DealCompletionChecklist from './sections/DealCompletionChecklist';
import ProofDMSPosting from './sections/ProofDMSPosting';
import InvoiceSA1 from './sections/InvoiceSA1';
import ExecutedDealPackageSA2 from './sections/ExecutedDealPackageSA2';
import AccountingInvoiceSA3 from './sections/AccountingInvoiceSA3';
import Other from './sections/Other';

// MAIN COMPONENT
const AMFinanceView = () => {
  return (
    <DetailProvider>
      <AMFinanceDetail>
        <FMAssignment />
        <FundingSource />
        <AMFIProducts />
        <DealDetails />
        <ReviewSpotInstructions />
        <DealCompletionChecklist />
        <InvoiceSA1 />
        <ExecutedDealPackageSA2 />
        <AccountingInvoiceSA3 />
        <ProofDMSPosting />
        <Other />
      </AMFinanceDetail>
    </DetailProvider>
  );
};

// EXPORT
export default AMFinanceView;
