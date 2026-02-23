import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategoriesCount } from "../../redux/ApiCalls/categoryApicall";
import { fetchProjectsCount } from "../../redux/ApiCalls/projectApiCall";
import { fetchMessagesCount } from "../../redux/ApiCalls/messageApiCall";
import { fetchUsersCount } from "../../redux/ApiCalls/userApiCall";

import AddCategoryForm from "./AddCategoryForm";
import { fetchCvStatus } from "../../redux/ApiCalls/cvFileApiCall";

const AdminMain = () => {
  const dispatch = useDispatch();

  const { projectsCount } = useSelector((state) => state.project);
  const { categoriesCount } = useSelector((state) => state.category);
  const { messagesCount } = useSelector((state) => state.message);
  const { usersCount } = useSelector((state) => state.user);
  const { cvUrl } = useSelector((state) => state.cvFile);

  useEffect(() => {
    dispatch(fetchUsersCount());
    dispatch(fetchCategoriesCount());
    dispatch(fetchProjectsCount());
    dispatch(fetchMessagesCount());
    dispatch(fetchCvStatus());
  }, [dispatch]);

  const cards = [
    {
      title: "Users",
      count: usersCount || 0,
      link: "/admin/users-tabel",
      icon: "fa-users",
    },
    {
      title: "Categories",
      count: categoriesCount || 0,
      link: "/admin/categories-tabel",
      icon: "fa-layer-group",
    },
    {
      title: "Projects",
      count: projectsCount || 0,
      link: "/admin/projects-tabel",
      icon: "fa-box-archive",
    },
    {
      title: "Messages",
      count: messagesCount || 0,
      link: "/admin/messages-tabel",
      icon: "fa-message",
    },
   {
      title: "CV File",
      count: cvUrl ? 1 : 0,
      link: "/admin/cv-tabel",
      icon: "fa-file",
    }
  ];

  return (
    <div className="admin-main">
      <div className="admin-main-header">
        {cards.map((card, index) => (
          <div className="admin-main-card" key={index}>
            <h5 className="admin-card-title">{card.title}</h5>

            <div className="admin-card-count">{card.count}</div>

            <div className="admin-card-link-wrapper">
              <Link to={card.link} className="admin-card-link">
                See All {card.title}
              </Link>

              <div className="admin-card-icon">
                <i className={`fa-solid ${card.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddCategoryForm />
    </div>
  );
};

export default AdminMain;
