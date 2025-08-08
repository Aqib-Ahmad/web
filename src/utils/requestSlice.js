import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addeptRequests: (state, action) => action.payload,
  },
});

export const { addeptRequests } = requestSlice.actions;
export default requestSlice.reducer;
