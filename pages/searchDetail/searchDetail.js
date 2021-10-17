import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',  // 搜索关键字
    songs: [],   // 搜索歌曲
    singers: [],  // 搜索歌手
    albums: [],  // 搜索专辑
    playlists: [],  // 搜索歌单
  },

  // 返回至上个页面
  back() {
    wx.navigateBack()
  },

  // 获取搜索结果（单曲）
  async getSongs(keyword) {
    let res = await request('/cloudsearch', {keywords: keyword, type: 1, limit: 10})
    this.setData({ songs: res.result.songs})
  },

  // 获取搜索结果（歌手）
  async getSingers(keyword) {
    let res = await request('/cloudsearch', { keywords: keyword, type: 100, limit: 5 })
    this.setData({ singers: res.result.artists })
  },

  // 获取搜索结果（专辑）
  async getAlbums(keyword) {
    let res = await request('/cloudsearch', { keywords: keyword, type: 10, limit: 10 })
    this.setData({ albums: res.result.albums })
  },

  async getPlaylists(keyword) {
    let res = await request('/cloudsearch', { keywords: keyword, type: 1000, limit: 10 })
    this.setData({ playlists: res.result.playlists })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let keyword = options.keyword
    this.setData({keyword: options.keyword})
    this.getSongs(keyword)
    this.getSingers(keyword)
    this.getAlbums(keyword)
    this.getPlaylists(keyword)
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