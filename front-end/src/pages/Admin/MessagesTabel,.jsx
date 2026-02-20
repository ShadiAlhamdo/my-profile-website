import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";
import {
  fetchMessages,
  deleteMessage,
} from "../../redux/ApiCalls/messageApiCall";

const MessagesTabel = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // ✅ Delete Message Handler
  const deleteMessageHandler = (messageId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this message!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMessage(messageId));
      }
    });
  };

  return (
    <section className="tabel-container">
      <AdminSidebar />

      <div className="tabel-wrapper">
        <h1 className="tabel-title">Messages</h1>

        <table className="tabel">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg._id}>
                <td>{index + 1}</td>

                <td>
                  <span className="tabel-username">{msg.username}</span>
                </td>

                <td>{msg.email}</td>

                <td className="tabel-message">
                  {msg.description}
                </td>

                <td>
                  <div className="tabel-button-group">
                    <button
                      onClick={() => deleteMessageHandler(msg._id)}
                    >
                      Delete Message
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {messages.length === 0 && (
              <tr>
                <td colSpan="5">No messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MessagesTabel;
