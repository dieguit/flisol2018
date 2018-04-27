import React from 'react';
import { progressiveFormStep } from '../../utils/ProgressiveForm';
import FormA from '../../components/FormA';

const FormAContainer = (props) => <FormA {...props} />;

const validate = (values) => values.a1 === true || values.a2 === true;

const formStep = progressiveFormStep({
  formId: 'progForm1',
  stepId: 'a',
  validate,
})(FormAContainer);

export default formStep;
