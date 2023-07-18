import axios from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const severce = axios.create({
    baseURl: 'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app',
    timeout: 10000
})

severce.interceptors.request.use(config => {
        // config.headers['Content-Type'] = config.url == '/avatar/upload' ? 'multipart/form-data' : 'application/json;charset=utf-8';
        config.headers['Authorization'] = 'netease-cloud-music-c2c1ys55f-cc-0820.vercel.app'
        return config
    }, error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

severce.interceptors.response.use(response => {
        const res = response.data;
        const QR_Code = [200, 800, 801, 802, 803];
        if (QR_Code.indexOf(res.code) === -1) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    }, error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default severce