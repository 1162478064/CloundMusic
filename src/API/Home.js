import request from '../request'

// 轮播图
export function GetBanner(data) {
    return request({
        url: '/banner',
        method: 'get',
        params: data
    })
}

// 推荐歌单 limit
export function GetRecommendedSong(data) {
    return request({
        url: '/personalized',
        method: 'get',
        params: data
    })
}

// 新歌新碟/数字专辑
export function GetNewSongs() {
    return request({
        url: '/album/list',
        method: 'get'
    })
}

// 排行榜
export function GetRanking() {
    return request({
        url: '/toplist',
        method: 'get'
    })
}