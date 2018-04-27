import React from 'react';
import PropTypes from 'prop-types';
import { Form, Segment, Message } from 'semantic-ui-react';
import { Confirm } from '../../utils/ProgressiveForm';

const Submit = ({ error, submitting, submitResult }) => {
  return (
    <Segment>
      <h2>Step 5</h2>
      <Message hidden={error.length === 0} content={error} negative />
      <Message hidden={submitResult === null} content="Successfully submitted." positive />
      <Confirm
        isSubmit
        component={(props) => (
          <Form.Button
            positive
            icon="checkmark"
            labelPosition="right"
            type="submit"
            content="Submit"
            loading={submitting}
            disabled={submitting}
            {...props}
          />
        )}
      />
    </Segment>
  );
};

Submit.defaultProps = {
  error: '',
  submitting: false,
  submitResult: null,
};

Submit.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitResult: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Submit;
