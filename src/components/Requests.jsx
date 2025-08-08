import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {} from "../utils/ConnectionSlice";
import { addeptRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const connectionsRequests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const requestsReceived = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addeptRequests(res.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    requestsReceived();
  }, []);
  if (!connectionsRequests || connectionsRequests.length === 0) {
    return (
      <div>
        {" "}
        <h1 className="text-center font-bold text-red-600 text-2xl mt-5">
          No Connection
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="text-center font-bold text-2xl mt-5 ">
            My Connection Request
          </h1>
          {connectionsRequests.data.map((connectionData, index) => {
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
