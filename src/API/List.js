import request from '../request'

export function GetMusicList() {
    return request({
        url: '/homepage/block/page',
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