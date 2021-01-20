import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});
