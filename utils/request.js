/**发送ajax请求的功能函数 */
import config from './config.js'
export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      // url: config.mobileHost + url,
      url: config.host + url,
      data,
      method,
      success: (res) => {
        console.log('请求成功', res)
        resolve(res.data)
      },
      fail: (error) => {
        console.log('请求失败', error)
      }
    })
  })
}