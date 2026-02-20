import React, { useEffect, useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import UserSidebar from "../SideBar/Sidebar";

const Header = () => {
  const lng = "en";

  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);

  

  // تحميل الثيم مرة وحدة
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  // تبديل الثيم
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // التنقل الذكي للأقسام
  const goToSection = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroll.scrollTo(section, {
          smooth: true,
          offset: -100,
          duration: 500,
        });
      }, 100);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            Shadi <span className="gradient-text-color">-Alhamdo</span>
          </a>
        </div>

        <div className="links">
          <ul>
            {/* HOME */}
            <li>
              {location.pathname === "/" ? (
                <ScrollLink
                  to="home"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  {lng === "ar" ? "الصفحة الرئيسية" : "Home"}
                </ScrollLink>
              ) : (
                <a onClick={() => goToSection("home")}>
                  {lng === "ar" ? "الصفحة الرئيسية" : "Home"}
                </a>
              )}
            </li>

            {/* ABOUT */}
            <li>
              {location.pathname === "/" ? (
                <ScrollLink
                  to="about"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  {lng === "ar" ? "لمحة عني" : "About Me"}
                </ScrollLink>
              ) : (
                <a onClick={() => goToSection("about")}>
                  {lng === "ar" ? "لمحة عني" : "About Me"}
                </a>
              )}
            </li>

            {/* PROJECTS */}
            <li>
              {location.pathname === "/" ? (
                <ScrollLink
                  to="projects"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  {lng === "ar" ? "المشاريع" : "Projects"}
                </ScrollLink>
              ) : (
                <a onClick={() => goToSection("projects")}>
                  {lng === "ar" ? "المشاريع" : "Projects"}
                </a>
              )}
            </li>

            {/* SERVICES */}
            <li>
              {location.pathname === "/" ? (
                <ScrollLink
                  to="services"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  {lng === "ar" ? "الخدمات" : "Services"}
                </ScrollLink>
              ) : (
                <a onClick={() => goToSection("services")}>
                  {lng === "ar" ? "الخدمات" : "Services"}
                </a>
              )}
            </li>

            {/* CONTACT */}
            <li>
              {location.pathname === "/" ? (
                <ScrollLink
                  to="contact"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  {lng === "ar" ? "تواصل معي" : "Contact Me"}
                </ScrollLink>
              ) : (
                <a onClick={() => goToSection("contact")}>
                  {lng === "ar" ? "تواصل معي" : "Contact Me"}
                </a>
              )}
            </li>
          </ul>
        </div>

        <UserSidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isLoggedIn={false}
          toggleTheme={toggleTheme}
          dark={dark}
        />
      </div>
    </header>
  );
};

export default Header;
