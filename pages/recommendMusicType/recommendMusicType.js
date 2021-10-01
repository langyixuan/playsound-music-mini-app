import request from '../../utils/request'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeObj: {},  // 歌曲类型
    playlists: [],  // 类型对应歌单
    offset: 0,  // 当前请求歌单数据偏移量
  },

  // 获取类型对应歌单
  async getTypePlaylist(cat, offset = 0) {
    let { tag } = this.data.typeObj
    let { playlists } = this.data
    let res = await request('/top/playlist', { cat, limit: 10, offset})
    if (offset > 0) {
      playlists.push(...res.playlists)
      this.setData({ playlists })
    } else {
      this.setData({ playlists: res.playlists })
    }
  },

  // 后退至上个页面
  back() {
    wx.navigateBack()
  },

  // 触底请求下一页数据
  handleScrollToLower() {
   let { offset } = this.data
   this.setData({ offset: offset + 10 })
   this.getTypePlaylist(this.data.typeObj.tag, this.data.offset)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const typeObj = JSON.parse(decodeURIComponent(options.typeObj))
    this.setData({ typeObj })
    this.getTypePlaylist(this.data.typeObj.tag)
    
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