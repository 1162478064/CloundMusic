import request from '@/request/index.js'

// 歌单/排行榜 详情
export function GetSingDetail(data) {
    return request({
        url: '/playlist/detail',
        method: 'get',
        params: data
    })
}

// 获取歌单所有歌曲
export function GetSingAllSong(data) {
    return request({
        url: '/playlist/track/all',
        method: 'get',
        params: data
    })
}

// 单个歌曲信息 - 获取音乐 url - 新版
// id : 音乐 id
// level: 播放音质等级, 分为
// standard => 标准,
// higher => 较高,
// exhigh=>极高,
// lossless=>无损,
// hires=>Hi-Res,
// jyeffect => 高清环绕声,
// sky => 沉浸环绕声,
// jymaster => 超清母带
export function GetSongUrl(data) {
    return request({
        url: '/song/url/v1',
        method: 'get',
        params: data
    })
}

// 获取歌词
// id 音乐id
export function GetSongLyric(data) {
    return request({
        url: '/lyric/new',
        method: 'get',
        params: data
    })
}