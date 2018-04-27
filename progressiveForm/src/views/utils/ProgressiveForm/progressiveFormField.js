import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStepContext } from './StepContext';
import { progFormSelectors } from '../../../state/modules/ProgressiveForm';

export class Field extends Component {
  render() {
    const { component, name, value = '', handleChange } = this.props;

    let fieldValue = { value };
    // Assume that booleans are all checkboxes for now.
    if (typeof value === 'boolean') {
      fieldValue = { checked: value };
    }

    return component({
      ...fieldValue,
      name,
      onChange: handleChange.bind(this, name),
    });
  }
}

Field.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  component: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
  value: '',
};

const mapStateToProps = (state, props) => {
  return {
    value: progFormSelectors.getStepFieldValue(state, props),
  };
};

export default withStepContext(connect(mapStateToProps)(Field));
