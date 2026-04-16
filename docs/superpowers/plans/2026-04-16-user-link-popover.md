# UserLink 悬浮面板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将需求详情页创建人/更新人显示为带悬浮信息面板的用户链接，点击跳转至 `/user?uid=` 路由。

**Architecture:** 新建 `UserLink` 自定义 amis 表单项渲染器（`@FormItem({ type: 'user-link' })`），通过 `uidField`/`usernameField`/`emailField`/`statusField` props 指定从 amis 数据上下文中读取的字段名，内部使用 antd `Popover` 实现悬浮面板，`env.jumpTo()` 实现 SPA 跳转。注册副作用通过在 `Detail.tsx` 顶部 import 触发。

**Tech Stack:** React 18, amis-core 6.4.0 (`FormItem` decorator), antd 5.12.1 (`Popover`/`Avatar`/`Tag`/`Divider`), `@ant-design/icons` (`UserOutlined`)

---

## 文件变更

| 操作 | 文件 |
|------|------|
| 新增 | `src/components/UserLink.tsx` |
| 修改 | `src/pages/main/req/Detail.tsx` |

---

### Task 1：创建 UserLink 组件

**Files:**
- Create: `src/components/UserLink.tsx`

- [ ] **Step 1：新建文件，写入完整组件实现**

创建 `src/components/UserLink.tsx`，内容如下：

```tsx
import React from 'react';
import { FormItem } from 'amis-core';
import { Popover, Avatar, Tag, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
	env?: any;
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
@(FormItem as any)({ type: 'user-link' })
class UserLinkRenderer extends React.Component<UserLinkProps> {
	handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const { uidField, data, env } = this.props;
		const uid = uidField ? data?.[uidField] ?? '' : '';
		env?.jumpTo(`/user?uid=${uid}`);
	};

	render() {
		const { uidField, usernameField, emailField, statusField, data } = this.props;
		const uid = String(uidField ? data?.[uidField] ?? '' : '');
		const username = String(usernameField ? data?.[usernameField] ?? '' : '');
		const email = String(emailField ? data?.[emailField] ?? '' : '');
		const userStatus = String(statusField ? data?.[statusField] ?? '' : '');

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
				<a href={`/user?uid=${uid}`} onClick={this.handleClick}>
					{username}
				</a>
			</Popover>
		);
	}
}

export default UserLinkRenderer;
```

- [ ] **Step 2：确认文件存在且无编译报错**

在 IDE 中打开 `src/components/UserLink.tsx`，确认 TypeScript 无红色报错（`@FormItem as any` 的 cast 可能触发 lint 警告，属正常）。

- [ ] **Step 3：提交**

```bash
git add src/components/UserLink.tsx
git commit -m "feat(REQ-1): 新增 UserLink 自定义 amis 渲染器，支持悬浮用户信息面板"
```

---

### Task 2：更新 Detail.tsx，接入 UserLink

**Files:**
- Modify: `src/pages/main/req/Detail.tsx`

- [ ] **Step 1：在顶部 import 中添加 UserLink 的注册副作用**

在 `src/pages/main/req/Detail.tsx` 第 6 行（现有 import 末尾）之后添加一行：

```tsx
import '@/components/UserLink';
```

完整 import 区域应如下：

```tsx
import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AMisRenderer from "@/components/AMisRenderer";
import PermissionStore from "@/stores/PermissionStore";
import { API_HOST } from "@/utils/adaptors";
import '@/components/UserLink';
```

- [ ] **Step 2：将创建人的 service body 替换为 user-link 类型**

找到创建人部分（`service` 组件的 `body`），将当前内容：

```tsx
body: {
    type: "tpl",
    label: "创建人",
    tpl: `<a href="/user?uid=\${createdByUid}" title="UID: \${createdByUid}&#10;用户名: \${createdByName}&#10;邮箱: \${createdByEmail}&#10;状态: \${createdByStatus}">\${createdByName}</a>`
}
```

替换为：

```tsx
body: {
    type: "user-link",
    label: "创建人",
    uidField: "createdByUid",
    usernameField: "createdByName",
    emailField: "createdByEmail",
    statusField: "createdByStatus"
}
```

- [ ] **Step 3：将更新人的 service body 替换为 user-link 类型**

找到更新人部分（`service` 组件的 `body`），将当前内容：

```tsx
body: {
    type: "tpl",
    label: "更新人",
    tpl: `<a href="/user?uid=\${updatedByUid}" title="UID: \${updatedByUid}&#10;用户名: \${updatedByName}&#10;邮箱: \${updatedByEmail}&#10;状态: \${updatedByStatus}">\${updatedByName}</a>`
}
```

替换为：

```tsx
body: {
    type: "user-link",
    label: "更新人",
    uidField: "updatedByUid",
    usernameField: "updatedByName",
    emailField: "updatedByEmail",
    statusField: "updatedByStatus"
}
```

- [ ] **Step 4：手动验证**

启动开发服务器，打开一个有创建人/更新人数据的需求详情页，验证：

1. 创建人/更新人字段显示为蓝色链接
2. 鼠标悬停后出现悬浮面板，显示头像占位、用户名、UID、邮箱、状态标签
3. 状态标签颜色正确（ACTIVE 绿色，BANNED 红色，DELETED 灰色）
4. 点击链接触发路由跳转至 `/user?uid=<uid>`，未刷新整页（SPA 跳转）

- [ ] **Step 5：提交**

```bash
git add src/pages/main/req/Detail.tsx
git commit -m "feat(REQ-1): 需求详情页创建人/更新人接入 UserLink 悬浮面板"
```