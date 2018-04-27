import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { Field } from '../../utils/ProgressiveForm';

const FormA = () => (
  <Segment>
    <h2>Step 1</h2>
    <Field name="a1" component={(props) => <Form.Checkbox label="A1" {...props} />} />
    <Field name="a2" component={(props) => <Form.Checkbox label="A2" {...props} />} />
  </Segment>
);

export default FormA;
