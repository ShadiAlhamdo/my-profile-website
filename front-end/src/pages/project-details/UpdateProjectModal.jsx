import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProject } from "../../redux/ApiCalls/projectApiCall";

const UpdateProjectModal = ({ setUpdateProject, project, setProject }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(project.title);
  const [githubLink, setGithubLink] = useState(project.githubLink);
  const [liveDemo, setLiveDemo] = useState(project.liveDemo);
  const [techStack, setTechStack] = useState(project.techStack.join(", "));
  const [category, setCategory] = useState(project.category);
  const [description, setDescription] = useState(project.description);

  // ✅ Update project Handler
  const updateProjectHandler = (e) => {
    e.preventDefault();

    if (!title) return toast.error("Please enter project title");
    if (!githubLink) return toast.error("Please enter github link");
    if (!liveDemo) return toast.error("Please enter live demo link");
    if (!techStack) return toast.error("Please enter tech stack");
    if (!category) return toast.error("Please select a category");

    const updatedProject = {
      title,
      githubLink,
      liveDemo,
      description,
      category,
      techStack: techStack.split(",").map(t => t.trim()),
    };

    dispatch(
      updateProject(
        project._id,
        updatedProject,
        setProject,
        setUpdateProject
      )
    );
  };

  return (
    <div className="update-project">
      <form className="update-project-form" onSubmit={updateProjectHandler}>
        <abbr title="close">
          <i
            onClick={() => setUpdateProject(false)}
            className="fa-solid fa-xmark update-project-form-close"
          ></i>
        </abbr>

        <h1 className="update-project-title">Update Project</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Project Title"
          className="update-project-input create-project-input"
        />

        <input
          type="text"
          className="update-project-input create-project-input"
          placeholder="Github Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <input
          type="text"
          className="update-project-input create-project-input"
          placeholder="Live Demo Link"
          value={liveDemo}
          onChange={(e) => setLiveDemo(e.target.value)}
        />

        <input
          type="text"
          className="update-project-input create-project-input"
          placeholder="Tech Stack (React, Node, MongoDB)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="update-project-input create-project-input"
        >
          <option value="" disabled>Select A Category</option>
          <option value="front-end">Front-End Development</option>
          <option value="back-end">Back-End Development</option>
          <option value="design">Design</option>
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          className="update-project-textarea create-project-input"
        ></textarea>

        <button type="submit" className="update-project-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectModal;
