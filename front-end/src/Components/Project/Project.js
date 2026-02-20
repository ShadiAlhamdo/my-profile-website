import React, { useEffect, useState } from 'react'
import Title from '../Title/Title'
import {useDispatch, useSelector} from "react-redux"
import { fetchAllProjects } from '../../redux/ApiCalls/projectApiCall'
import { Link } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll'
import { formatDate } from '../formDate'
import { fetchCategories } from '../../redux/ApiCalls/categoryApicall'


const Project = () => {
  const lng = "en";
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.category);

  const [activeCategory, setActiveCategory] = useState("*");

  useEffect(() => {
    dispatch(fetchAllProjects());
    dispatch(fetchCategories());
  }, [dispatch]);

  // ✅ فلترة المشاريع
  const filteredProjects =
    activeCategory === "*"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <section className="project" id="projects">
      <div className="container">
        <Title
          title={lng === "en" ? "My Projects" : "مشاريعي"}
          subtitle={
            lng === "en"
              ? "In this section, you can see what I did"
              : "في هذا القسم يمكنك أن ترى ما فعلته"
          }
        />

        {/* ===== Categories ===== */}
        <div className="category-buttons">
          <button
            onClick={() => setActiveCategory("*")}
            className={`primary-btn ${
              activeCategory === "*" ? "active" : ""
            }`}
          >
            ALL
          </button>

          {categories?.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`primary-btn ${
                activeCategory === cat._id ? "active" : ""
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* ===== Projects ===== */}
        <div className="content">
          {filteredProjects?.map((project) => (
            <scrollAnimation
               animateIn='flipInY'
               animateOut='flipOutY'
              className="projectcard"
              key={project._id}
            >
              <div className="img">
                <img src={project.image?.url} alt="project" />
              </div>

              <div className="text">
                <h3>{project.title}</h3>

                <p className="date">
                  {formatDate(project.createdAt)}
                </p>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-url">
                  <a href={project.liveDemo} target="_blank">
                    <i className="fa-regular fa-eye"></i> demo
                  </a>
                  <a href={project.githubLink} target="_blank">
                    <i className="fa-solid fa-download"></i> source
                  </a>
                </div>

                <h4>Tools:</h4>
                <div className="tools">
                  {project.techStack.map((tool, i) => (
                    <span key={i}>{tool}</span>
                  ))}
                </div>

                <Link
                  to={`/project-details/${project._id}`}
                  className="projectCard-details"
                >
                  Details
                </Link>
              </div>
            </scrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Project