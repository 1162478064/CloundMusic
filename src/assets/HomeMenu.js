const MenuList = [{
    icon: 'iconamoon:calendar-1-fill',
    name: '每日推荐',
    horizontalFlip: false
}, {
    icon: 'icon-park-solid:radio',
    name: '私人漫游',
    horizontalFlip: false
}, {
    icon: 'mdi:form',
    name: '歌单',
    horizontalFlip: false
}, {
    icon: 'icon-park-solid:ranking-list',
    name: '排行榜',
    horizontalFlip: false
}, {
    icon: 'bxs:book-heart',
    name: '有声书',
    horizontalFlip: false
}, {
    icon: 'bxs:album',
    name: '数字专辑',
    horizontalFlip: false
}, {
    icon: 'simple-icons:livewire',
    name: '直播',
    horizontalFlip: false
}, {
    icon: 'vaadin:user-heart',
    name: '关注新歌',
    horizontalFlip: false
}, {
    icon: 'mdi:cards',
    name: '一歌一遇',
    horizontalFlip: false
}, {
    icon: 'mdi:court-hammer',
    name: '收藏家',
    horizontalFlip: true
}, {
    icon: 'fa6-solid:gamepad',
    name: '游戏专区',
    horizontalFlip: false
}];

const calendar = [
    {
        title: '云村专访AK刘影: 靠才华的命硬',
        img: 'https://p2.music.126.net/WPHAmuqQaaQGIcx199t5XQ==/3272146613241669.jpg'
    }, {
        title: '姜云生&NIAN的最新作品: 解药',
        img: 'https://p2.music.126.net/cpZSb2GhX9PH4beMxQuapg==/109951166455937461.jpg'
    }
];

const SidaberSetting = [{
    Arr: [{
            icon: 'envelop-o',
            name: '我的消息'
        }, {
            icon: 'balance-o',
            name: '云贝中心'
        }, {
            icon: 'bulb-o',
            name: '创作者中心'
        }
    ]
}, {
    title: '音乐服务',
    Arr: [{
            icon: 'discount',
            name: '趣测',
            description: '点击查看今日运势'
        }, {
            icon: 'coupon-o',
            name: '云村有票'
        }, {
            icon: 'send-gift-o',
            name: '多多西西口袋'
        }, {
            icon: 'shop-o',
            name: '商城'
        }, {
            icon: 'upgrade',
            name: 'Beat专区',
            description: '顶尖制作邀请你创作'
        }, {
            icon: 'music-o',
            name: '口袋彩铃'
        }, {
            icon: 'tv-o',
            name: '游戏专区',
            description: '音乐浇灌治愈花园'
        }
    ]
}, {
    title: '设置',
    Arr: [{
            icon: 'setting-o',
            name: '设置'
        }, {
            icon: 'eye-o',
            name: '深色模式',
            silder: true
        }, {
            icon: 'underway-o',
            name: '定时关闭'
        }, {
            icon: 'user-o',
            name: '个性装扮'
        }, {
            icon: 'service-o',
            name: '边听变存',
            description: '未开启'
        }, {
            icon: 'debit-pay',
            name: '在线听歌免流量'
        }, {
            icon: 'close',
            name: '音乐黑名单'
        }, {
            icon: 'shield-o',
            name: '青少年模式',
            description: '未开启'
        }, {
            icon: 'tosend',
            name: '音乐闹钟'
        }
    ]
}, {
    Arr: [{
        icon: 'description',
        name: '我的订单'
    }, {
        icon: 'refund-o',
        name: '优惠卷'
    }, {
        icon: 'service-o',
        name: '我的客服'
    }, {
        icon: 'share-o',
        name: '分享网易云音乐'
    }, {
        icon: 'records',
        name: '个人信息收集与使用清单'
    }, {
        icon: 'cluster-o',
        name: '个人信息第三方共享清单'
    }, {
        icon: 'warn-o',
        name: '个人信息与隐私保护'
    }, {
        icon: 'info-o',
        name: '关于'
    }]
}]

// 底部导航栏路由
const Route = [
    {
        href: '/home',
        icon: 'eye-o',
        title: '发现',
        name: 'homePage'
    }, {
        href: '/podcast',
        icon: 'music-o',
        title: '播客',
        name: 'podcastPage'
    }, {
        href: '/my',
        icon: 'contact',
        title: '我的',
        name: 'myPage'
    }, {
        href: '/follow',
        icon: 'goods-collect-o',
        title: '关注',
        name: 'followPage'
    }, {
        href: '/community',
        icon: 'friends-o',
        title: '社区',
        name: 'communityPage'
    }
];

const podcastNavBar = [
    {
        name: 'podcast',
        title: '播客'
    }, {
        name: 'soundbook',
        title: '有声书'
    }, {
        name: 'brodcast',
        title: '广播剧'
    }, {
        name: 'listen',
        title: '听听'
    }
]

const communityNavBar = [
    {
        name: 'square',
        title: '广场'
    }, {
        name: 'video',
        title: '视频'
    }, {
        name: 'songhome',
        title: '歌房'
    }
]

export default {
    MenuList,
    calendar,
    SidaberSetting,
    Route,
    podcastNavBar,
    communityNavBar
}