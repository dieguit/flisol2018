import Enzyme from 'enzyme';
// Quick fix @SEE: https://github.com/airbnb/enzyme/issues/1509
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from './ReactSixteenAdapter';

Enzyme.configure({ adapter: new Adapter() });
