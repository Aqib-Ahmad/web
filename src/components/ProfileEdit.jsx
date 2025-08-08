import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [agshowToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const handleChanges = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, gender, photoUrl, age },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* show  toast  */}
      {agshowToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile update successfully.</span>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <div className="card card-border bg-base-300 w-6/12 m-auto my-3">
          <div className="card-body">
            <h2 className="card-title justify-center text-3xl">
              Update Profile
            </h2>
            <div className="flex justify-center flex-wrap gap-2">
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                    placeholder="First Name"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    className="input"
                    placeholder="Last Name"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input"
                    placeholder="About"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                    placeholder="Gender"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                    placeholder="Age"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Change Dp</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setphotoUrl(e.target.value)}
                    className="input"
                    placeholder="Change Dp"
                  />
                </fieldset>
              </div>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleChanges}>
                Save changes
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-neutral text-neutral-content w-80 m-auto mt-3">
            <div className="card-body items-center text-center">
              <div className="text-center w-40 ">
                <img className="rounded-full" src={user.photoUrl} alt="" />
              </div>
              <h2 className="card-title">
                {user.firstName} {user.lastName}
              </h2>
              <p>About: {user.about}</p>
              <p>Gender: {user.gender}</p>
              <p>Age: {user.age}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
