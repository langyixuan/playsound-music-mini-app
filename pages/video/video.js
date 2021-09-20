import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoNavList: [],  // 视频导航标签列表
    navId: '',   // 当前视频标签ID
    currentVideoList: [],  // 当前标签对应视频详情列表
    currentPlayId: '',    // 当前播放的视频id
    videoPlayProgress: [],  // 记录视频历史播放进度
    isRefresher: false,   // 是否下拉刷新
    currentPage: 0,   // 当前请求的数据offset(页数)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoNavList()
  },

  // 获取视频标签列表
  async getVideoNavList() {
    let res = await request('/video/group/list')
    this.setData({
      videoNavList: res.data.slice(0, 10),
      navId: res.data[0].id   // 更新初始的navID
    })
    this.getCurrentTagVideo(this.data.navId)
  },

  // 获取当前标签视频集合
  async getCurrentTagVideo(id, offset=0) {
    let res = await request('/video/group', { id, offset })
    this.getVideoUrl(res.datas)
  },

  // 获取当前标签视频集合播放地址
  // 因为新版的接口里urlInfo为null，需要单独根据vid请求
  async getVideoUrl(currentVideoList){
    let ids = []
    currentVideoList.forEach(item => {
      ids.push(item.data.vid)
    })
    ids.forEach(async (id, index) => {
      let res = await request('/video/url', { id })
      currentVideoList[index].data.urlInfo = res.urls[0].url
    })
    // 数据加载成功，取消加载提示
    wx.hideLoading()
    // 数据加载成功后，取消下拉刷新提示
    this.setData({
      isRefresher: false
    })
    if (this.data.currentPage > 0) {
      var prevPageVideoList = this.data.currentVideoList
      prevPageVideoList.push(...currentVideoList)
    }
    setTimeout(() => {
      this.setData({
        currentVideoList: this.data.currentPage > 0 ?  prevPageVideoList : currentVideoList
      })
    }, 200) 
  },

  // 切换视频标签导航
  changeNav(event) {
    this.setData({
      navId: event.currentTarget.id * 1,  // 通过id向event传参的时候如果传递的类型是number会自动转换成字符串
      currentVideoList: []   // 提升用户体验，切换标签时不显示之前标签的视频
    })
    // 加载数据提示
    wx.showLoading({
      title: '正在疯狂加载中~',
    })
    // 切换标签时获取响应标签的数据
    this.getCurrentTagVideo(this.data.navId)
    this.setData({
      currentPage: 0
    })
  },

  // 控制视频播放
  handelVideo(event) {
    /**
     * 小程序自身没有办法处理禁止多个视频同时播放的问题
     * 处理方式：每次点击播放的时候，暂停上一个播放的视频（需要注意是同一个视频的问题）
     */
    let vid = event.currentTarget.id
    // this.vid !== vid && this.videoContext && this.videoContext.stop()
    // this.vid = vid
    this.videoContext = wx.createVideoContext(vid)
    // 判断当前的视频，是否有播放记录
    let playHistory = this.data.videoPlayProgress.find(item => item.vid === vid)
    if (playHistory) {
      this.videoContext.seek(playHistory.progressTime)
    }
    this.videoContext.play()
    this.setData({
      currentPlayId: vid
    })
  },

  // 监听当前播放视频的播放进度
  handelTimeUpdate(event) {
    // 定义一个视频播放进度的对象
    let currentVideoPlayProgress = {
      vid: event.currentTarget.id,
      progressTime: event.detail.currentTime   
    }
    let { videoPlayProgress } = this.data
    // 为了防止不同的向数组中push同一个视频的播放进度
    let videoItem = videoPlayProgress.find(item => item.vid === currentVideoPlayProgress.vid)
    if (videoItem) {
      videoItem.progressTime = event.detail.currentTime
    } else {
      videoPlayProgress.push(currentVideoPlayProgress)
    }
    this.setData({
      videoPlayProgress
    })
  },

  // 监听视频播放结束
  handelVideoEnd(event) {
    // 视频播放结束时，在视频历史播放进度数组中移除
    let { videoPlayProgress } = this.data
    videoPlayProgress.splice(videoPlayProgress.findIndex(item => item.vid === event.currentTarget.id), 1)
    this.setData({ videoPlayProgress })
  },

  // 自定义下拉刷新的回调(scroll-view))
  handleRefresher(){
    // 每次下拉刷新时，重新发送请求，请求最新的视频数据
    this.getCurrentTagVideo(this.data.navId)
    this.setData({
      isRefresher: true
    })
  },

  // scroll-views上滑触底时触发的回调
  handleScrollToLower(){
    let { currentPage } = this.data
    currentPage++
    this.setData({ currentPage })
    // 每次触底时请求下一页的视频数据
    this.getCurrentTagVideo(this.data.navId, this.data.currentPage)
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