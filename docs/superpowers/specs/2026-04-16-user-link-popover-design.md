# UserLink 悬浮面板 — 设计文档

**日期**：2026-04-16
**范围**：需求详情页「创建人」「更新人」字段的用户链接组件

---

## 背景

`Detail.tsx` 中创建人/更新人目前通过 amis `tpl` 渲染带 `title` 属性的 `<a>` 标签。该方案无法支持富内容（头像、徽章等），且样式完全依赖浏览器原生 tooltip，体验较差。

---

## 目标

将用户名显示为可点击链接，鼠标悬停时弹出悬浮面板，展示该用户的基本信息；面板结构为后续扩展（如头像）预留空间。

---

## 不在范围内

- `/user?uid=` 对应的用户详情页实现
- 用户真实头像的接入（仅预留 UI 位置）
- 用户信息的独立 API 封装（复用 `service` 中已有的 `/user/get` 调用）

---

## 架构设计

### 新增文件

**`src/components/UserLink.tsx`**

使用 `amis-core` 的 `@FormItem({ type: 'user-link' })` 注册自定义 amis 表单项渲染器。

#### Props（由 amis 在传入前对 `${...}` 求值）

| Prop         | 类型     | 说明                              |
|--------------|----------|-----------------------------------|
| `uid`        | `string` | 用户 ID                           |
| `username`   | `string` | 用户名                            |
| `email`      | `string` | 邮箱                              |
| `userStatus` | `string` | 状态枚举值（见映射表）             |

#### 状态映射

| 枚举值    | 中文     | antd Tag color |
|-----------|----------|----------------|
| `ACTIVE`  | 常规用户 | `success`      |
| `BANNED`  | 封禁用户 | `error`        |
| `DELETED` | 注销用户 | `default`      |
| 其它/空   | 未知     | `default`      |

#### 悬浮面板布局

```
┌────────────────────────────────┐
│ [Avatar 48px]  用户名           │
│                UID: 123456     │
├────────────────────────────────┤
│  邮箱    user@example.com      │
│  状态    ● 常规用户             │
└────────────────────────────────┘
```

- antd `Popover`，`trigger="hover"`，`placement="bottomLeft"`
- 头像区：antd `Avatar`（`size=48`，`icon=<UserOutlined />`），未来接入真实头像只需加 `src` prop
- 状态使用 antd `Tag`

#### 跳转

点击用户名链接调用 `this.props.env.jumpTo('/user?uid=<uid>')`，与 `AMisRenderer.tsx` 中的 react-router 集成保持一致。

### 修改文件

**`src/pages/main/req/Detail.tsx`**

1. 顶部添加 `import '@/components/UserLink'`（触发注册副作用）
2. 创建人/更新人的 `service.body` 从 `type: "tpl"` 改为 `type: "user-link"`：

```json
{
    "type": "user-link",
    "label": "创建人",
    "uid": "${createdByUid}",
    "username": "${createdByName}",
    "email": "${createdByEmail}",
    "userStatus": "${createdByStatus}"
}
```

`responseData` 保持不变（已包含 `uid`、`username`、`email`、`userStatus` 四个字段）。

---

## 文件变更汇总

| 操作 | 文件                                |
|------|-------------------------------------|
| 新增 | `src/components/UserLink.tsx`       |
| 修改 | `src/pages/main/req/Detail.tsx`     |