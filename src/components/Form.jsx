import React, { useState, useEffect, useRef } from "react";
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

  const inputRef = useRef([]);

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

  function mouseHover() {
    console.log("Ref", inputRef.current[1]?.value);
    console.log(validate);
    const butt = document.getElementById("submit");
    // console.log(validate);
    if (
      !(
        validate.name &&
        validate.email &&
        !validate.emptyValue &&
        validate.phoneNumber
      )
    ) {
      if (butt.style.marginLeft === "150px") {
        butt.style.marginLeft = "0px";
      } else {
        butt.style.marginLeft = "150px";
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let file;
    if (files) {
      file = URL.createObjectURL(files[0]);
    }

    dispatch(inputChange({ name, value, file }));
    console.log("formdata", formData);
    let val;

    if (name !== "profilePicture") {
      if (name === "email" || name === "phoneNumber" || name === "name") {
        val = validateInput(name, value);
        setValidate((prev) => {
          return { ...prev, [name]: val };
        });
      }
      if (
        name === "city" ||
        name === "province" ||
        name === "dob" ||
        name === "district" ||
        name === "country"
      ) {
        if (
          !(
            inputRef.current[0]?.value === "" ||
            inputRef.current[1]?.value === "" ||
            inputRef.current[2]?.value === "" ||
            inputRef.current[3]?.value === "" ||
            inputRef.current[4]?.value === ""
          )
        ) {
          setValidate((prev) => {
            return { ...prev, emptyValue: false };
          });
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let emptyFieldValidation = validateEmptyValue(formData);

    // setValidate((prev) => {
    //   return { ...prev, emptyValue: emptyFieldValidation };
    // });

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
          ref={(el) => (inputRef.current[0] = el)}
          required
        />
        <label>Address</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          ref={(el) => (inputRef.current[1] = el)}
          required
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.address.district}
          onChange={handleChange}
          ref={(el) => (inputRef.current[2] = el)}
          required
        />
        <label>Province</label>
        <select
          name="province"
          value={formData.address.province}
          onChange={handleChange}
          ref={(el) => (inputRef.current[3] = el)}
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
          ref={(el) => (inputRef.current[4] = el)}
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
            id="submit"
            className="submitButton"
            style={{ width: "95px", marginLeft: "150px" }}
            type="submit"
            onClick={handleSubmit}
            onMouseOver={mouseHover}
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
