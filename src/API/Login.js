import request from '@/request/index.js'

// 二维码 key 生成接口
export function GetCreateKey() {
    return request({
        url: '/login/qr/key',
        method: 'get'
    })
}