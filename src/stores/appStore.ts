import PermissionStore from "./PermissionStore";
import UserStore from "./UserStore";

let userStore = new UserStore();
let permissionStore = new PermissionStore();
const stores = {
	userStore,
	permissionStore
};

export default stores;