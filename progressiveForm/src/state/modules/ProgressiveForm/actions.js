import types from './types';

export const setFieldValue = (payload) => ({
  type: types.SET_FIELD_VALUE,
  payload,
});

export const setStepValidity = (payload) => ({
  type: types.SET_STEP_VALIDITY,
  payload,
});

export const setStepValues = (payload) => ({
  type: types.SET_STEP_VALUES,
  payload,
});

export const setStepConfirmed = (payload) => ({
  type: types.SET_STEP_CONFIRMED,
  payload,
});

export const setStepError = (payload) => ({
  type: types.SET_STEP_ERROR,
  payload,
});

export const setFormSubmitValues = (payload) => ({
  type: types.SET_FORM_SUBMIT_VALUES,
  payload,
});

export const setFormSubmitResult = (payload) => ({
  type: types.SET_FORM_SUBMIT_RESULT,
  payload,
});

export const setFormSubmitError = (payload) => ({
  type: types.SET_FORM_SUBMIT_ERROR,
  payload,
});

export const setFormSubmitting = (payload) => ({
  type: types.SET_FORM_SUBMITTING,
  payload,
});

export default {
  setFieldValue,
  setStepValidity,
  setStepValues,
  setStepConfirmed,
  setStepError,
  setFormSubmitValues,
  setFormSubmitError,
  setFormSubmitting,
};
