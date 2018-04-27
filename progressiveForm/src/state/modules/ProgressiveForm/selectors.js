import { createSelector } from 'reselect';

const getFormFields = (state, props) => state.progressiveForm.fields[props.formId] || {};
const getStepFields = (state, props) => getFormFields(state, props)[props.stepId] || {};
const getStepFieldValue = (state, props) => getStepFields(state, props)[props.name];

const getFormConfirmed = (state, props) => state.progressiveForm.stepConfirmed[props.formId] || {};
const getStepConfirmed = (state, props) => getFormConfirmed(state, props)[props.stepId] || {};

const getFormValidity = (state, props) => state.progressiveForm.stepValidity[props.formId] || {};

const getCompletedSteps = createSelector(
  getFormValidity,
  getFormConfirmed,
  (validSteps, confirmedSteps) => {
    // I just wanted to make this right, if you are here to see the for loop, please check:
    //
    const completedSteps = Object.keys(validSteps).reduce((completedSteps, key) => {
      if (validSteps[key] === true && confirmedSteps[key] !== false)
        return [key, ...completedSteps];
      return completedSteps;
    }, []);
    return completedSteps;
  }
);

const getFormError = (state, props) => state.progressiveForm.stepError[props.formId] || {};
const getStepError = (state, props) => getFormError(state, props)[props.stepId] || '';

const getFormSubmit = (state, props) => state.progressiveForm.submit[props.formId] || {};
const getFormSubmitError = (state, props) => getFormSubmit(state, props).error || '';
const getFormSubmitting = (state, props) => getFormSubmit(state, props).submitting || null;
const getFormSubmitResult = (state, props) => getFormSubmit(state, props).submitResult || null;

export default {
  getFormFields,
  getStepFields,
  getStepFieldValue,
  getStepConfirmed,
  getStepError,
  getCompletedSteps,
  getFormSubmitError,
  getFormSubmitting,
  getFormSubmitResult,
};
