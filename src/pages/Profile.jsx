import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getFormData } from "../features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";

export const Profile = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.userData);
  useEffect(() => {
    dispatch(getFormData());
  }, []);

  const storageItem = JSON.parse(localStorage.getItem("formData"));
  console.log("gg");
  useEffect(() => {
    const button = document.getElementsByClassName("login")[0];
    button.addEventListener("mouseover", () => {
      if (button.style.marginLeft === "90px") button.style.marginLeft = "0px";
      else {
        button.style.marginLeft = "90px";
      }
    });
  }, []);

  return (
    <>
      <h1>Profile</h1>
      {formData.map((item, index) => (
        <Card key={index} credentials={item} />
      ))}
      <button style={{ marginLeft: "90px" }} className="login">
        Click me
      </button>
    </>
  );
};
