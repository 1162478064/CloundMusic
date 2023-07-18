import request from '@/request/index.js'

// 获取用户歌单
export function GetUserSongSheet(data) {
    return request({
        url: '/user/playlist',
        method: 'get',
        params: data
    })
}

// 获取账号信息
export function GetAccount(){
    return request({
        url: '/user/account',
        method: 'get'
    })
}

// 获取用户详情 uid
export function GetUserDetail(data){
    return request({
        url: '/user/detail',
        method: 'get',
        params: data
    })
}
    
// 更新用户信息
// gender: 性别 0:保密 1:男性 2:女性
// birthday: 出生日期,时间戳 unix timestamp
// nickname: 用户昵称
// province: 省份id
// city: 城市id
// signature：用户签名
export function SetUserDetail(data) {
    return request({
        url: '/user/update',
        method: 'get',
        params: data
    })
}

// 更新头像
export function SetUseravatar(data) {
    return request({
        url: '/avatar/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data
    })
}