import * as React from "react";
import { ProfilePicture } from "./ProfilePicture";
import { User } from "../models/types";
import avatars from "../data/avatars";

interface AccountProps {
  user: User;
}

export const Account: React.FC<AccountProps> = ({ user }) => {
  const avatar = user.avatarId ? avatars[user.avatarId] : avatars[0];
  const profilepic = user.imageUrl ? (
    <ProfilePicture imageUrl={user.imageUrl} />
  ) : null;

  return (
    <div className="profile">
      <form method="POST" action="/">
        <input type="hidden" name="store" value="user" />
        <input type="hidden" name="item" value={JSON.stringify(user)} />
        <button>{profilepic || avatar}</button>
        <div className="profile-name">
          <button>{user.name}</button>
        </div>
      </form>
    </div>
  );
};
