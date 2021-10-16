import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerId: '',  // 歌手ID
    singerDetail: {},  // 歌手详情
    currentNav: 0,  // 当前导航对应swiper-item的index
    songsDetail: [],  // 歌手歌曲详情
  },

  // 后退至上个页面
  back() {
    wx.navigateBack()
  },


  // 获取歌手详情
  async getSingerDetail(id) {
    let res = await request('/artist/detail', { id })
    this.setData({ singerDetail: res.data })
  },

  // 获取歌手热门歌曲
  async getSingerSongs(id) {
    let res = await request('/artist/top/song', { id })
    this.setData({ songsDetail: res.songs })
  },

  // 切换导航
  changeNav(event) { 
    this.setData({ currentNav: event.currentTarget.id })
  },

  // 切换swiper
  handelSwiper(event) {
    this.setData({ currentNav: event.detail.current })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({ singerId: id })
    this.getSingerDetail(id)
    this.getSingerSongs(id)
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