import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumId: '',  // 专辑id
    albumDetail: '',  // 专辑详情
    songs: [],   // 专辑收录歌曲
  },

  // 后退至上个页面
  back() {
    wx.navigateBack()
  },

  // 获取专辑详情
  async getAlbumDetail(id) {
    let res = await request('/album', { id })
    this.setData({ albumDetail: res.album})
    this.setData({ songs: res.songs })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({ albumId: id})
    this.getAlbumDetail(id)
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