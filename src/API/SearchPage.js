import request from '@/request/index.js'

// 所有榜单内容摘要
export function GetSearchRanking() {
    return request({
        url: '/toplist',
        method: 'get'
    })
}

// 单个榜单详情
export function GetRankingDetail(data) {
    return request({
        url: '/playlist/detail',
        method: 'get',
        params: data
    })
}

// 默认搜索关键词
export function GetSearchDefault() {
    return request({
        url: '/search/default',
        method: 'get'
    })
}

// 搜索
export function GetSearch(data) {
    return request({
        url: '/search',
        method: 'get',
        params: data
    })
}