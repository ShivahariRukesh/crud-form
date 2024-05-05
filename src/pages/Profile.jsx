import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getFormData } from "../features/form/formSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
export const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFormData());
  }, []);

  const formData = useSelector((state) => state.form.userData);

  return (
    <div>
      <h1>Profile</h1>
      {formData.map((item, index) => (
        <Card key={index} credentials={item} />
      ))}
    </div>
  );
};
