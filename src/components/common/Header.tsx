import React, { useState } from 'react';

import Login from '../user/Login';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={showModal}>Login</button>
      {modalOpen && <Login setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Header;
