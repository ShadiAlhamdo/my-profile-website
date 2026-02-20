import { createSlice } from "@reduxjs/toolkit";

const cvFileSlice = createSlice({
  name: "cvFile",
  initialState: {
    cvUrl: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCvUrl(state, action) {
      state.cvUrl = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearCv(state) {
      state.cvUrl = null;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const cvFileReducer = cvFileSlice.reducer;
const cvFileActions = cvFileSlice.actions;

export { cvFileActions, cvFileReducer };
