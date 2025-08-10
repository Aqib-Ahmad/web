import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/ConnectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const loggedUserId = useSelector((store) => store.user);
  const fectionConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error.message, "err");
    }
  };
  useEffect(() => {
    fectionConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div>
        <h1 className="text-center font-bold text-red-600 text-2xl mt-5">
          No Connections Found
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="text-center font-bold text-2xl mt-5 ">
            My Connections
          </h1>
          {connections.map((connectionData, index) => {
            const myuser =
              connectionData.fromUserId._id === loggedUserId._id
                ? connectionData.toUserId
                : connectionData.fromUserId;

            const { firstName, lastName, about, age, photoUrl, _id } = myuser;

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
                  <div>
                    <Link to={`/chat/${_id}`}>
                      <button className="btn btn-neutral">Chat</button>
                    </Link>
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

export default Connections;
