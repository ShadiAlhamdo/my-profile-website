import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UpdateProjectModal from "./UpdateProjectModal";
import { fetchSingleProject, deleteProject, updateProjectImage } from "../../redux/ApiCalls/projectApiCall";
import { formatDate } from "../../Components/formDate";
import swal from 'sweetalert'

const ProjectDetails = () => {

  const {user} = useSelector(state=>state.auth)  ;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [updateProject, setUpdateProject] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSingleProject(id, setProject, setLoading));
  }, [dispatch, id]);

  // 🔴 Update Image
  const updateProjectImageHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(updateProjectImage(id, formData, setFile));
  };

  // 🔴 Delete Project
  const deleteProjectHandler = () => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this project!",
    icon: "warning",
    buttons: ["Cancel", "Yes, delete it!"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteProject(id, navigate));
      swal("Poof! Your project has been deleted!", {
        icon: "success",
      });
    }
  });
};

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!project) return <h2 style={{ textAlign: "center" }}>Project Not Found</h2>;

  return (
    <section className="project-details">
      <ToastContainer theme="colored" position="top-center" />

      {/* Image */}
      <div className="project-datails-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : project.image?.url}
          alt="Project"
          className="project-details-image"
        />

        {user?.isAdmin ?<form onSubmit={updateProjectImageHandler} className="update-project-image-form">
          <label htmlFor="file" className="update-project-label">
            <i className="fa-solid fa-image"></i> Select new image
          </label>

          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit">Update Image</button>
        </form>
        :
        <></>
        }
      </div>

      {/* Title */}
      <h1 className="project-details-title">{project.title}</h1>

      {/* Date */}
      <p className="project-details-date">
        Created at: <span>{formatDate(project.createdAt)}</span>
      </p>

      {/* Description */}
      <p className="project-details-description">
        {project.description}
      </p>

      {/* Tools */}
      <h3>Tools:</h3>
      <div className="tools">
        {project.techStack.map((tool, i) => (
          <span key={i}>{tool}</span>
        ))}
      </div>

      {/* Actions */}
      {user?.isAdmin ?<div className="project-details-icon-wrapper">
        <i
          onClick={() => setUpdateProject(true)}
          className="fa-solid fa-pen-to-square"
          title="Edit"
        ></i>

        <i
          onClick={deleteProjectHandler}
          className="fa-solid fa-trash"
          title="Delete"
        ></i>
      </div>:
      <></>
      }

      {updateProject && (
        <UpdateProjectModal
        project={project}
        setProject={setProject}
        setUpdateProject={setUpdateProject}
        />
      )}
    </section>
  );
};

export default ProjectDetails;
