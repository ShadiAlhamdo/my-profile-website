import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../redux/ApiCalls/authApiCall";

const UserSidebar = ({ isOpen, toggleSidebar, toggleTheme,dark }) => {
  
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className={`user-sidebar ${isOpen ? "open" : ""}`}>

      {/* Handle الظاهر دائماً */}
      <div className="sidebar-handle" onClick={toggleSidebar}>
        <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </div>

      <div className="sidebar-content">
        <h3 className="sidebar-title">Menu</h3>

        <ul className="sidebar-links">
          {!user ? (
            <>
              <li>
                <Link to="/login">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <i className="fa-solid fa-user-plus"></i>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={()=>dispatch(logoutUser())} className="logout-btn">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Logout
              </button>
            </li>
          )}
            {user?.isAdmin ?(
              <li>
                <Link to="/admin">
                  <i className="fa-solid fa-gauge"></i>
                  Admin Dashboard
                </Link>
              </li>
            ):(<></>)
            
          }
          {user?.isAdmin ?(
              <li>
                <Link to="/admin/create-project">
                  <i className="fa-solid fa-upload"></i>
                 Create Project
                </Link>
              </li>
            ):(<></>)
            
          }
          <li>
            <button className="theme-btn" onClick={toggleTheme}>
              <i className="fa-solid fa-circle-half-stroke"></i>
              Toggle Theme
          </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
