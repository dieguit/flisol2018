import { combineReducers } from 'redux';
import _ from 'lodash';
import types from './types';

const fields = (state = {}, action) => {
  switch (action.type) {
    case types.SET_FIELD_VALUE: {
      const { formId, stepId, name, value } = action.payload;
      return _.merge({}, state, {
        [formId]: {
          [stepId]: { [name]: value },
        },
      });
    }
    case types.SET_STEP_VALUES: {
      const { formId, stepId, values } = action.payload;
      return _.merge({}, state, {
        [formId]: { [stepId]: values },
      });
    }
    default:
      return state;
  }
};

const stepValidity = (state = {}, action) => {
  switch (action.type) {
    case types.SET_STEP_VALIDITY: {
      const { formId, stepId, isValid } = action.payload;
      return _.merge({}, state, { [formId]: { [stepId]: isValid } });
    }
    default:
      return state;
  }
};

const stepConfirmed = (state = {}, action) => {
  switch (action.type) {
    case types.SET_STEP_CONFIRMED: {
      const { formId, stepId, value } = action.payload;
      return _.merge({}, state, { [formId]: { [stepId]: value } });
    }
    default:
      return state;
  }
};

const stepError = (state = {}, action) => {
  switch (action.type) {
    case types.SET_STEP_ERROR: {
      const { formId, stepId, error } = action.payload;
      return _.merge({}, state, { [formId]: { [stepId]: error } });
    }
    default:
      return state;
  }
};

const submit = (state = {}, action) => {
  switch (action.type) {
    case types.SET_FORM_SUBMIT_VALUES: {
      const { formId, formValues } = action.payload;
      return _.merge({}, state, { [formId]: { formValues } });
    }
    case types.SET_FORM_SUBMIT_RESULT: {
      const { formId, submitResult } = action.payload;
      return _.merge({}, state, { [formId]: { submitResult } });
    }
    case types.SET_FORM_SUBMIT_ERROR: {
      const { formId, error } = action.payload;
      return _.merge({}, state, { [formId]: { error } });
    }
    case types.SET_FORM_SUBMITTING: {
      const { formId, submitting } = action.payload;
      return _.merge({}, state, { [formId]: { submitting } });
    }
    default:
      return state;
  }
};

const progFormReducer = combineReducers({
  fields,
  stepValidity,
  stepConfirmed,
  stepError,
  submit,
});
export default progFormReducer;
