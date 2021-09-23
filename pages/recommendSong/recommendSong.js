import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    today: [],   // 当天的日期
    todaySongs: [],  // 今日推荐歌曲数据
    index: 0,    // 当前播放歌曲在今日推荐歌曲列表中的索引值
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

  // 跳转到歌曲详情页面
  toSongDetail(event) {
    let { songinfo, index } = event.currentTarget.dataset
    let songInfo = encodeURIComponent(JSON.stringify(songinfo))
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?songInfo=${songInfo}`,
    })
    this.setData({ index })
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

    // 订阅来自songDetail页面发送来的数据
    PubSub.subscribe('switchType', (msg, type) => {
      let { todaySongs, index } = this.data
      if (type === 'prev') {
        // 如果在第一首歌曲上触发上一首操作，则跳到最后一首
        if (index === 0) {
          index = todaySongs.length - 1
        } else {
          index -= 1
        }  
      } else {
        // 如果在第最后一首歌曲上触发下一首操作，则跳到第一首
        if (index === todaySongs.length - 1) {
          index = 0
        } else {
          index += 1
        }
      }
      this.setData({ index })
      let songData = todaySongs[index]
      PubSub.publish('currentSongData', songData)
    })
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