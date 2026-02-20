import { toast } from "react-toastify";
import { cvFileActions } from "../Slices/cvFileSlice";
import request from "../../utils/request";

/* ===============================
   Upload CV (Admin)
================================ */
export function uploadCv(formData) {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      dispatch(cvFileActions.setLoading());

      const { data } = await request.post("/api/cv/upload", formData, {
        headers: {
          Authorization: "Bearer " + auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(cvFileActions.setCvUrl(data.url));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "CV upload failed");
      dispatch(cvFileActions.setError(error.message));
    }
  };
}

/* ===============================
   Update CV (Admin)
================================ */
export function updateCv(formData) {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      dispatch(cvFileActions.setLoading());

      const { data } = await request.put("/api/cv/update", formData, {
        headers: {
          Authorization: "Bearer " + auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(cvFileActions.setCvUrl(data.url));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "CV update failed");
      dispatch(cvFileActions.setError(error.message));
    }
  };
}

/* ===============================
   Download CV (Public)
================================ */
export function downloadCv() {
  return async () => {
    try {
      const response = await request.get("/api/cv/download", {
        responseType: "blob",
      });

      // الآن لدينا blob صالح
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "My_CV.pdf"; // اسم الملف
      document.body.appendChild(a);
      a.click();

      // تنظيف
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download CV");
    }
  };
}


/* ===============================
   Delete CV (Admin)
================================ */
export function deleteCv() {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      dispatch(cvFileActions.setLoading());

      const { data } = await request.delete("/api/cv/delete", {
        headers: {
          Authorization: "Bearer " + auth.user.token,
        },
      });

      dispatch(cvFileActions.clearCv());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "CV delete failed");
      dispatch(cvFileActions.setError(error.message));
    }
  };
}

/* ===============================
    Fetch CV Status (Admin)
================================ */
export function fetchCvStatus() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/cv");
      dispatch(cvFileActions.setCvUrl(data.cvUrl));
    } catch (error) {
      dispatch(cvFileActions.clearCv());
    }
  };
}
