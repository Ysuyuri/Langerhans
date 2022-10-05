/**
 * @format
 */
import { render } from '@testing-library/react'
import 'react-native';
import React from 'react';
import App from '../App';
import 'react-dom'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Login from '../src/pages/Login';
import Exames from '../src/pages/exames';

//it('renders correctly', () => {
//  renderer.create(<Exames />);
//});

test ('sum', () => {
  const { getByText } = render(<Exames />)
  expect(getByText('Arquivos')).toBeTruthy()
})