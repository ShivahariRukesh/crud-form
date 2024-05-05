import React, { useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
const Home = ({ toggleEditButton, editButton }) => {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form toggleEditButton={toggleEditButton} editButton={editButton} />
      <Table toggleEditButton={toggleEditButton} editButton={editButton} />
    </div>
  );
};

export default Home;
