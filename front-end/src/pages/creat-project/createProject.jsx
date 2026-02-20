import { useEffect, useState } from "react";
import "./createProject.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../redux/ApiCalls/projectApiCall";
import { fetchCategories } from "../../redux/ApiCalls/categoryApicall";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);

  useEffect(()=>{
     dispatch(fetchCategories());
  })

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    githubLink: "",
    liveDemo: "",
    techStack: "",
    description: "",
    image: null,
  });

  // handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // handle form submission
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formData.title) return toast.error("Project title is required");
    if (!formData.category) return toast.error("Project category is required");
    if (!formData.githubLink) return toast.error("Project github link is required");
    if (!formData.liveDemo) return toast.error("Project live demo link is required");
    if (!formData.techStack) return toast.error("Project tech stack is required");
    if (!formData.description) return toast.error("Project description is required");
    if (!formData.image) return toast.error("Project image is required");

    const projectData = {
      title: formData.title,
      category: formData.category,
      githubLink: formData.githubLink,
      liveDemo: formData.liveDemo,
      description: formData.description,
      techStack: formData.techStack
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
    };

    dispatch(
      createProject(projectData, formData.image, navigate)
    );
  };

  return (
    <section className="create-project">
      <ToastContainer theme="colored" position="top-center" />

      <h1 className="create-project-title">Create New Project</h1>

      <form className="create-project-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="title"
          className="create-project-input"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="create-project-input"
        >
          <option value="" disabled>Select A Category</option>
          {categories?.map((cat)=>(
            <option value={cat?._id}>{cat?.title}</option>
          ))}
        </select>

        <input
          type="text"
          name="githubLink"
          className="create-project-input"
          placeholder="Github Link"
          value={formData.githubLink}
          onChange={handleChange}
        />

        <input
          type="text"
          name="liveDemo"
          className="create-project-input"
          placeholder="Live Demo Link"
          value={formData.liveDemo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="techStack"
          className="create-project-input"
          placeholder="Tech Stack (React, Node, MongoDB)"
          value={formData.techStack}
          onChange={handleChange}
        />

        <textarea
          name="description"
          rows={5}
          className="create-project-textarea"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          className="create-project-upload"
          onChange={handleChange}
        />

        <button className="create-project-btn" type="submit">
          Create Project
        </button>
      </form>
    </section>
  );
};

export default CreateProject;
