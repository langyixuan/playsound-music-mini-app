import request from '../../utils/request'
import PubSub from 'pubsub-js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',   // 歌单id
    playslitDetail: {},  // 歌单详情数据
    trackIds: '',   // 歌单中的歌曲ids
    songsDetail: [],   // 歌曲详情
  },

  // 后退至上个页面
  back() {
    wx.navigateBack()
  },

  // 获取歌单详情
  async getPlaylistDetail(id) {
    let res = await request('/playlist/detail', { id })
    let idsArr = []
    res.playlist.trackIds.forEach(item => {
      idsArr.push(item.id)
    })
    let trackIds = idsArr.join(',')
    this.setData({ playslitDetail: res.playlist, trackIds})
    this.getSongsDetail(trackIds)
  },

  // 获取歌曲详情 
  async getSongsDetail(ids) {
    let res = await request('/song/detail', { ids })
    this.setData({ songsDetail: res.songs })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id })
    this.getPlaylistDetail(options.id)

    // 订阅来自songDetail页面发送来的歌曲播放模式
    PubSub.subscribe('playMode', (msg, playMode) => {
      console.log(msg, playMode)
      // this.setData({ playMode })
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