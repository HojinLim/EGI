import React from 'react';
import GlobalStyle from './GlobalStyle';

import Router from './shared/Router';

if (process.env.NODE_ENV === 'production') {
  const emptyFunction = () => {};

  (console as Console).log = emptyFunction;
  (console as Console).warn = emptyFunction;
  (console as Console).error = emptyFunction;
}

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
};

export default App;
