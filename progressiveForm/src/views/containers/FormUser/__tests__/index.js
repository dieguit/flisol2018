import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import FormUser from '../';

function setup() {
  const storeMock = configureStore()({
    progressiveForm: {
      fields: {
        progForm1: {
          username: {
            username: 'User007',
          },
        },
      },
      stepValidity: {
        progForm1: {
          a: true,
          b: true,
          username: true,
        },
      },
      stepConfirmed: {
        progForm1: {
          username: true,
        },
      },
      stepError: {
        progForm1: {
          username: 'That user is ugly.',
        },
      },
      submit: {},
    },
  });
  const wrapper = mount(
    <Provider store={storeMock}>
      <FormUser />
    </Provider>
  );

  return {
    wrapper,
  };
}

describe('FormUser Container', () => {
  it('should get username and error from store', () => {
    const wrapperProps = setup()
      .wrapper.find('ProgressiveForm')
      .props();

    expect(wrapperProps).toEqual(
      expect.objectContaining({
        completedSteps: ['a', 'b', 'username'],
        stepValues: { username: 'User007' },
        stepError: 'That user is ugly.',
      })
    );
  });
});
