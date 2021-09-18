import request from '../../utils/request'
// 个人中心页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,   // 用户信息
    recentPlaylist: [],   // 最近播放记录
    likeMusic: [],   // 用户喜欢的音乐
    userPlaylist: []  // 用户私人歌单
  },

  // 跳转到登录界面
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 跳转到历史播放详情页
  toHistoryDetail(){
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },

  // 跳转到喜欢的音乐详情页
  toLikeMusicDetail(){

  },

  // 跳转到用户私人歌单详情页
  toUserPlaylistDetail() {
    
  },

  // 获取最近播放的音乐
  async getRecentPlaylist(uid) {
    let res = await request('/user/record', {
      uid,
      type: 1
    })
    this.setData({
      recentPlaylist: res.weekData
    })
    wx.setStorageSync('recentPlaylist', JSON.stringify(res))
  },

  // 获取喜欢的音乐ids
  async getLikeMusicIds(uid) {
    let idsRes = await request('/likelist/', {
      uid
    })
    // 根据音乐ids，获取音乐详情
    let ids = idsRes.ids.join(',')
    let muiscDetailRes = await request('/song/detail', { ids })
    this.setData({
      likeMusic: muiscDetailRes.songs.slice(0, 1)
    })
    // 将请求到喜欢的音乐详情存储在本地，方便后期做详情页使用
    wx.setStorageSync('likeMusicDetail', JSON.stringify(muiscDetailRes.songs))
  },

  // 获取用户歌单
  async getUserPlaylist(uid){
    let res = await request('/user/playlist', { uid })
    this.setData({
      userPlaylist: res.playlist.slice(1, 9)
    })
    // 将请求到的用户私人歌单数据存储在本地，方便后期做详情页使用
    wx.setStorageSync('userPlaylist', JSON.stringify(res.playlist))
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从本地存储中取出userInfo
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
      this.getLikeMusicIds(this.data.userInfo.userId)
      this.getRecentPlaylist(this.data.userInfo.userId)
      this.getUserPlaylist(this.data.userInfo.userId)
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