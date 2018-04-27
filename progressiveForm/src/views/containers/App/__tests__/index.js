import React from 'react';
import { shallow } from 'enzyme';
import App from '../index';

function setup() {
  const wrapper = shallow(<App />);

  return {
    wrapper,
  };
}

describe('App', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h2').text()).toEqual('Housing Anywhere Challenge');
    expect(wrapper.find('h3').text()).toEqual('Diego Gil');
  });
});
