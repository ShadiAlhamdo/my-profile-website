import { useEffect } from "react";
import "./cvFileTabel.css";
import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCvStatus,
  uploadCv,
  updateCv,
  downloadCv,
  deleteCv,
} from "../../redux/ApiCalls/cvFileApiCall";
import swal from "sweetalert";

const CvFileTabel = () => {
  const dispatch = useDispatch();
  const { cvUrl, loading } = useSelector((state) => state.cvFile);

  // Fetch CV status when page loads
  useEffect(() => {
    dispatch(fetchCvStatus());
  }, [dispatch]);

  // Upload new CV
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    dispatch(uploadCv(formData));
  };

  // Update CV
  const updateHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    dispatch(updateCv(formData));
  };

  // Delete CV
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this CV!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCv());
      }
    });
  };

  return (
    <div className="cv-header">
      <AdminSidebar />

      <div className="cv-table table-container">
        <h2 className="table-title">CV File Management</h2>

        {cvUrl ? (
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>My CV</td>
                <td>
                  <span className="status available">Available</span>
                </td>
                <td className="actions">
                  <button
                    className="btn download"
                    onClick={() => dispatch(downloadCv())}
                    disabled={loading}
                  >
                    <i className="fa-solid fa-download"></i>
                    Download
                  </button>


                  <label className="btn update">
                    <i className="fa-solid fa-pen-to-square"></i>
                    Update
                    <input
                      type="file"
                      hidden
                      onChange={updateHandler}
                    />
                  </label>

                  <button className="btn delete" onClick={deleteHandler}>
                    <i className="fa-solid fa-trash"></i>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="no-cv">
            <p>No CV uploaded yet</p>

            <label className="btn upload">
              <i className="fa-solid fa-upload"></i>
              {loading ? "Uploading..." : "Upload CV"}
              <input type="file" hidden onChange={uploadHandler} />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CvFileTabel;
