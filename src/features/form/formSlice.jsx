import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributes: {
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
  },

  userData: [],
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    inputChange(state, action) {
      const { name, value, file } = action.payload;
      if (
        name === "country" ||
        name === "city" ||
        name === "province" ||
        name === "district"
      ) {
        state.attributes.address[name] = value;
      } else if (name === "profilePicture") {
        console.log(file);
        state.attributes[name] = URL.createObjectURL(file);
      } else {
        state.attributes[name] = value;
      }
    },
    getFormData(state) {
      const storedItem = JSON.parse(localStorage.getItem("formData")) || [];

      return { ...state, userData: storedItem };
    },
    submitFormData(state, action) {
      const storedItem = JSON.parse(localStorage.getItem("formData")) || [];
      storedItem.push(action.payload);
      localStorage.setItem("formData", JSON.stringify(storedItem));
      return {
        ...initialState,
        userData: storedItem,
      };
    },
    deleteFormData(state, action) {
      const deletedResult = state.userData.filter((item) => {
        if (
          !(
            item.email === action.payload.email ||
            item.phoneNumber === action.payload.phoneNumber
          )
        ) {
          return item;
        }
      });
      localStorage.setItem("formData", JSON.stringify(deletedResult));
      return { ...state, userData: deletedResult };
    },

    editFormData(state, action) {
      const { name, email, phoneNumber, dob, address, profilePicture } =
        action.payload;
      const { city, district, province, country } = address;
      return {
        ...state,
        attributes: {
          name,
          email,
          phoneNumber,
          dob,
          address: {
            city,
            district,
            province,
            country,
          },
          profilePicture,
        },
      };
    },
  },
});

export const {
  inputChange,
  submitFormData,
  deleteFormData,
  editFormData,
  getFormData,
} = formSlice.actions;
export default formSlice.reducer;
