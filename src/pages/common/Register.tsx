import * as React from 'react';
import {Button, Card, Input} from "antd";
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {generateUsername} from "@/utils/defaultUsernames";
import axios from "axios";
import {API_HOST} from "@/utils/adaptors";
import appStore from "@/stores/appStore";
import {toast} from "amis";
import {RouteComponentProps} from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import {IconButton} from "@mui/material";

export interface RegisterProps extends RouteComponentProps<any> {}

@inject("store")
// @ts-ignore
@withRouter
@observer
export default class Register extends React.Component<RegisterProps, any> {
    state = {
        inputUsername: generateUsername(),
        inputPassword: "",
        inputPassword2: "",
    };

    handleFormSaved = (value: any) => {
        const history = this.props.history;
        console.log("inputUsername:", this.state.inputUsername);
        if(this.state.inputPassword !== this.state.inputPassword2) {
            toast["error"]("两次密码输入不相同！", "消息");
            return;
        }
        // 这里可以进行登陆密码验证
        axios.request({
            method: "POST",
            url: `${API_HOST}/user/sign-up`,
            data: {
                username: this.state.inputUsername,
                password: this.state.inputPassword
            }
        }).then((res) => {
            console.log("login res", res);
            if (res.data != null && res.data.status === 0) {
                appStore.userStore.login(this.state.inputUsername);
                toast.info("登陆成功", { timeout: "1400", position: "top-center" });
                // 标头添加
                axios.defaults.headers.common["p_u"] = this.state.inputUsername;
                axios.defaults.headers.common["p_t"] = res.data.data.token;
                // 跳转到dashboard页面
                console.log("replace history to login, value:", value);
                history.replace(`/login`);
            } else {
                toast["error"]("登陆失败", "消息");
                delete axios.defaults.headers.common["p_u"]
                delete axios.defaults.headers.common["p_t"]
            }
        });
    };

    refreshUsername = () => {
        this.setState({ inputUsername: generateUsername() });
    };

    toLogin = () => {
        this.props.history.replace(`/login`);
    };

    handleChangeForUsername = (e: any) => {
        this.setState({
            inputUsername: e.target.value,
        });
    };

    handleChangeForPassword = (e: any) => {
        this.setState({
            inputPassword: e.target.value,
        });
    };

    handleChangeForPassword2 = (e: any) => {
        this.setState({
            inputPassword2: e.target.value,
        });
    };

    render() {
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
                                        onChange={this.handleChangeForUsername}
                                        value={this.state.inputUsername}
                                    ></Input>
                                    <IconButton onClick={this.refreshUsername}>
                                        <RefreshIcon />
                                    </IconButton>
                                </div>

                                <div className="mb-3 bg-glass">
                                    <Input
                                        placeholder="密码"
                                        size="large"
                                        prefix={<KeyOutlined className="site-form-item-icon" />}
                                        type="password"
                                        className="w-80"
                                        onChange={this.handleChangeForPassword}
                                        defaultValue={this.state.inputPassword}
                                    ></Input>
                                </div>

                                <div className="mb-3 bg-glass">
                                    <Input
                                        placeholder="重复密码"
                                        size="large"
                                        prefix={<KeyOutlined className="site-form-item-icon" />}
                                        type="password"
                                        className="w-80"
                                        onChange={this.handleChangeForPassword2}
                                        defaultValue={this.state.inputPassword2}
                                    ></Input>
                                </div>

                                <div className="mb-3 flex flex-row justify-center">
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="w-80"
                                        onClick={this.handleFormSaved}
                                    >
                                        注册
                                    </Button>
                                </div>

                                <div className="mb-3 flex flex-row justify-center">
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="w-80"
                                        onClick={this.toLogin}
                                    >
                                        已有账号？去登录！
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}