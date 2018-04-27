import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form, Container } from 'semantic-ui-react';
import FormA from '../FormA';
import FormB from '../FormB';
import FormC from '../FormC';
import FormUser from '../FormUser';
import Submit from '../Submit';

import './styles.css';

const App = () => (
  <Container className="App">
    <h2>Progressive Form Example</h2>
    <Form>
      <FormA />
      <FormB />
      <FormUser />
      <FormC />
      <Submit />
    </Form>
    <h3>Diego Gil</h3>
  </Container>
);

export default App;
