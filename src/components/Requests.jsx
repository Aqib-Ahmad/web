import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {} from "../utils/ConnectionSlice";
import { addeptRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);

  const connectionsRequests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
  const requestsReceived = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addeptRequests(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    requestsReceived();
  }, []);

  if (!connectionsRequests) return;
  if (connectionsRequests.length == 0) {
    return (
      <div>
        <h1 className="text-center font-bold text-red-600 text-2xl mt-5">
          No Requests Found
        </h1>
      </div>
    );
  }
  return (
    <>
      {toast && (
        <div>
          <div className="toast toast-top toast-center z-1 ">
            <div className="alert alert-info">
              <span>Aeeepting connection request.</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div>
          <h1 className="text-center font-bold text-2xl mt-5 ">
            My Connection Request
          </h1>
          {connectionsRequests.map((connectionData, index) => {
            const { firstName, lastName, about, age, photoUrl } =
              connectionData.fromUserId;
            return (
              <div key={index}>
                <div className="card  bg-base-100 card-xs shadow-sm border border-amber-500 flex flex-wrap justify-around items-center my-3 py-3 w-96">
                  <div>
                    <img
                      className="w-20 rounded-full"
                      src={photoUrl}
                      alt="Shoes"
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-2xl">
                      Name: {firstName + " " + lastName}
                    </h1>
                    <p>About: {about}</p>
                    <p>Age: {age ? age : ""}</p>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        reviewRequest("accepted", connectionData._id)
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() =>
                        reviewRequest("rejected", connectionData._id)
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;
