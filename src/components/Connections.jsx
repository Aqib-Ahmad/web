import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fectionConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error, "err");
    }
  };
  useEffect(() => {
    fectionConnections();
  }, []);

  if (!connections || connections.length === 0) {
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
            My Connections
          </h1>
          {connections.map((connectionData) => {
            const { firstName, lastName, about, age, photoUrl } =
              connectionData.fromUserId;
            return (
              <div>
                <div className="card  bg-base-100 card-xs shadow-sm border border-amber-500 flex flex-wrap justify-around items-center py-3 w-96">
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
