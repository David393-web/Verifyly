import axios from "axios";

const API =
  "http://localhost:5000/api/notifications";


// GET NOTIFICATIONS
export const getNotifications =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(API, {

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

      });

    return response.data;

  };


// MARK AS READ
export const markNotificationRead =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(

        `${API}/${id}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

    return response.data;

  };