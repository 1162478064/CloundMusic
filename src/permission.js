import router from './router/router.js'
import { getToken } from '@/utils/auth'

const whiteList = ['/login'];// no redirect whitelist

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken();
    if(hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            console.log(to.path);
            next(`/login?redirect=${to.path}`)
        }
    }
})