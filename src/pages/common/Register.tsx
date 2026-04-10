import * as React from 'react';
import {Button, Card, Input} from "antd";
import {KeyOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import { observer } from "mobx-react";
import { generateUsername } from "@/utils/defaultUsernames";
import axios from "axios";
import {API_HOST} from "@/utils/adaptors";
import {toast} from "amis";
import {useNavigate} from "react-router";
import { useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import {IconButton} from "@mui/material";

interface RegisterProps {}

const RegisterRoute: React.FC<RegisterProps> = observer((props) => {
	const [inputUsername, setInputUsername] = useState(generateUsername());
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [inputPassword2, setInputPassword2] = useState("");
	const navigate = useNavigate();

	const handleFormSaved = (value: any) => {
		console.log("inputUsername:", inputUsername);
		// 校验用户名格式：平假名、片假名、汉字、英文、数字、下划线、横杠
		const usernameRegex = /^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fffa-zA-Z0-9_-]+$/;
		if(!inputUsername || !usernameRegex.test(inputUsername)) {
			toast["error"]("用户名只能包含中文、英文、日文平假名、日文片假名、数字、下划线、横杠！", "消息");
			return;
		}
		if(inputPassword !== inputPassword2) {
			toast["error"]("两次密码输入不相同！", "消息");
			return;
		}
		// 校验邮箱格式
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!inputEmail || !emailRegex.test(inputEmail)) {
			toast["error"]("请输入有效的邮箱地址！", "消息");
			return;
		}
		// 这里可以进行登陆密码验证
		axios.request({
			method: "POST",
			url: `${API_HOST}/user/sign-up`,
			data: {
				username: inputUsername,
				password: inputPassword,
				email: inputEmail
			}
		}).then((res) => {
			console.log("sign-up res", res);
			if (res.data != null && res.data.code === 200) {
				// 跳转到dashboard页面
				console.log("replace history to login, value:", value);
				navigate(`/login`);
			} else {
				toast["error"]("注册失败", "消息");
			}
		});
	};

	const refreshUsername = () => {
		setInputUsername(generateUsername());
	};

	const toLogin = () => {
		navigate(`/login`);
	};

	const handleChangeForUsername = (e: any) => {
		setInputUsername(e.target.value);
	};

	const handleChangeForEmail = (e: any) => {
		setInputEmail(e.target.value);
	};

	const handleChangeForPassword = (e: any) => {
		setInputPassword(e.target.value);
	};

	const handleChangeForPassword2 = (e: any) => {
		setInputPassword2(e.target.value);
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
									value={inputUsername}
								></Input>
								<IconButton onClick={refreshUsername}>
									<RefreshIcon />
								</IconButton>
							</div>

							<div className="mb-3">
								<Input
									prefix={<MailOutlined className="site-form-item-icon" />}
									placeholder="邮箱"
									className="w-80"
									size="large"
									type="email"
									onChange={handleChangeForEmail}
									value={inputEmail}
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

							<div className="mb-3 bg-glass">
								<Input
									placeholder="重复密码"
									size="large"
									prefix={<KeyOutlined className="site-form-item-icon" />}
									type="password"
									className="w-80"
									onChange={handleChangeForPassword2}
									defaultValue={inputPassword2}
								></Input>
							</div>

							<div className="mb-3 flex flex-row justify-center">
								<Button
									type="primary"
									size="large"
									className="w-80"
									onClick={handleFormSaved}
								>
									注册
								</Button>
							</div>

							<div className="mb-3 flex flex-row justify-center">
								<Button
									type="primary"
									size="large"
									className="w-80"
									onClick={toLogin}
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
});

export default RegisterRoute;