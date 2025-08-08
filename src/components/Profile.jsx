import { useSelector } from "react-redux";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return <>{user && <ProfileEdit user={user} />}</>;
};

export default Profile;
