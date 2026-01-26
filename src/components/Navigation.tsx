import MenuItems from "@/components/MenuItems"
import React from "react";

class Navigation {
    title: string;
    url?: string;
    submenu?: Navigation[];

}

const navigation : Navigation[] = [
    {
        title: '首页',
        url: '/',
    },
    {
        title: '大盘',
        url: '/dashboard',
        submenu: [
            {
                title: '新建',
                submenu: [
                    {
                        title: '新建需求',
                        url: '/list/req/new'
                    },
                    {
                        title: '新建故事',
                        url: '/list/story/new'
                    },
                    {
                        title: '新建缺陷',
                        url: '/list/bug/new'
                    },
                    {
                        title: '新建复盘单',
                        url: '/list/rts/new'
                    }
                ]
            },
            {
                title: '查看',
                submenu: [
                    {
                        title: '需求列表',
                        url: '/list/req'
                    },
                    {
                        title: '故事列表',
                        url: '/list/story'
                    },
                    {
                        title: '缺陷列表',
                        url: '/list/bug'
                    },
                    {
                        title: '复盘单列表',
                        url: '/list/rts'
                    }
                ]
            }
        ]
    },
    {
        title: '待办通知',
        submenu: [
            {
                title: '我的待办',
                url: '/todo'
            },
            {
                title: '我的通知',
                url: '/notification'
            }
        ]
    },
    {
        title: '个人中心',
        submenu: [
            {
                title: '我的信息',
                url: '/profile/info'
            },
            {
                title: '用户列表',
                url: '/profile/users'
            },
            {
                title: '修改密码',
                url: '/profile/change-password'
            },
            {
                title: '申请角色',
                url: '/profile/apply-role'
            }
        ]
    }
];

export const Navbar = () => (
    <nav className="desktop-nav">
        <ul className="menus">
            {navigation.map((menu, index) => (
                <MenuItems items={menu} key={index} depthLevel={0} />
            ))}
        </ul>
    </nav>
)