import * as React from "react";
import avatars from "../data/avatars";

interface ProfileExtensionProps {
  api: any;
}

const ProfileExtension: React.FC<ProfileExtensionProps> = ({ api }) => {
  const userStore = api.getStore("user");
  const { user } = userStore.get();

  if (user) {
    const avatar = user.avatarId ? avatars[user.avatarId] : avatars[0];
    const profilepic = user.imageUrl ? (
      <img title={`${user.avatarId}`} src={user.imageUrl} />
    ) : (
      avatar
    );

    return (
      <a href="/profile">
        <div className="user-profile">
          <div className="user">
            <div className="name">{user.name}</div>
            <div className="image">{profilepic}</div>
          </div>
        </div>
      </a>
    );
  }

  return <a href="/profile">Log In</a>;
};

export default ProfileExtension;
