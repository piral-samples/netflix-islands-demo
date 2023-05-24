import * as React from "react";
import { AccountSwitcher } from "./AccountSwitcher";
import { LogoutButton } from "./LogoutButton";

interface ProfilePageProps {
  api: any;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ api }) => {
  const userStore = api.getStore("user");
  const { user } = userStore.get();

  return (
    <div className="profile-page">
      <AccountSwitcher />
      {user && <LogoutButton />}
    </div>
  );
};

export default ProfilePage;
