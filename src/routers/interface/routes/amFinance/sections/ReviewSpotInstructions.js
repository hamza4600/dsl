import React, { Fragment, useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import isNil from 'lodash/isNil';
import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { useDetail } from '../helpers/DetailProvider';

// FUNCTIONS
import { apiFetch, documentFetch } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import SaveField from '../tools/SaveField';

// STYLES
import styles from './reviewSpotInstructions.module.scss';
import Preloader from 'parts/preloader/Preloader';

// FORM
const ReviewSpotInstructionsForm = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { recordID } = useParams();
  const { values, setFieldValue } = useFormikContext();

  const { spotInstructions = [], spotInstructionsCompleted } = values;

  useEffect(() => {
    setFieldValue(
      'spotInstructionsCompleted',
      (spotInstructions || []).map(s => s.is_completed)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCompleted(
      'ReviewSpotInstructions',
      (spotInstructionsCompleted || []).every(c => !isNil(c) && c !== '')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotInstructionsCompleted]);

  const handleDownload = useCallback((fileId, fileName) => {
    documentFetch({
      endpoint: `${ENDPOINTS.uploads.sales.viewRebate}/${fileId}`,
      loadingMessage: 'Downloading attachment',
      errorMessage: 'Unable to download attachment.',
      onSuccess: url => {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  }, []);

  return (
    <Form.Body>
      {spotInstructions?.length ? (
        spotInstructions.map(({ checklist_id, checklist_text, rebateAttachments }, i) => (
          <Fragment key={i}>
            <SaveField
              endpoint={ENDPOINTS.amFinance.checklist.save}
              params={v => ({
                salesId: recordID,
                checklistId: checklist_id,
                completed: v
              })}
              label="Spot Instruction"
            >
              <Form.YesNo
                name={`spotInstructionsCompleted[${i}]`}
                vertical
                label={{
                  prefix: `${i + 1}. `,
                  label: checklist_text,
                  className: styles.label
                }}
                disabled={!completed.DealDetails}
              />
            </SaveField>
            {rebateAttachments?.length ? (
              <div className="mt-n2 mb-3 ml-2">
                {rebateAttachments.map((a, j) => (
                  <div key={j} className="w-100 mb-2">
                    <Button.Link
                      label={a.rebateattachment_filename}
                      icon="document"
                      onClick={() => handleDownload(a.rebateattachment_id, a.rebateattachment_filename)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Fragment>
        ))
      ) : (
        <Form.Col className="py-5 text-center">
          <>No Spot Instructions found.</>
        </Form.Col>
      )}
    </Form.Body>
  );
};

// MAIN COMPONENT
export default function ReviewSpotInstructions(props) {
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);

  const { completed } = useDetail();
  const { recordID } = useParams();

  useEffect(() => {
    apiFetch({
      endpoint: ENDPOINTS.amFinance.checklist.spotInstructions,
      params: {
        salesId: recordID
      },
      onFetch: () => setLoading(true),
      onSuccess: data => setInitialValues({ spotInstructions: data?.result || {} }),
      onComplete: () => setLoading(false),
      errorMessage: 'Unable to get Spot Instructions.'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      number={5}
      title="Review Spot Instructions"
      completed={completed.ReviewSpotInstructions}
      body={
        <Preloader loading={loading}>
          <Form initialValues={initialValues}>
            <ReviewSpotInstructionsForm {...props} />
          </Form>
        </Preloader>
      }
    />
  );
}
