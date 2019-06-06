import axios from 'axios'
/**
 * The root directory of the website with the "/"
 */
export const rootNet = 'http://120.79.55.82:8080/'

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
/**
 *
 * @param {*String} subNet
 * @param {*parms}  params
 * @return
 */
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
