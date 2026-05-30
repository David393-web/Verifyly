import { Bell, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useEffect, useState, useCallback, useRef } from "react";

import {
  getNotifications,
  markNotificationRead,
} from "../services/notificationService";

export default function Header() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // FETCH NOTIFICATIONS
  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // LOAD NOTIFICATIONS
  useEffect(() => {
    const loadData = async () => {
      await fetchNotifications();
    };

    loadData();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // MARK AS READ
  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="relative flex items-center justify-between px-8 py-5 bg-white shadow-sm">
      {/* LOGO */}
      <div onClick={() => navigate("/dashboard")} className="cursor-pointer">
        <h1 className="text-2xl font-bold text-indigo-600">Verilyfy</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-600 transition hover:text-indigo-600"
          >
            <Bell size={28} />

            {unreadCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                {unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}
          {showNotifications && (
            <div
              className="
  absolute
  top-14
  right-1/2
  translate-x-1/2
  sm:right-0
  sm:translate-x-0
  w-[95vw]
  max-w-[350px]
  sm:w-96
  bg-white
  rounded-2xl
  shadow-2xl
  p-5
  z-50
  max-h-[500px]
  overflow-y-auto
"
            >
              <h2 className="mb-4 text-xl font-bold">Notifications</h2>

              {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications yet.</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleRead(notification._id)}
                    className={`
                        mb-4
                        p-4
                        rounded-xl
                        cursor-pointer
                        transition-all

                        ${notification.read ? "bg-gray-100" : "bg-indigo-100"}
                      `}
                  >
                    <h3 className="font-bold text-gray-900">
                      {notification.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-3 font-semibold text-white transition bg-red-500 rounded-2xl hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </header>
  );
}
