import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UsersCard = ({ feed }) => {
  const user = feed;
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userid) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userid,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userid));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!user) return;
  return (
    <>
      {toast && (
        <div>
          <div className="toast toast-top toast-center z-50 ">
            <div className="alert alert-info">
              <span>Connection request send.</span>
            </div>
          </div>
        </div>
      )}
      {feed && (
        <div
          // key={index}
          className="card bg-neutral text-neutral-content w-96 m-auto mt-3"
        >
          <div className="card-body items-center text-center">
            <div className="text-center w-20 ">
              <img src={user.photoUrl} alt="user photo" />
            </div>
            <h2 className="card-title">
              {user.firstName} {user.lastName}
            </h2>
            <p>Age: {user.age ? user.age : 18} </p>
            <p>About : {user.about}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-ghost"
                onClick={() => handleSendRequest("ignored", user._id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("intrested", user._id)}
              >
                Intrested
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersCard;
