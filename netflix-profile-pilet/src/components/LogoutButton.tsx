import * as React from "react";

export const LogoutButton: React.FC = () => (
  <form method="POST" action="/">
    <input type="hidden" name="store" value="user" />
    <input type="hidden" name="user" value="null" />
    <button className="logout">Log out</button>
  </form>
);
