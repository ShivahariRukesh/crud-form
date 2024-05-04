import React, { useState, useEffect } from "react";
import "./Form.css";
import { useSelector, useDispatch } from "react-redux";
import { inputChange, submitFormData } from "../features/form/formSlice";

const Form = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.attributes);
  const [countries, setCountries] = useState([]);

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
      file = files[0];
    }
    dispatch(inputChange({ name, value, file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFormData(formData));

    console.log(formData);
  };
  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label>Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone Number*</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label>DOB:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <label>Address:</label>
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
        <label>Province:</label>
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
        <label>Country:</label>
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
        <label>Profile Picture:</label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
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
