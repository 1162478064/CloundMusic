import request from '../request'

export function GetMusicList() {
    return request({
        url: '/homepage/block/page',
        method: 'get'
    })
}

// 轮播图
export function GetBanner(data) {
    return request({
        url: '/banner',
        method: 'get',
        params: data
    })
}

// 菜单
export function GetMenu() {
    return request({
        url: '/homepage/dragon/ball',
        method: 'get'
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

// 新歌速递 ? type=96 0 7 8 16
export function GetNewSong(data) {
    return request({
        url: '/top/song',
        method: 'get',
        params: data
    })
}

// 排行榜
export function GetRanking() {
    return request({
        url: '/toplist/detail',
        method: 'get'
    })
}