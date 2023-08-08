import React, { useState } from 'react';

import Login from '../user/Login';

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);

  const showModal = () => {
    setLoginModal(true);
  };

  return (
    <div>
      <button onClick={showModal}>Login</button>
      {loginModal && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Header;
