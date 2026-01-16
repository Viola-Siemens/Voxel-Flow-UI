import Dashboard from "@/pages/main/Dashboard";
import Login from '@/pages/common/Login';
import Register from '@/pages/common/Register';

const path2components = [
	{
		path: '/',
		component: Login
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/dashboard',
		component: Dashboard
	}
]

export default path2components;