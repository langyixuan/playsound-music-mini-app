import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    today: [],
    todaySongs: []
  },

  // 获取当日日期
  getTodayDate() {
    let today = []
    let date = new Date().getDate()
    today.push(date < 10 ? "0" + date : date)
    let month = new Date().getMonth() + 1
    today.push(month < 10 ? "0" + month : month)
    this.setData({ today })
  },

  // 获取今日推荐歌曲
  async getTodayRecommendSongs(){
    let res = await request('/recommend/songs')
    this.setData({
      todaySongs: res.data.dailySongs
    })
  },

  // 返回上个页面
  back(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 因为该页需要登录权限，所以先判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          // 跳转到登录界面
          wx.reLaunch({
            url: '/page/login/login'
          })
        }
      })
    }
    this.getTodayDate()
    this.getTodayRecommendSongs()
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