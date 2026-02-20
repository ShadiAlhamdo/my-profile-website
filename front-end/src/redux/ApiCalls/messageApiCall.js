import { toast } from "react-toastify";
import { messageActions } from "../Slices/messageSlice";
import request from "../../utils/request";


// Create Message (Public)
export function createMessage(messageData) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/messages", messageData);
      toast.success(data.message || "Message sent successfully");
      // Optionally, you can dispatch an action to refresh messages if needed
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  };
}


// Fetch All Messages (Admin)
export function fetchMessages() {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      const { data } = await request.get("/api/messages", {
        headers: {
          Authorization: "Bearer " + auth.user.token,
        },
      });

      dispatch(messageActions.setMessages(data.data));
      dispatch(messageActions.setMessagesCount(data.count));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    }
  };
}
// Delete Message (Admin)
export function deleteMessage(messageId) {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      await request.delete(`/api/messages/${messageId}`, {
        headers: {
          Authorization: "Bearer " + auth.user.token,
        },
      });

      toast.success("Message deleted successfully");
      dispatch(fetchMessages());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };
}
// Fetch Messages Count (Admin Dashboard)
export function fetchMessagesCount() {
  return async (dispatch, getState) => {
    const { auth } = getState();

    const { data } = await request.get("/api/messages/count", {
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });

    dispatch(messageActions.setMessagesCount(data.count));
  };
}

