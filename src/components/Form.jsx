import React, { useState, useEffect } from "react";
import "./Form.css";
const Form = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    address: {
      city: "",
      district: "",
      province: "",
      country: "Nepal",
    },
    profilePicture: null,
  });

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profilePicture: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone Number:</label>
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
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.address.district}
          onChange={handleAddressChange}
          required
        />
        <select
          name="province"
          value={formData.address.province}
          onChange={handleAddressChange}
          required
        >
          <option value="">Select Province</option>
          {[...Array(7).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>{`Province ${i + 1}`}</option>
          ))}
        </select>
        <select
          name="country"
          value={formData.address.country}
          onChange={handleAddressChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.name.common} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
        <label>Profile Picture:</label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
