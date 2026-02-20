import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    usersCount: null,
    profile: null,
    loading: false,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUsersCount(state, action) {
      state.usersCount = action.payload;
    },
    setUserProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userActions, userReducer };
