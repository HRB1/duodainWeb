import axios from "axios";
const httpAxios = axios.create({
  timeout: 2000
});
//监听请求
httpAxios.interceptors.request.use(
  config => {
    return {
      ...config,
      ...config.headers,
      //讲用户标识传递
      headers: {
        Authorization:window.sessionStorage.getItem("userInfo")?JSON.parse(window.sessionStorage.getItem("userInfo")).token:''
      }
    };
  },
  error => {
    return Promise.reject(error);
  }
);
//监听响应
httpAxios.interceptors.response.use(
  res => {
    const { code } = res.data;
    //获取响应结果
    if (!code) {
      return res.data;
    }
    if(code==1&&res.data.status==200){
      return res.data;
    }
    return Promise.reject(res.data);
  },
  error => {
    return Promise.reject(error);
  }
);

export { httpAxios as axios };
