import React from 'react';
import { progressiveFormStep } from '../../utils/ProgressiveForm';
import FormC from '../../components/FormC';

const FormCContainer = (props) => <FormC {...props} />;

const validate = (values) => (values.c1 ? true : false);

const formStep = progressiveFormStep({
  formId: 'progForm1',
  stepId: 'c',
  stepsRequired: ['a', 'b', 'username'],
  validate,
})(FormCContainer);

export default formStep;
