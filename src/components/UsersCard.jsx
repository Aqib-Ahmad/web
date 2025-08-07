import React from "react";

const UsersCard = ({ feed }) => {
  return (
    <>
      {feed &&
        feed.map((user) => (
          <div className="card bg-neutral text-neutral-content w-96 m-auto mt-3">
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                {user.firstName} {user.lastName}
              </h2>
              <p>We are using cookies for no reason.</p>
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
