import React, { useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
const Home = () => {
  const [editButton, setEditButton] = useState(false);
  function toggleEditButton() {
    setEditButton((prev) => !prev);
  }
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form />
      <Table />
    </div>
  );
};

export default Home;
