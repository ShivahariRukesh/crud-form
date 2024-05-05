import React, { useState } from "react";
import { Profile } from "./pages/Profile";
import Home from "./pages/Home";
function App() {
  const [togglePage, setTogglePage] = useState(true);
  const [editButton, setEditButton] = useState(false);
  function toggleEditButton(e) {
    setEditButton(e);
  }
  return (
    <div>
      {togglePage ? (
        <Home toggleEditButton={toggleEditButton} editButton={editButton} />
      ) : (
        <Profile />
      )}
      <br />

      {editButton ? (
        <div>Please Complete Editing First</div>
      ) : (
        <button
          onClick={() => {
            setTogglePage(!togglePage);
          }}
        >
          NextPage
        </button>
      )}
    </div>
  );
}

export default App;
