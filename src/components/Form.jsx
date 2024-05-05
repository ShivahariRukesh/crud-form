import React, { useState, useEffect } from "react";
import "./Form.css";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChange,
  submitFormData,
  editFormData,
} from "../features/form/formSlice";
import { validateEmptyValue, validateInput } from "../functions";
const Form = (props) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.attributes);

  const [countries, setCountries] = useState([]);
  const [validate, setValidate] = useState({
    name: undefined,
    email: undefined,
    phoneNumber: undefined,
    emptyValue: undefined,
  });

  useEffect(() => {
    if (props.editButton) {
      setValidate((prev) => {
        return {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          emptyValue: false,
        };
      });
    }
  }, [props.editButton]);
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        var countryName = [];
        for (var i = 0; i < data.length; ++i)
          countryName = [...countryName, data[i].name.common];
        setCountries(countryName.sort());
      } catch (err) {
        console.log(err);
      }
    }
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let file;
    if (files) {
      file = URL.createObjectURL(files[0]);
    }

    dispatch(inputChange({ name, value, file }));

    if (name === "email" || name === "phoneNumber" || name === "name") {
      let val = validateInput(name, value);

      setValidate((prev) => {
        return { ...prev, [name]: val };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emptyFieldValidation = validateEmptyValue(formData);

    setValidate((prev) => {
      return { ...prev, emptyValue: emptyFieldValidation };
    });

    if (
      validate.name &&
      validate.email &&
      validate.phoneNumber &&
      !emptyFieldValidation
    ) {
      dispatch(submitFormData(formData));
      console.log(formData);
    }
  };

  function handleEdit(e) {
    e.preventDefault();
    console.log("FormData", formData);

    let emptyFieldValidation = validateEmptyValue(formData);
    setValidate((prev) => {
      return { ...prev, emptyValue: emptyFieldValidation };
    });
    console.log(validate);
    if (
      validate.name &&
      validate.email &&
      validate.phoneNumber &&
      !emptyFieldValidation
    ) {
      dispatch(editFormData(formData));
      props.toggleEditButton(false);
    }
  }
  return (
    <div className="Form">
      <form>
        <h1>Registration Form</h1>
        <br />
        <h5>
          <center>{"( * ) Symbol means compulsory"} </center>
        </h5>
        <label>Name*</label>
        {validate.name === undefined || validate.name
          ? ""
          : "Enter a valid name"}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email*</label>
        {validate.email === undefined || validate.email
          ? ""
          : "Enter a valid Email"}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone Number*</label>
        {validate.phoneNumber === undefined || validate.phoneNumber
          ? ""
          : "Enter a valid PhoneNumber"}
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label>Date Of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <label>Address</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.address.district}
          onChange={handleChange}
          required
        />
        <label>Province</label>
        <select
          name="province"
          value={formData.address.province}
          onChange={handleChange}
          required
        >
          <option value="">Select Province</option>
          {[...Array(7).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>{`Province ${i + 1}`}</option>
          ))}
        </select>
        <label>Country</label>
        <select
          name="country"
          value={formData.address.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {countries?.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label>Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleChange}
          required
        />
        {validate.emptyValue === undefined || validate.emptyValue
          ? "Please enter every field properly"
          : ""}
        {props.editButton ? (
          <button
            type="submit"
            style={{ width: "95px", marginLeft: "150px" }}
            onClick={handleEdit}
          >
            Edit
          </button>
        ) : (
          <button
            className="submitButton"
            style={{ width: "95px", marginLeft: "150px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        {formData.profilePicture && (
          <img
            src={formData.profilePicture}
            alt="selected"
            style={{ maxWidth: "100%" }}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
