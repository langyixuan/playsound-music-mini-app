import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoNavList: [],  // 视频导航标签列表
    navId: '',   // 当前视频标签ID
    currentVideoList: [],  // 当前标签对应视频详情列表
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
  async getCurrentTagVideo(id) {
    let res = await request('/video/group', { id })
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
    console.log(currentVideoList)
    setTimeout(() => {
      this.setData({
        currentVideoList
      })
    }, 200) 
  },

  // 切换视频标签导航
  changeNav(event) {
    this.setData({
      navId: event.currentTarget.id * 1  // 通过id向event传参的时候如果传递的类型是number会自动转换成字符串
    })
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.navId)
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