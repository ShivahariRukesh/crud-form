import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./form/formSlice";
export const Store = configureStore({
  reducer: {
    form: formReducer,
  },
});
