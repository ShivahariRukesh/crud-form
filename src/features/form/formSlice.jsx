import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributes: {
    id: "",
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
        state.attributes[name] = file;
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
      let len = storedItem?.length;
      if (len > 1) {
        if (len === storedItem[len - 1].id) {
          len = len + 10;
        }
      }
      storedItem.push({ ...action.payload, id: len });
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

    editFillForm(state, action) {
      const { id, name, email, phoneNumber, dob, address, profilePicture } =
        action.payload;
      const { city, district, province, country } = address;

      return {
        ...state,
        attributes: {
          id,
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
    editFormData(state, action) {
      const { id, name, email, phoneNumber, dob, address, profilePicture } =
        action.payload;
      const { city, district, province, country } = address;

      const storedItem = JSON.parse(localStorage.getItem("formData"));
      let editedItem = storedItem.map((item) => {
        if (item.id === id) {
          return {
            ...action.payload,
            id,
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
          };
        } else {
          return item;
        }
      });
      localStorage.setItem("formData", JSON.stringify(editedItem));
      return { ...initialState, userData };
    },
  },
});

export const {
  inputChange,
  submitFormData,
  deleteFormData,
  editFormData,
  editFillForm,
  getFormData,
} = formSlice.actions;
export default formSlice.reducer;
