import React from 'react';
import { FormItem } from 'amis-core';
import { Popover, Avatar, Tag, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/** amis env 的���小接口定义喵~ */
interface AmisEnv {
	jumpTo: (url: string, action?: any) => void;
}

/** 用户状态枚举到中文标签与颜色的映射喵~ */
const STATUS_MAP: Record<string, { label: string; color: string }> = {
	ACTIVE: { label: '常规用户', color: 'success' },
	BANNED: { label: '封禁用户', color: 'error' },
	DELETED: { label: '注销用户', color: 'default' },
};

interface PopoverContentProps {
	uid: string;
	username: string;
	email: string;
	userStatus: string;
}

/**
 * 悬浮面板内容：用户基本信息卡片喵~
 */
function PopoverContent({ uid, username, email, userStatus }: PopoverContentProps) {
	const status = STATUS_MAP[userStatus] ?? { label: '未知', color: 'default' };
	return (
		<div style={{ minWidth: 220 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
				<Avatar size={48} icon={<UserOutlined />} />
				<div>
					<div style={{ fontWeight: 600, fontSize: 14 }}>{username}</div>
					<div style={{ color: '#888', fontSize: 12 }}>UID: {uid}</div>
				</div>
			</div>
			<Divider style={{ margin: '8px 0' }} />
			<div style={{
				display: 'grid',
				gridTemplateColumns: '40px 1fr',
				rowGap: 6,
				columnGap: 8,
				alignItems: 'center'
			}}>
				<span style={{ color: '#888', fontSize: 12 }}>邮箱</span>
				<span style={{ fontSize: 12 }}>{email}</span>
				<span style={{ color: '#888', fontSize: 12 }}>状态</span>
				<Tag color={status.color} style={{ marginInlineEnd: 0 }}>{status.label}</Tag>
			</div>
		</div>
	);
}

interface UserLinkProps {
	/** amis 数据上下文中存放 uid 的字段名喵~ */
	uidField?: string;
	/** amis 数据上下文中存放 username 的字段名喵~ */
	usernameField?: string;
	/** amis 数据上下文中存放 email 的字段名喵~ */
	emailField?: string;
	/** amis 数据上下文中存放 userStatus 的字段名喵~ */
	statusField?: string;
	/** amis 当前数据上下文喵~ */
	data?: Record<string, any>;
	/** amis env，用于 SPA 路由跳转喵~ */
	env?: AmisEnv;
}

/**
 * 自定义 amis 表单项渲染器：用户链接 + 悬浮信息面板喵~
 *
 * 使用方式（amis schema）：
 * ```json
 * {
 *   "type": "user-link",
 *   "label": "创建人",
 *   "uidField": "createdByUid",
 *   "usernameField": "createdByName",
 *   "emailField": "createdByEmail",
 *   "statusField": "createdByStatus"
 * }
 * ```
 *
 * @author liudongyu
 */
// amis-core FormItem 装饰器工厂暂不提供完整类型签名，强转 any 以规避 TS 报错喵~
@(FormItem as any)({ type: 'user-link' })
class UserLinkRenderer extends React.Component<UserLinkProps> {
	/** 从 amis 数据上下文中读取指定字段的字符串值喵~ */
	private getField(fieldKey: string | undefined): string {
		return String(fieldKey ? this.props.data?.[fieldKey] ?? '' : '');
	}

	handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const { uidField, env } = this.props;
		const uid = this.getField(uidField);
		env?.jumpTo(`/user?uid=${encodeURIComponent(uid)}`);
	};

	render() {
		const { uidField, usernameField, emailField, statusField } = this.props;
		const uid = this.getField(uidField);
		const username = this.getField(usernameField);
		const email = this.getField(emailField);
		const userStatus = this.getField(statusField);

		return (
			<Popover
				content={
					<PopoverContent
						uid={uid}
						username={username}
						email={email}
						userStatus={userStatus}
					/>
				}
				trigger="hover"
				placement="bottomLeft"
			>
				<a href={`/user?uid=${encodeURIComponent(uid)}`} onClick={this.handleClick}>
					{username}
				</a>
			</Popover>
		);
	}
}

export default UserLinkRenderer;