import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import { createReduxStore } from './utils/createReduxStore';
import GlobalStyle from './components/GlobalStyle';
import App from './App';

const store = createReduxStore();

ReactDOM.render(
  <>
    <GlobalStyle />
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </>,
  document.getElementById('root')
);
