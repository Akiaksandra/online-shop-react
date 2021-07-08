import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { addDecorator } from '@storybook/react';
import '../src/App.scss';

addDecorator((story) => (
  <Provider store={store}>
    {story()}
  </Provider>
))

export const decorators = [
  (story) => (
    <Provider store={store}>
      {story()}
    </Provider>
  )
]
