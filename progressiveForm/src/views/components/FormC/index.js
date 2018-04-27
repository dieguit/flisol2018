import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { Field } from '../../utils/ProgressiveForm';

// Hardcode options for simplicity.
const cOptions = [
  {
    text: 'C1',
    value: 'C1',
  },
  {
    text: 'C2',
    value: 'C2',
  },
  {
    text: 'C3',
    value: 'C3',
  },
];

const FormC = () => (
  <Segment>
    <h2>Step 4</h2>
    <Field
      name="c1"
      component={(props) => <Form.Dropdown selection options={cOptions} {...props} />}
    />
  </Segment>
);

export default FormC;
