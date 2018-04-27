import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StepContext } from './StepContext';
import { progFormOperations, progFormSelectors } from '../../../state/modules/ProgressiveForm';

const progressiveFormStep = ({
  formId,
  stepId,
  validate,
  customHandleChange,
  customHandleSubmit,
  submitFunction,
  stepsRequired = [],
  confirm = false,
}) => {
  return (WrappedComponent) => {
    class ProgressiveForm extends Component {
      async handleChange(fieldName, event, data = null) {
        const { stepValues, updateStep } = this.props;
        updateStep({
          customHandleChange,
          validate,
          confirm,
          formId,
          stepId,
          stepValues,
          fieldName,
          event,
          data,
        });
      }

      async handleClick(isSubmit) {
        const { confirmStep, submitForm } = this.props;
        confirmStep({ formId, stepId, value: true });
        if (isSubmit) submitForm({ submitFunction, customHandleSubmit, formId });
      }

      render() {
        const { completedSteps, ...otherProps } = this.props;
        const isVisible = !stepsRequired.some((val) => completedSteps.indexOf(val) === -1);
        if (!isVisible) return null;

        return (
          <StepContext.Provider
            value={{
              formId,
              stepId,
              handleChange: this.handleChange.bind(this),
              handleClick: this.handleClick.bind(this),
            }}
          >
            <WrappedComponent {...otherProps} />
          </StepContext.Provider>
        );
      }
    }

    ProgressiveForm.propTypes = {
      completedSteps: PropTypes.arrayOf(PropTypes.string),
    };

    ProgressiveForm.defaultProps = {
      completedSteps: [],
    };

    const mapStateToProps = (state) => {
      return {
        completedSteps: progFormSelectors.getCompletedSteps(state, { formId }),
        stepValues: progFormSelectors.getStepFields(state, { formId, stepId }),
        stepError: progFormSelectors.getStepError(state, { formId, stepId }),
      };
    };

    return connect(mapStateToProps, {
      updateStep: progFormOperations.updateStep,
      confirmStep: progFormOperations.confirmStep,
      submitForm: progFormOperations.submitForm,
    })(ProgressiveForm);
  };
};

export default progressiveFormStep;
