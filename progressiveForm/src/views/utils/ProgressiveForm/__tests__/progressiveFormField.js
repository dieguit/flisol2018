import React from 'react';
import { mount } from 'enzyme';
import { Field } from '../progressiveFormField';

function setup(value) {
  const component = (componentProps) => {
    if (typeof value === 'boolean') return <checkbox {...componentProps} />;
    return <input {...componentProps} />;
  };

  const props = {
    name: 'fieldX',
    value,
    component,
    handleChange: () => {},
  };

  const wrapper = mount(<Field {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('ProgressiveForm Field Component', () => {
  it('should render correctly the inner component', () => {
    const { wrapper } = setup('Test Value');

    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').props().value).toBe('Test Value');
  });

  it('should handle correctly checkboxes', () => {
    const { wrapper } = setup(true);

    expect(wrapper.find('checkbox').exists()).toBe(true);
    expect(wrapper.find('checkbox').props().checked).toBe(true);
  });

  it('should update the component value when props change', async () => {
    let { wrapper } = setup('Hi, initial value here.');

    expect(wrapper.find('input').props().value).toBe('Hi, initial value here.');

    const newProps = Object.assign(wrapper.props(), { value: 'New value!' });
    wrapper.setProps(newProps);
    expect(wrapper.find('input').props().value).toBe('New value!');
  });
});
