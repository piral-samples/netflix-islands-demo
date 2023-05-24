import * as React from "react";
import { Account } from "./Account";
import users from "../data/users";

export const AccountSwitcher: React.FC = () => {
  return (
    <div className="AccountSwitcher">
      <div className="wrapper">
        <h1>Who's Watching?</h1>
        <div className="profile-wrap">
          {users.map((u) => (
            <Account key={u.userId} user={u} />
          ))}
        </div>
      </div>
    </div>
  );
};
