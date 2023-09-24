import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { DSL_CUSTOMER_SOURCE_ID, IS_FINANCED } from '../variables';
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { RecordContext } from 'helpers/getRecordData';
import { useDetail } from '../helpers/DetailProvider';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import SaveField from '../tools/SaveField';

// MAIN COMPONENT
const FundingSourceForm = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { recordID } = useParams();
  const { record: initialValues = {}, refetchRecord } = useContext(RecordContext) || {};
  const { values = {} } = useFormikContext() || {};

  // Set completed
  useEffect(() => {
    if (!isEmpty(initialValues)) {
      const { is_financed, dsl_customer_source_id, dsl_lender_id, lender_text } = initialValues;
      let fundingSourceCompleted = false;
      if (is_financed === 'true') {
        fundingSourceCompleted = dsl_lender_id === 0 ? !!lender_text : dsl_lender_id !== -1 && !!dsl_lender_id;
      }
      if (is_financed === 'false') {
        fundingSourceCompleted = dsl_customer_source_id !== -1 && !!dsl_customer_source_id;
      }
      setCompleted('FundingSource', fundingSourceCompleted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const { is_financed: isFinancedOption, dsl_customer_source_id, dsl_lender_id, lender_text } = values;
  const [is_financed] = isArray(isFinancedOption) ? isFinancedOption : [isFinancedOption];

  return (
    <Form.Body>
      <Form.Checklist
        type="radio"
        name="is_financed"
        label="Funded By"
        options={IS_FINANCED}
        className="mt-0"
        disabled={!completed.FMAssignment}
      />
      {!isNil(is_financed) ? (
        <SaveField
          useButton
          endpoint={ENDPOINTS.amFinance.fundingSource.save(recordID)}
          params={{
            isFinanced: is_financed,
            dslCustomerSourceId: dsl_customer_source_id,
            dslLenderId: dsl_lender_id,
            lenderText: lender_text
          }}
          label="Funding Source"
          onSuccess={refetchRecord}
        >
          {is_financed === 0 ? (
            <Form.Select
              name="dsl_customer_source_id"
              label="Funding Source"
              lookup="customer"
              optionKeys={{
                label: 'customer_source_name',
                value: 'dsl_customer_source_id'
              }}
              options={DSL_CUSTOMER_SOURCE_ID}
              useBlank
              // TODO: Abstract away -1 being no value or get API to return null
              defaultValue={initialValues.dsl_customer_source_id === -1 ? '' : initialValues.dsl_customer_source_id}
            />
          ) : (
            <>
              <Form.Select
                name="dsl_lender_id"
                label="Funding Source"
                lookup="lender"
                optionKeys={{
                  label: 'lender_name',
                  value: 'dsl_lender_id'
                }}
                useBlank
                dropdown={{
                  maxHeight: '30rem'
                }}
                defaultValue={initialValues.dsl_lender_id === -1 ? '' : initialValues.dsl_lender_id}
              />
              {dsl_lender_id === 0 ? (
                <Form.Control name="lender_text" label="Lender" defaultValue={initialValues.lender_text} />
              ) : null}
            </>
          )}
        </SaveField>
      ) : null}
    </Form.Body>
  );
};

// EXPORT
export default function FundingSource(props) {
  const { completed } = useDetail();
  const { record: { is_financed, ...record } = {} } = useContext(RecordContext) || {};

  // TODO: Get api to return same type needed for update
  const initialValues = {
    ...record,
    // TODO: Get api to return boolean instead of string
    is_financed: is_financed === 'true' ? 1 : is_financed === 'false' ? 0 : !!is_financed
  };

  return (
    <Card
      number={2}
      title="Funding Source"
      completed={completed.FundingSource}
      body={
        <Form initialValues={initialValues}>
          <FundingSourceForm {...props} />
        </Form>
      }
    />
  );
}
