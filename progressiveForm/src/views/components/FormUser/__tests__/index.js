import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import FormUser from '../index';

jest.mock('../../../utils/ProgressiveForm/progressiveFormField', () => 'MockField');
jest.mock('../../../utils/ProgressiveForm/progressiveFormConfirm', () => 'MockConfirm');

function setup() {
  const props = {
    stepError: 'This is an error',
    stepValues: { username: 'User007' },
  };
  const wrapper = shallow(<FormUser {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('FormUser Component', () => {
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<FormUser />);
    expect(result).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h2').text()).toEqual('Step 3');

    const MessageProps = wrapper.find('Message').props();
    expect(MessageProps.hidden).toBe(false);
    expect(MessageProps.content).toEqual('This is an error');

    expect(wrapper.find('MockField').exists()).toBe(true);
    expect(wrapper.find('MockConfirm').exists()).toBe(true);
  });
});

jest.unmock('../../../utils/ProgressiveForm/progressiveFormField', () => 'MockField');
jest.unmock('../../../utils/ProgressiveForm/progressiveFormConfirm', () => 'MockConfirm');
