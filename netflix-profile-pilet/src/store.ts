import { User } from "./models/types";

const defaultInit: { user: User | null } = { user: null };

function storeHandler(api: any, init = defaultInit) {
  let user: User | null = init.user;

  return {
    update(newUser: User | null) {
      user = newUser;
      api.emit("updated-user", { user });
    },
    get() {
      return {
        user,
      };
    },
  };
}

export default storeHandler;
