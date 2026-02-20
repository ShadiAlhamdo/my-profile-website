import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";
import {
  fetchAllProjects,
  deleteProject,
} from "../../redux/ApiCalls/projectApiCall";

const ProjectTabel = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  // ✅ Delete Project Handler
  const deleteProjectHandler = (projectId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this project!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProject(projectId));
      }
    });
  };

  return (
    <section className="tabel-container">
      <AdminSidebar />

      <div className="tabel-wrapper">
        <h1 className="tabel-title">Projects</h1>

        <table className="tabel">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Project Title</th>
              <th>Project Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="tabel-image">
                    <img
                      className="tabel-user-image"
                      src={project.user?.profilephoto?.url || "/images/avatar.png"}
                      alt=""
                    />
                    <span className="tabel-username">
                      {project.user?.username || "Unknown"}
                    </span>
                  </div>
                </td>

                <td>{project.title}</td>

                <td>
                  <div className="tabel-image">
                    <img
                      className="tabel-user-image"
                      src={project.image?.url}
                      alt=""
                    />
                  </div>
                </td>

                <td>
                  <div className="tabel-button-group">
                    <button>
                      <Link to={`/project-details/${project._id}`}>
                        See Project
                      </Link>
                    </button>

                    <button
                      onClick={() => deleteProjectHandler(project._id)}
                    >
                      Delete Project
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan="5">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProjectTabel;
