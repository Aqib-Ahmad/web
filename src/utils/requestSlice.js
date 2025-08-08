import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addeptRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((user) => user._id != action.payload);
      return newArray;
    },
  },
});

export const { addeptRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
