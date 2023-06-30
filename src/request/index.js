import axios from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const severce = axios.create({
    baseURl: '',
    timeout: 5000
})

severce.interceptors.request.use(config => {
    config.headers['Authorization'] = 'netease-cloud-music-c2c1ys55f-cc-0820.vercel.app'
        return config
    }, error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

severce.interceptors.response.use(response => {
        const res = response.data
        if (res.code !== 200) {
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