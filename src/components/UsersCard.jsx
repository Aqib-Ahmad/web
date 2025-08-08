import React from "react";

const UsersCard = ({ feed }) => {
  // console.log(feed);

  return (
    <>
      {feed &&
        feed.map((user, index) => (
          <div
            key={index}
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
                <button className="btn btn-primary">Accept</button>
                <button className="btn btn-ghost">Deny</button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default UsersCard;
