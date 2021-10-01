import request from '../../utils/request'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotTag: [],  // 热门歌单标签
    currentTag: '5001',  // 当前选中的tag
    currentTagName: '华语',  // 当前选中标签名称
    currentPlaylist: [],  // 当前tag对应歌单列表
    offset: 0,  // 当前请求的偏移数量（页数）
  },

  // 后退至上个页面
  back() {
    wx.navigateBack()
  },

  // 切换导航tag
  changeNav(event) {
    console.log(event)
  },

  // 获取当前选中的tag
  getCurrentTag(event) {
    let { hotTag } = this.data
    let tagObj = hotTag.find(tag => tag.id == event.detail.id)
    this.setData({ currentTag: event.detail.id, currentTagName: tagObj.name })
    this.getTagPlaylist(tagObj.name)
  },

  // 获取热门歌单tag列表
  async getPlaylistHotTag() {
    let res = await request('/playlist/hot')
    this.setData({ hotTag: res.tags })
  },

  // 获取tag对应歌单列表
  async getTagPlaylist(currentTagName, offset=0) {
    let res = await request('/top/playlist', { cat: currentTagName, limit: 10, offset})
    if (offset > 0) {
      let { currentPlaylist } = this.data
      currentPlaylist.push(...res.playlists)
      this.setData({ currentPlaylist })
    } else {
      this.setData({ currentPlaylist: res.playlists })
    } 
  },

  // scroll-view触底时请求下页歌单数据
  handleScrollToLower() {
   let { offset } = this.data
   this.setData({ offset: offset + 10 })
   this.getTagPlaylist(this.data.currentTagName, this.data.offset)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlaylistHotTag()
    this.getTagPlaylist(this.data.currentTagName)
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