import axios from 'axios'

const getEnvItems = () => {
  const url = window.location.href
  if (url.includes('localhost') || url.includes('192')) {
    return {
      env: 'dev',
      baseApiURL: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/'
    }
  }
  // else if (url.includes('')) {
  //   return {
  //     env: 'beta',
  //     baseApiURL: 'http://18.163.56.205/api/'
  //   }
  // } else {
  //   return {
  //     env: 'production',
  //     baseApiURL: 'http://www.whovms.com/api/'
  //   }
  // }
}

const {
  baseApiURL
} = getEnvItems()
axios.defaults.baseURL = baseApiURL

// 带cookie请求
axios.defaults.withCredentials = false

// request拦截器
axios.interceptors.request.use(config => {
  let url = config.url
  // get参数编码
  if (config.method === 'get' && config.params) {
    url += '?'
    let keys = Object.keys(config.params)
    for (let key of keys) {
      url += `${key}=${encodeURIComponent(config.params[key])}&`
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
  }
  config.url = url
  return config
})

// response拦截
axios.interceptors.response.use(
  function (response) {
    // 返回响应时做一些处理
    // const {
    //   data
    // } = response
    // if (!data) {
    //   return {
    //     success: false,
    //     msg: 'Network Error',
    //     data: null,
    //     code: 404
    //   }
    // } else if (data.code === 200) {
    //   return {
    //     success: true,
    //     ...data
    //   }
    // } else {
    //   // server error
    //   return {
    //     success: false,
    //     ...data
    //   }
    // }
    return {
      success: true
    }
  },
  function (error) {
    console.log(error)
    // 当响应异常时做一些处理 http error
    if (!error || !error.response || !error.response.status) {
      return {
        success: false,
        msg: 'Network Error',
        data: null,
        code: 404
      }
    } else if (error.response.status === 404 || error.response.status === 500) {
      return {
        success: false,
        msg: error.response.statusText,
        data: null,
        code: error.response.status
      }
    } else if (error.response.status === 504) {
      return {
        success: false,
        msg: 'Timeout',
        data: null,
        code: error.response.status
      }
    } else if (error.response.status === 401) {
      return {
        success: false,
        msg: 'Authorization Error',
        data: null,
        code: error.response.status
      }
    } else if (error.response.status === 400) {
      return {
        success: false,
        msg: error.response.data.errorMessage,
        data: null,
        code: error.response.status
      }
    } else {
      return {
        success: false,
        msg: error.response.statusText,
        data: null,
        code: error.response.status
      }
    }
  }
)

// get请求
function get(url, data, options) {
  return axios.get(url, {
    ...options,
    params: data,
  })
}
// post请求
function post(url, data, options) {
  const op = {
    ...options
  }
  return axios.post(url, data, op)
}
// put请求
function put(url, data, options) {
  const op = {
    ...options
  }
  return axios.put(url, data, op)
}

// delete请求
function deleteApi(url, data, options) {
  const op = {
    ...options
  }
  return axios.delete(url, data, op)
}

// 导出使用
export {
  get,
  post,
  put,
  deleteApi,
}