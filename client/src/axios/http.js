const axios = require('axios')

import { Loading } from 'element-ui'
import { Message } from 'element-ui';
// import router from './router/index'

let loading
let options = {
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0.7)'
}

function startLoading() {
    loading = Loading.service(options)
}

function endLoading() {
    loading.close()
}

//请求拦截//设置统一请求头
axios.interceptors.request.use(config => {
    startLoading();
    return config;
}, error => { return Promise.reject(error) })



//响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    endLoading();
    // Message.error(error.response.data);
    //获取错误状态码
    // const { status } = error.response
    // if (status == 401) {
        Message.error('未知错误!')
    //         //清楚token
    //     localStorage.removeItem('token')
    //     router.push('/login ')
    // }
    // if (status == 400&&error.response.data.msg) {
    //     Message.error(error.response.data.msg)
    // }


    return Promise.reject(error)
})



export default axios
// module.exports = axios