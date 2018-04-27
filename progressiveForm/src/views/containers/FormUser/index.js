import React from 'react';
import { progressiveFormStep } from '../../utils/ProgressiveForm';
import FormUser from '../../components/FormUser';
import { validate } from '../../utils/api';

const FormUserContainer = (props) => <FormUser {...props} />;

const validateAsync = (values) => {
  return validate(values.username);
};

const formStep = progressiveFormStep({
  formId: 'progForm1',
  stepId: 'username',
  stepsRequired: ['a', 'b'],
  validate: validateAsync,
  confirm: true,
})(FormUserContainer);

export default formStep;
