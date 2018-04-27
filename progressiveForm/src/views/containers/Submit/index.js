import React from 'react';
import { connect } from 'react-redux';
import { progFormSelectors } from '../../../state/modules/ProgressiveForm';
import { progressiveFormStep } from '../../utils/ProgressiveForm';
import Submit from '../../components/Submit';
import { submit } from '../../utils/api';

const SubmitContainer = (props) => <Submit {...props} />;

const customHandleSubmit = (values) => {
  // Set initial values.
  let newValues = {
    a: [],
    b: '',
    username: values.username.username,
    c: values.c.c1,
  };

  // Add checked A values.
  if (values.a.a1) newValues.a.push('A1');
  if (values.a.a2) newValues.a.push('A2');
  // Add B value.
  if (values.b.b1) newValues.b = 'B1';
  if (values.b.b2) newValues.b = 'B2';

  return newValues;
};

const FORM_ID = 'progForm1';
const formStep = progressiveFormStep({
  formId: FORM_ID,
  stepId: 'submit',
  stepsRequired: ['a', 'b', 'username', 'c'],
  submitFunction: submit,
  customHandleSubmit,
})(SubmitContainer);

const mapStateToProps = (state) => ({
  submitResult: progFormSelectors.getFormSubmitResult(state, { formId: FORM_ID }),
  submitting: progFormSelectors.getFormSubmitting(state, { formId: FORM_ID }),
  error: progFormSelectors.getFormSubmitError(state, { formId: FORM_ID }),
});

export default connect(mapStateToProps)(formStep);
