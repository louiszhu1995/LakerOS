// 配置axios
import axios from "axios"
import router from "../router/index.js"
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 开发环境下是使用代理
// axios.defaults.baseURL = process.env.NODE.ENV==="development"? "/api":""

// 代码运行在不同的环境下，配置会不一样，最常见的是服务器地址不同
// 设置不同开发环境下使用，下面是配置了一些不同环境下的服务器地址
let env = process.env.NODE_ENV;
switch (env) {
    case "development":
        axios.defaults.baseURL ="/api"
        break
    case "production":
        axios.defaults.baseURL ="/http://chst.vip"
        break
    case "test":
        axios.defaults.baseURL ="xxxxx"
        break
}

axios.create({
    withCredentials:true,
    timeout:7000
})


// 请求拦截器
// config就是被拦截器拦截掉的请求配置
axios.interceptors.request.use(config=>{
    // 登录是不需要拦截的
    if(config.url === "/users/login"){
        return config
    }else{
    //非登录请求都先拦截下来，将token携带到请求头里
        let token = localStorage.getItem("lol-token")
        config.headers["authorization"] = token;
        console.log(config.headers);
        return config //请求放行
    }
    
})

// 响应拦截器
    axios.interceptors.response.use(config=>{
        // config是响应对象
        // 1004表示校验失败
        // 10022表示登录状态失效
        let {code} =config.data
        if(code ===  "1004" || code === "10022"){
            // 清除token
            localStorage.removeItem("lol-token")
            // 跳转到登录页
            ElementUI.Message.error("登陆过期请重新登录")//弹出消息提示
            router.push("/login")
        }
        // console.log(config);
        return config;
    })


export default axios;
