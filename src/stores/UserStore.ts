import { action, computed, observable} from "mobx";

class UserStore {
	@observable
	username = "";

    @observable
    token = "";

	constructor() {
		this.username = localStorage.getItem('p_u') || '';
        this.token = localStorage.getItem('p_t') || '';
	}

	@computed
	get isAuthenticated() {
		return !!this.username;
	}

	@action
	login(name: string, token: string) {
		this.username = name;
        this.token = token;
		localStorage.setItem('p_u', name);
        localStorage.setItem('p_t', token);
	}


	@action
	logout() {
		localStorage.setItem('p_u', '');
        localStorage.setItem('p_t', '');
		this.username = '';
        this.token = '';
		console.log("logout finished!");
	}
}
export default UserStore;