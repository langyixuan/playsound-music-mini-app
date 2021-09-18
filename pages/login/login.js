import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },

  // 监听输入的回调事件
  handelInput(event) {
    let type = event.currentTarget.id  // 取值： phone / password
    this.setData({
      [type]: event.detail.value
    })
  },

  // 登录时的回调
  async login(){ 
    let { phone, password } = this.data
    // 前端验证输入的手机号和密码格式
    // 验证手机号是否为空
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return 
    } 
    // 验证手机号格式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }
    // 验证密码是否为空
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    }

    // 后端验证
    let res = await request('/login/cellphone', {phone, password})
    if (res.code == 200) {
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      // 登录成功，跳转到个人中心页
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
      // 登录成功，将个人信息存储在本地
      wx.setStorageSync('userInfo', JSON.stringify(res.profile))
      // 登录成功后，获取cookie并存储在本地
      wx.setStorageSync('loginCookie', res.cookie)
    } else if (res == 400) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'none'
      })
    } else if (res == 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})