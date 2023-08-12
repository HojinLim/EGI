import React from 'react';

import Router from './shared/Router';

// if (process.env.NODE_ENV === 'production') {
//   const emptyFunction = () => {};

//   (console as Console).log = emptyFunction;
//   (console as Console).warn = emptyFunction;
//   (console as Console).error = emptyFunction;
// }

const App = () => {
  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
