import { GetSongLyric, GetSongUrl } from "@/API/Description";
import moment from "moment";

export default {
    namespaced: true,
    state:{
        PlayLoad: true, // 是否是首次加载
        PlayerShow: false, // 是否展示播放器详情页
        SongSheet: [], // 播放器歌单详情
        Lyric: [], // 播放器当前歌词
        LyricPosition: 0, // 当前歌词定位
        Audio: new Audio(), // 生成一个全局播放器
        NowPlay: false, // 播放器当前是否播放
        NowActive: null, // 当前歌曲索引
        NowLevel: 'standard', // 播放品质
        NowScale: 0 // 当前进度百分比
    },
    getters: {},
    //里面定义方法，操作state方发
    mutations: {
        // 更改首次加载
        ChangePlayLoad(state, whether) {
            state.PlayLoad = whether;
        },
        // 是否展示音乐播放器详情框
        ChangePlayerShow(state, whether) {
            state.PlayerShow = whether;
        },
        // 给播放器歌单赋值
        ChangeSongSheet(state, Data) {
            state.SongSheet = Data;
        },
        // 更改播放器播放状态
        ChangePlayeStatus(state, whether) {
            const status = state.Audio.getAttribute('src');
            // 确保播放器没有加载成功的时候无法切换播放状态
            if(status) {
                state.NowPlay = whether;
            }
        },
        // 更改当前播放索引
        ChangeActive(state, index) {
            state.NowActive = index;
            state.NowScale = 0; // 切换歌曲后当前进度变为0
        },
        // 更改当前歌曲播放品质
        ChangeNowLevel(state, Level) {
            state.NowLevel = Level
        },
        // 更改当前进度百分比赋值
        ChangePlayerScale(state, whether) {
            const duration = state.Audio.duration == NaN ? 0 : state.Audio.duration || 0;
            const currentTime = duration * whether / 100;
            state.Audio.currentTime = currentTime; // 更改当前播放进度
            state.NowScale = whether;
        },
        // 更改播放器播放路径
        ChangePlayer(state, url) {
            state.Audio.setAttribute('src', url);
        },
        // 设置播放器事件
        PlayerLoading(state) {
            // 加载播放器数据时触发
            state.Audio.addEventListener('loadeddata', () => {
                this.dispatch('Player/GetSongLyric'); // 加载歌词
            })
            // 播放器进度改变触发
            state.Audio.addEventListener('timeupdate', () => {
                const duration = Number(state.Audio.duration) || 0;
                const currentTime = state.Audio.currentTime || 0;
                state.NowScale = currentTime / duration * 100;
                if(state.Lyric.length > 0) {
                    let Index = state.Lyric.findIndex(item => {
                      return item.time > currentTime
                    }, state.LyricPosition)
                    // 确保歌词定位最顶部和最尾部的时候不会改变
                    state.LyricPosition = Index >= 0 ? Index - 1 : state.Lyric.length - 1;
                }
            })
            // 播放器播放结束触发
            state.Audio.addEventListener('ended', () => {
                state.NowActive = state.NowActive < state.SongSheet.length ? state.NowActive+=1 : 0;
                state.NowScale = 0;
                state.LyricPosition = 0
                state.Lyric = []
            })
        },
        // 设置歌词内容
        ChangeLyric(state, Arr) {
            let Exit = [];
            Arr.forEach((item, index) => {
                const time = item.length > 0 ? item.match(/\[*(\S*)\]/)[1].split(":") : Arr[index - 1].match(/\[*(\S*)\]/)[1].split(":");
                const text = item.length > 0 ? item.slice(item.indexOf(']') + 1, item.length) : '';
                const obj = {
                    time: item.length > 0 ? parseInt(time[0]) * 60 + Math.ceil(time[1]) : parseInt(time[0]) * 60 + Math.ceil(time[1]) + 1,
                    text: text
                }
                if(obj.time >= 0) {
                    Exit.push(obj)
                }
            });
            Exit.sort((a, b) => { return a.time - b.time })
            state.Lyric = Exit;
            console.log(Exit);
        },
        // 设置歌词定位
        ChangeLyricPosition(state, position) {
            state.LyricPosition = position;
        }
    },
    // 操作异步操作mutation
    actions: {
        // 请求当前歌曲播放路径更改其播放器路径
        async GetSongUrl(state) {
            // 切换当前播放索引时先暂停播放器
            state.commit('ChangePlayeStatus', false);
            // 确保歌单为空的时候不报错
            if(state.state.SongSheet.length > 0) {
                await GetSongUrl({
                    id: state.state.SongSheet[state.state.NowActive].id,
                    level: state.state.NowLevel,
                }).then(res => {
                    state.commit('ChangePlayer', res.data[0].url);
                    // 判断是否是首次加载    把首次加载变为否定防止播放器首次加载用户没有操作无法触发的错误
                    state.commit(state.state.PlayLoad ? 'ChangePlayLoad' : 'ChangePlayeStatus', !state.state.PlayLoad);
                }).catch(err => {
                    GetSongUrl();
                })
            }
        },
        // 获取歌词
        async GetSongLyric(state) {
            const res = await GetSongLyric({ id: state.state.SongSheet[state.state.NowActive].id });
            state.commit('ChangeLyric', res.lrc.lyric.split('\n'));
        }
    }
}