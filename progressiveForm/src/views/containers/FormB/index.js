import React from 'react';
import { progressiveFormStep } from '../../utils/ProgressiveForm';
import FormB from '../../components/FormB';

const FormBContainer = (props) => <FormB {...props} />;

const validate = (values) => values.b1 || values.b2;

const customHandleChange = (stepValues, fieldName, event, data) => {
  // Implementation of the handleChange hook, this provides all fields for
  // this step and allows user to have full control of the final step values.
  // Check if we changed b1, set the value and set b2 as the opposite.
  if (fieldName === 'b1') return { b1: data.checked, b2: stepValues.b2 && !data.checked };
  return { b2: data.checked, b1: stepValues.b1 && !data.checked };
};

const formStep = progressiveFormStep({
  formId: 'progForm1',
  stepId: 'b',
  stepsRequired: ['a'],
  validate,
  customHandleChange,
})(FormBContainer);

export default formStep;
