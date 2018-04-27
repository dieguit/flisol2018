import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import operations from '../operations';
import { setStepValidity, setStepValues, setStepConfirmed, setStepError } from '../actions';

function setup(state) {
  const initialState = {
    progressiveForm: {
      fields: {},
      stepValidity: {},
      stepConfirmed: {},
      stepError: {},
      submit: {},
    },
  };

  const state1 = {
    progressiveForm: {
      fields: {
        testForm01: {
          stepX: {
            someField1: 'This is a value',
            someField2: 'This is another value',
          },
        },
      },
      stepValidity: {
        testForm01: {
          stepX: true,
        },
      },
      stepConfirmed: {},
      stepError: {},
      submit: {},
    },
  };

  const update1 = {
    formId: 'testForm01',
    stepId: 'stepX',
    stepValues: {},
    fieldName: 'someField2',
    data: { value: 'New value' },
  };

  const syncValidate = () => true;

  const asyncValidate = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10);
    });
  };

  const asyncValidateFailure = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Server did not like something.'));
      }, 10);
    });
  };

  const customHandleChange = (stepValues, fieldName, event, data) => {
    return {
      someField1: 'This value always gets changed',
      [fieldName]: data.value,
    };
  };

  state = state ? state : initialState;
  const storeMock = configureStore([thunk])(state);

  return {
    storeMock,
    state1,
    update1,
    syncValidate,
    asyncValidate,
    asyncValidateFailure,
    customHandleChange,
  };
}

describe('ProgressiveForm Step Operations', async () => {
  it('should validate using sync functions', async () => {
    const { storeMock, update1, syncValidate } = setup();

    const stepUpdate = Object.assign(update1, { validate: syncValidate });

    await storeMock.dispatch(operations.updateStep(stepUpdate));
    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepValidity({ formId: 'testForm01', stepId: 'stepX', isValid: true })
      )
    );
  });

  it('should validate using async functions', async () => {
    const { storeMock, update1, asyncValidate } = setup();

    const stepUpdate = Object.assign(update1, { validate: asyncValidate });

    await storeMock.dispatch(operations.updateStep(stepUpdate));
    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepValidity({ formId: 'testForm01', stepId: 'stepX', isValid: true })
      )
    );
  });

  it('should catch and save validation erors', async () => {
    const { storeMock, update1, asyncValidateFailure } = setup();

    const stepUpdate = Object.assign(update1, { validate: asyncValidateFailure });

    await storeMock.dispatch(operations.updateStep(stepUpdate));
    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepError({
          formId: 'testForm01',
          stepId: 'stepX',
          error: 'Server did not like something.',
        })
      )
    );
  });

  it('should dispatch changes to a specific step', async () => {
    const { storeMock, update1, asyncValidate } = setup();

    const stepUpdate = Object.assign(update1, { validate: asyncValidate });

    await storeMock.dispatch(operations.updateStep(stepUpdate));

    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepValues({
          formId: 'testForm01',
          stepId: 'stepX',
          values: { someField2: 'New value' },
        })
      )
    );
  });

  it('should mutate the stepValues correctly if custom function was given', async () => {
    const { storeMock, update1, asyncValidate, customHandleChange } = setup();

    const stepUpdate = Object.assign(update1, { validate: asyncValidate, customHandleChange });

    await storeMock.dispatch(operations.updateStep(stepUpdate));

    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepValues({
          formId: 'testForm01',
          stepId: 'stepX',
          values: {
            someField1: 'This value always gets changed',
            someField2: 'New value',
          },
        })
      )
    );
  });

  it('should be able to confirm a specific step', async () => {
    const { storeMock } = setup();

    await storeMock.dispatch(operations.confirmStep({ formId: 'testForm01', stepId: 'stepX' }));
    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepConfirmed({ formId: 'testForm01', stepId: 'stepX', value: true })
      )
    );
  });

  it('should unconfirm a step when values changed', async () => {
    const { storeMock, update1, asyncValidate } = setup();

    const stepUpdate = Object.assign(update1, { validate: asyncValidate, confirm: true });

    await storeMock.dispatch(operations.updateStep(stepUpdate));
    expect(storeMock.getActions()).toContainEqual(
      expect.objectContaining(
        setStepConfirmed({ formId: 'testForm01', stepId: 'stepX', value: false })
      )
    );
  });
});
