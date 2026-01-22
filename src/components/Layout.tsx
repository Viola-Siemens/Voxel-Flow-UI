import React from 'react';
import { Outlet } from 'react-router-dom';
import { render, toast } from 'amis';

// 导航栏配置
const navigationSchema = {
    type: 'page',
    title: '系统导航',
    className: 'bg-white',
    body: {
        type: 'navbar',
        brand: {
            name: '管理系统',
            logo: '/static/logo.png',
            className: 'text-xl font-bold'
        },
        left: [
            {
                type: 'dropdown-button',
                label: '大盘',
                icon: 'fa fa-chart-line',
                buttons: [
                    {
                        type: 'dropdown-button',
                        label: '新建',
                        level: 'link',
                        size: 'sm',
                        buttons: [
                            {
                                type: 'button',
                                label: '新建需求',
                                icon: 'fa fa-plus-circle',
                                actionType: 'link',
                                link: '/dashboard/create/requirement'
                            },
                            {
                                type: 'button',
                                label: '新建故事',
                                icon: 'fa fa-book',
                                actionType: 'link',
                                link: '/dashboard/create/story'
                            },
                            {
                                type: 'button',
                                label: '新建缺陷',
                                icon: 'fa fa-bug',
                                actionType: 'link',
                                link: '/dashboard/create/bug'
                            },
                            {
                                type: 'button',
                                label: '新建复盘单',
                                icon: 'fa fa-clipboard-list',
                                actionType: 'link',
                                link: '/dashboard/create/retrospective'
                            }
                        ]
                    },
                    {
                        type: 'dropdown-button',
                        label: '查看',
                        level: 'link',
                        size: 'sm',
                        buttons: [
                            {
                                type: 'button',
                                label: '需求列表',
                                icon: 'fa fa-list',
                                actionType: 'link',
                                link: '/dashboard/list/requirement'
                            },
                            {
                                type: 'button',
                                label: '故事列表',
                                icon: 'fa fa-book-open',
                                actionType: 'link',
                                link: '/dashboard/list/story'
                            },
                            {
                                type: 'button',
                                label: '缺陷列表',
                                icon: 'fa fa-bug',
                                actionType: 'link',
                                link: '/dashboard/list/bug'
                            },
                            {
                                type: 'button',
                                label: '复盘单列表',
                                icon: 'fa fa-clipboard-check',
                                actionType: 'link',
                                link: '/dashboard/list/retrospective'
                            }
                        ]
                    }
                ]
            },
            {
                type: 'dropdown-button',
                label: '代办通知',
                icon: 'fa fa-bell',
                buttons: [
                    {
                        type: 'button',
                        label: '我的代办',
                        icon: 'fa fa-tasks',
                        actionType: 'link',
                        link: '/todo/my'
                    },
                    {
                        type: 'button',
                        label: '我的通知',
                        icon: 'fa fa-bell',
                        actionType: 'link',
                        link: '/notification/my'
                    }
                ]
            },
            {
                type: 'dropdown-button',
                label: '个人中心',
                icon: 'fa fa-user',
                buttons: [
                    {
                        type: 'button',
                        label: '我的信息',
                        icon: 'fa fa-id-card',
                        actionType: 'link',
                        link: '/profile/info'
                    },
                    {
                        type: 'button',
                        label: '用户列表',
                        icon: 'fa fa-users',
                        actionType: 'link',
                        link: '/profile/users'
                    },
                    {
                        type: 'button',
                        label: '修改密码',
                        icon: 'fa fa-key',
                        actionType: 'link',
                        link: '/profile/change-password'
                    },
                    {
                        type: 'button',
                        label: '申请角色',
                        icon: 'fa fa-user-plus',
                        actionType: 'link',
                        link: '/profile/apply-role'
                    }
                ]
            }
        ],
        right: [
            {
                type: 'button',
                label: '退出登录',
                icon: 'fa fa-sign-out-alt',
                level: 'link',
                actionType: 'ajax',
                api: '/api/logout',
                confirmText: '确定要退出登录吗？',
                onSuccess: () => {
                    toast.success('退出成功');
                    window.location.href = '/login';
                }
            }
        ]
    }
};

// 主布局组件
const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* 顶部导航栏 */}
            <div className="sticky top-0 z-50 shadow-sm">
                {render(navigationSchema)}
            </div>

            {/* 页面内容区域 */}
            <div className="flex-1">
                <Outlet />
            </div>

            {/* 页脚（可选） */}
            <footer className="bg-gray-100 py-4 text-center text-gray-500 text-sm">
                VoxelFlow © ECNUMC 2026. MIT License.
            </footer>
        </div>
    );
};

export default Layout;