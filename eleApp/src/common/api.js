import axios from 'axios'
// 带token的get
// @params 所带参数
export const rootNet = 'http://248n89g240.wicp.vip:16764/'

var doGetWithToken = function (subNet, params) {
  /**
   * subNet 域名 不包含第一个/
   * params 请求参数 对象{}
   */
  return axios.get(rootNet + subNet, {
    headers: {
      token: localStorage.getItem('token')
    },
    params: params
  })
}
var doGet = function (subNet, headers, params) {
  /**
   * subNet 域名 不包含第一个/
   * params 请求参数 对象{}
   */
  return axios.get(rootNet + subNet, {
    headers: headers,
    params: params
  })
}

var doPostWithToken = function (subNet, params) {
  return axios({
    method: 'POST',
    url: rootNet + subNet,
    data: params,
    headers: {
      token: localStorage.getItem('token')
    }
  })
}

export {
  doGet,
  doGetWithToken,
  doPostWithToken
}
