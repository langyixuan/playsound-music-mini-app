import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',  // 操作的类型
    uid: '',   // 用户id
    songs: []
  },

  // 返回至上个页面
  back() {
    wx.navigateBack()
  },
  
  // 获取用户播放历史
  async getPlayHistory(uid) {
    let res = await request('/user/record', { uid })
    let historySongs = []
    historySongs =  res.allData.map(item => item.song)
    this.setData({ songs: historySongs })
  },

  // 获取用户喜欢的音乐
  async getLikeSongs(uid) {
    let res = await request('/likelist', { uid })
    let ids = res.ids.join(',')
    let likeSongs = await request('/song/detail', { ids })
    this.setData({ songs: likeSongs.songs })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ type: options.type })
    this.setData({ uid: options.uid })
    if (options.type === "历史播放") {
      this.getPlayHistory(options.uid)
    } else {
      this.getLikeSongs(options.uid)
    }
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