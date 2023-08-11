import React from 'react';
import GlobalStyle from './GlobalStyle';

import Router from './shared/Router';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
};

export default App;
