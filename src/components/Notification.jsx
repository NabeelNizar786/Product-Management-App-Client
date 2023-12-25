import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "../redux/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);


  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        dispatch(closeNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, notification.isOpen]);

  return (
    <div
      className={`wishlistNotification ${notification.isOpen ? "open" : ""}`}
      style={{backgroundColor:notification.colour}}
    >
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
