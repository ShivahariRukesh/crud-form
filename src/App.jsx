import React, { useState } from "react";
import { Profile } from "./pages/Profile";
import Home from "./pages/Home";
function App() {
  const [togglePage, setTogglePage] = useState(true);
  return (
    <div>
      {togglePage ? <Home /> : <Profile />}
      <br />
      <button
        onClick={() => {
          setTogglePage(!togglePage);
        }}
      >
        NextPage
      </button>
    </div>
  );
}

export default App;
