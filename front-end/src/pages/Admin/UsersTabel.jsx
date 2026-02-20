import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";
import { fetchAllUsers, deleteUser } from "../../redux/ApiCalls/userApiCall";

const UsersTabel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // ✅ Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(userId));
      }
    });
  };

  return (
    <section className="tabel-container">
      <AdminSidebar />

      <div className="tabel-wrapper">
        <h1 className="tabel-title">Users</h1>

        <table className="tabel">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="tabel-image">
                    <img
                      className="tabel-user-image"
                      src={user.profilePhoto || "/images/avatar.png"}
                      alt=""
                    />
                    <span className="tabel-username">
                      {user.username}
                    </span>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  <div className="tabel-button-group">
                    <button>
                      <Link to={`/profile/${user._id}`}>
                        See Profile
                      </Link>
                    </button>

                    <button onClick={() => deleteUserHandler(user._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTabel;
