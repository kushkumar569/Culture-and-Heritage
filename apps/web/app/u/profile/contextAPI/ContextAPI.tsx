import { ProfileProvider } from "./ProfileContext";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
  console.log("Rendering ProfilePage with ContextAPI");

  return (
    <>
      <ProfileProvider>
        <Profile />
      </ProfileProvider>
    </>
  );
}
