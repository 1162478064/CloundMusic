import request from '@/request/index.js'

// 二维码 key 生成接口
export function GetCreateKey(data) {
    return request({
        url: '/login/qr/key',
        method: 'get',
        params: data
    })
}

// 二维码生成接口  必选参数: key,由第一个接口生成  可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
export function GetCreateQR(data) {
    return request({
        url: '/login/qr/create',
        method: 'get',
        params: data
    })
}

// 二维码检测扫码状态接口  必选参数: key,由第一个接口生成
// 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies),如扫码后返回502,则需加上noCookie参数,如&noCookie=true
export function GetCheckoutQR(data) {
    return request({
        url: '/login/qr/check',
        method: 'get',
        params: data
    })
}