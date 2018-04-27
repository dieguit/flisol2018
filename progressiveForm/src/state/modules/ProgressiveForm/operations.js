import _ from 'lodash';
import * as actions from './actions';
import selector from './selectors';

export default {
  updateStep,
  confirmStep,
  submitForm,
};

const insertValues = (stepValues, fieldName, event, data) => {
  let fieldValue;
  // For now, handle only checkboxes and simple-valued fields.
  if (data.type === 'checkbox') {
    fieldValue = data.checked;
  } else {
    fieldValue = data.value;
  }
  return _.merge({}, stepValues, { [fieldName]: fieldValue });
};

const validateAsync = async (validate, values) => {
  // Wrap the validate function to a Promise, this will convert
  // non-async functions in instant-resolved async functions.
  return Promise.resolve(validate(values));
};

function updateStep({
  customHandleChange,
  validate,
  confirm,
  formId,
  stepId,
  stepValues,
  fieldName,
  event,
  data,
}) {
  return async (dispatch) => {
    let newStepValues = Object.assign({}, stepValues);
    // This allows custom mutations on step data before updating the state.
    if (customHandleChange) {
      newStepValues = customHandleChange(stepValues, fieldName, event, data);
    } else {
      newStepValues = insertValues(stepValues, fieldName, event, data);
    }

    dispatch(actions.setStepValues({ formId, stepId, values: newStepValues }));

    // Every time a field is changed we validate using a given validate function.
    let isValid = false;
    try {
      isValid = await validateAsync(validate, newStepValues);

      // Handle success validations that do not return a specific true value.
      if (isValid !== false) isValid = true;

      dispatch(actions.setStepError({ formId, stepId, error: null }));
    } catch (error) {
      isValid = false;
      dispatch(actions.setStepError({ formId, stepId, error: error.message }));
    }
    dispatch(actions.setStepValidity({ formId, stepId, isValid }));
    // Steps that need confirmation need to be confirmed again after changes.
    // we could change this behaviour in the future.
    if (confirm) dispatch(actions.setStepConfirmed({ formId, stepId, value: false }));
  };
}

function confirmStep({ formId, stepId }) {
  return async (dispatch) => {
    dispatch(actions.setStepConfirmed({ formId, stepId, value: true }));
  };
}

function submitForm({ formId, submitFunction, customHandleSubmit }) {
  return async (dispatch, getState) => {
    dispatch(actions.setFormSubmitting({ formId, submitting: true }));
    const state = getState();
    let formValues = selector.getFormFields(state, { formId });
    if (customHandleSubmit) formValues = customHandleSubmit(formValues);
    try {
      const submitResult = await submitFunction(formValues);
      dispatch(actions.setFormSubmitResult({ formId, submitResult }));
      dispatch(actions.setFormSubmitValues({ formId, formValues }));
      dispatch(actions.setFormSubmitError({ formId, error: null }));
      dispatch(actions.setFormSubmitting({ formId, submitting: false }));
    } catch (error) {
      dispatch(actions.setFormSubmitError({ formId, error: error.message }));
      dispatch(actions.setFormSubmitResult({ formId, submitResult: null }));
      dispatch(actions.setFormSubmitting({ formId, submitting: false }));
    }
  };
}
