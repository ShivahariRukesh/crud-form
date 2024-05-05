import React, { useState } from "react";
import { Profile } from "./pages/Profile";
import Home from "./pages/Home";
import "./App.css";
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

      <div>
        {editButton ? (
          <div>Please Complete Editing First</div>
        ) : (
          <button
            onClick={() => {
              setTogglePage(!togglePage);
            }}
          >
            {togglePage ? "Go to Profile " : "Go To Home"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
