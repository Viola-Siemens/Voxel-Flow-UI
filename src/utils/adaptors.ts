export const API_HOST = "http://127.0.0.1:8078";

export const UNAUTHORIZED_ADAPTOR = "if (!payload) { window.location.href = '#/login'; return { status: 1 }; } if (payload.code === 401 || payload.status === 401) { window.location.href = '#/login'; return { status: 1 }; } if (payload.code === 200) { return { status: 0, data: payload.data }; } else { return { status: 1, msg: '获取数据失败' }; }"