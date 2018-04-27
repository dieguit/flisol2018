import React from 'react';
import PropTypes from 'prop-types';
import { Form, Segment, Message } from 'semantic-ui-react';
import { Field, Confirm } from '../../utils/ProgressiveForm';

const FormUser = ({ stepError, stepValues: { username } }) => {
  const isConfirmDisabled = () => stepError.length > 0 || !username || username.length === 0;
  return (
    <Segment>
      <h2>Step 3</h2>
      <Message hidden={stepError.length === 0} content={stepError} negative />
      <Field name="username" component={(props) => <Form.Input label="User" {...props} />} />
      <Confirm
        component={(props) => (
          <Form.Button primary disabled={isConfirmDisabled()} content="Confirm" {...props} />
        )}
      />
    </Segment>
  );
};

FormUser.defaultProps = {
  stepError: '',
  stepValues: {},
};

FormUser.propTypes = {
  stepError: PropTypes.string,
  stepValues: PropTypes.shape({
    username: PropTypes.string,
  }),
};

export default FormUser;
