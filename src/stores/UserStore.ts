import { action, computed, observable} from "mobx";

class UserStore {
    @observable
    uid = "";

    @observable
    token = "";

	constructor() {
		this.uid = localStorage.getItem('p_u') || '';
        this.token = localStorage.getItem('p_t') || '';
	}

	@computed
	get isAuthenticated() {
		return !!this.uid;
	}

	@action
	login(uid: string, token: string) {
		this.uid = uid;
        this.token = token;
		localStorage.setItem('p_u', uid);
        localStorage.setItem('p_t', token);
	}


	@action
	logout() {
		localStorage.setItem('p_u', '');
        localStorage.setItem('p_t', '');
		this.uid = '';
        this.token = '';
		console.log("logout finished!");
	}
}
export default UserStore;