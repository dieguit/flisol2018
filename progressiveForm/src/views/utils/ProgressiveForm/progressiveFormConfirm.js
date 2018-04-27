import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStepContext } from './StepContext';

class Confirm extends Component {
  render() {
    const { component, handleClick, isSubmit = false } = this.props;

    return component({
      onClick: handleClick.bind(this, isSubmit),
    });
  }
}

Confirm.propTypes = {
  isSubmit: PropTypes.bool,
  component: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  isSubmit: false,
};

export default withStepContext(Confirm);
