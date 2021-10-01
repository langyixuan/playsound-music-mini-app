import request from '../../utils/request'
import { debounce, unique } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeObj: [],   // 推荐歌曲类别
    hotSearchList: [],   // 热搜列表
    keywords: '',   // 输入搜索关键字
    searchList: [],   // 模糊匹配搜索结果数据
    history: [],   // 搜索历史
  },

  // 获取热搜列表
  async getHotSearch() {
    let res = await request('/search/hot/detail')
    this.setData({ hotSearchList: res.data.slice(5, 15)})
    console.log(res)
  },

  // 监听搜索框输入内容的变化
  handleInputChange: debounce(function (event) {
    this.setData({ keywords: event.detail.value.trim() })
    this.getSearchList()
  }, 1000),

  // 获取输入关键字模糊匹配搜索结果
  async getSearchList(){
    let res = await request('/search', {keywords: this.data.keywords, limit: 10})
    if (res.code === 200) {
      this.setData({ searchList: res.result.songs })
    }
  },

  // 进入搜索详情页面
  toSearchDetail(event) {
    let tempList = []
    tempList.push(event.currentTarget.id)
    if (!Array.prototype.isPrototypeOf(wx.getStorageSync('searchHistory'))) {
      wx.setStorageSync('searchHistory', [])
    }
    let historyList = wx.getStorageSync('searchHistory')
    wx.setStorageSync('searchHistory', unique([...historyList, ...tempList]))
    this.setData({ history: wx.getStorageSync('searchHistory')})
  },

  // 清空输入框
  clearInput() {
    this.setData({ keywords: '' })
  },

  // 跳转至推荐歌曲类型详情页
  toTypeDetail(event) {
    let { type } = event.currentTarget.dataset
    let typeObj = encodeURIComponent(JSON.stringify(type))
    wx.navigateTo({
      url: `/pages/recommendMusicType/recommendMusicType?typeObj=${typeObj}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeObj = [
      { type: 'POP', ch: '流行', tag:'流行', cover: 'https://coloredvinylrecords.com/pictures/w/we-lost-the-sea-departure-songs.png'},
      { type: 'R&B', ch: '节奏布鲁斯', tag: 'R&B/Soul', cover: 'https://coloredvinylrecords.com/pictures/m/magic-shoppe-live-in-london.png' },
      { type: 'ROCK', ch: '摇滚', tag: '摇滚', cover: 'https://coloredvinylrecords.com/pictures/t/the-seatbelts-cowboy-bebop-original-series-soundtrack.png' },
      { type: 'ELECTRONIC', ch: '电子', tag: '电子', cover: 'https://coloredvinylrecords.com/pictures/t/the-reflectors-first-impression.png' },
      { type: 'STUDY', ch: '学习', tag: '工作', cover: 'https://coloredvinylrecords.com/pictures/s/slime-sich-f-gen-hei-t-l-gen.png' },
      { type: 'RAP', ch: '说唱', tag: '说唱', cover: 'https://coloredvinylrecords.com/pictures/o/ofermod-thaumiel.png' },
      { type: 'SPORT', ch: '运动', tag: '运动', cover: 'https://coloredvinylrecords.com/pictures/w/witch-vomit-poisoned-blood-2.png' },
      { type: 'JAZZ', ch: '爵士', tag: '爵士', cover: 'https://coloredvinylrecords.com/pictures/f/frank-carter-the-rattlesnakes-blossom.png' },
    ]
    this.setData({ typeObj })
    this.getHotSearch()
    this.setData({ history: wx.getStorageSync('searchHistory')})
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