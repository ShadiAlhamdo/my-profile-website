import { toast } from "react-toastify";
import { userActions } from "../Slices/userSlice";
import request from "../../utils/request";

/* ----------------------------------
   Fetch All Users (Admin)
-----------------------------------*/
export function fetchAllUsers() {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(userActions.setLoading(true));

    try {
      const { data } = await request.get("/api/users", {
        headers: {
          Authorization: "Bearer " + state.auth.user.token,
        },
      });

      dispatch(userActions.setUsers(data));
      dispatch(userActions.setUsersCount(data.length));
      dispatch(userActions.setLoading(false));
    } catch (error) {
      dispatch(userActions.setLoading(false));
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    }
  };
}

/* ----------------------------------
   Fetch Users Count (Admin)
-----------------------------------*/
export function fetchUsersCount() {
  return async (dispatch, getState) => {
    const state = getState();

    try {
      const { data } = await request.get("/api/users/count", {
        headers: {
          Authorization: "Bearer " + state.auth.user.token,
        },
      });

      dispatch(userActions.setUsersCount(data.count));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users count");
    }
  };
}

/* ----------------------------------
   Fetch Single User Profile
-----------------------------------*/
export function fetchUserProfile(userId) {
  return async (dispatch) => {
    dispatch(userActions.setLoading(true));
    try {
      const { data } = await request.get(`/api/users/${userId}`);
      dispatch(userActions.setUserProfile(data));
      dispatch(userActions.setLoading(false));
    } catch (error) {
      dispatch(userActions.setLoading(false));
      toast.error(error?.response?.data?.message || "Failed to fetch profile");
    }
  };
}

/* ----------------------------------
   Update User Profile
-----------------------------------*/
export function updateUserProfile(userId, updatedData) {
  return async (dispatch, getState) => {
    const state = getState();

    try {
      const { data } = await request.put(
        `/api/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + state.auth.user.token,
          },
        }
      );

      dispatch(userActions.setUserProfile(data));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };
}

/* ----------------------------------
   Upload Profile Photo
-----------------------------------*/
export function uploadProfilePhoto(formData) {
  return async (dispatch, getState) => {
    const state = getState();

    try {
      const { data } = await request.post(
        "/api/users/profile-photo-upload",
        formData,
        {
          headers: {
            Authorization: "Bearer " + state.auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(
        userActions.setUserProfile({
          ...state.user.profile,
          profilephoto: data.profilephoto,
        })
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    }
  };
}

/* ----------------------------------
   Delete User (Admin or User)
-----------------------------------*/
export function deleteUser(userId) {
  return async (dispatch, getState) => {
    const state = getState();

    try {
      await request.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + state.auth.user.token,
        },
      });

      dispatch(fetchAllUsers());
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };
}
