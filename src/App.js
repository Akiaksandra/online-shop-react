import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/app-router';
import { Provider } from 'react-redux';
import { store } from './store';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>  
  )
}

export default App;
