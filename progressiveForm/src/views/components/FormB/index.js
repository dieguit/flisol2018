import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { Field } from '../../utils/ProgressiveForm';

const FormB = () => (
  <Segment>
    <h2>Step 2</h2>
    <Field name="b1" component={(props) => <Form.Checkbox slider label="B1" {...props} />} />
    <Field name="b2" component={(props) => <Form.Checkbox slider label="B2" {...props} />} />
  </Segment>
);

export default FormB;
