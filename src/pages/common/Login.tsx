import * as React from "react";
import axios from "axios";
import { toast } from "amis";
import { observer } from "mobx-react";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Input, Button, Card } from "antd";
import appStore from "@/stores/appStore"
import {API_HOST} from "@/utils/adaptors";
import {useNavigate} from "react-router";
import {useState} from "react";
import {IMainStore} from "@/stores";

interface LoginProps {
    store: IMainStore;
}

const LoginRoute: React.FC<LoginProps> = observer((props) => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const navigate = useNavigate();

	const handleFormSaved = (value: any) => {
		console.log("inputUsername:", inputUsername);
		// 这里可以进行登陆密码验证
		axios.request({
            method: "POST",
            url: `${API_HOST}/user/log-in`,
            data: {
                username: inputUsername,
                password: inputPassword
            }
        }).then((res) => {
            console.log("login res", res);
            if (res.data != null && res.data.status === 0) {
                toast.info("登陆成功", { timeout: "1400", position: "top-center" });
                // 标头添加
                axios.defaults.headers.common["p_u"] = inputUsername;
                axios.defaults.headers.common["p_t"] = res.data.data.token;
                appStore.userStore.login(inputUsername, res.data.data.token);
                // 跳转到dashboard页面
                console.log("replace history to dashboard, value:", value);
                navigate(`/dashboard`);
            } else {
                toast["error"]("登陆失败", "消息");
                delete axios.defaults.headers.common["p_u"]
                delete axios.defaults.headers.common["p_t"]
            }
        });
	};

    const toRegister = () => {
        navigate(`/register`);
    }

    const handleChangeForPassword = (e: any) => {
        setInputPassword(e.target.value);
	};

    const componentDidMount = () => {
		console.log("appStore.userStore.name", appStore.userStore.username);
		console.log("store.user.isAuthenticated", appStore.userStore.isAuthenticated);
	}

    const handleChangeForUsername = (e: any) => {
        setInputUsername(e.target.value);
	};

    return (
        <div className="login-page-container bg-gray-50">
            <div className="container mt-5">
					<span className="block m-b-xl text-center text-2x">
						Voxel Flow
					</span>
                <span className="block m-b-xl text-center">
						让 Minecraft 项目管理更加简单
					</span>

                <div className="flex flex-row justify-center ">
                    <div className="m-24">
                        <Card className="p-8" >
                            <div className="mb-3">
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="用户名"
                                    className="w-80"
                                    size="large"
                                    onChange={handleChangeForUsername}
                                    defaultValue={inputUsername}
                                ></Input>
                            </div>

                            <div className="mb-3 bg-glass">
                                <Input
                                    placeholder="密码"
                                    size="large"
                                    prefix={<KeyOutlined className="site-form-item-icon" />}
                                    type="password"
                                    className="w-80"
                                    onChange={handleChangeForPassword}
                                    defaultValue={inputPassword}
                                ></Input>
                            </div>

                            <div className="mb-3 flex flex-row justify-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="w-80"
                                    onClick={handleFormSaved}
                                >
                                    登录
                                </Button>
                            </div>

                            <div className="mb-3 flex flex-row justify-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="w-80"
                                    onClick={toRegister}
                                >
                                    没有账号？去注册！
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default LoginRoute;