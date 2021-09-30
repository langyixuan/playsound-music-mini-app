import request from '../../utils/request'
import PubSub from 'pubsub-js'
import { getTodayDate } from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayPlaylist: [],  // 今日推荐歌单
    today: [],   // 当天的日期
  },

  // 获取今日推荐歌单数据
  async getTodayPlaylist() {
    let res = await request('/recommend/resource')
    this.setData({ 
      todayPlaylist: res.recommend,
    })
  },

  // 跳转至歌单详情页面
  toPlaylistDetail(event) {
    wx.navigateTo({
      url: `/pages/playlistDetail/playlistDetail?id=${event.currentTarget.id}`,
    })
  },

  // 返回至上个页面
  back() {
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
    this.getTodayPlaylist()
    let today = getTodayDate()
    this.setData({ today })
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