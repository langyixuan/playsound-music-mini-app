import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newAlbum: [],   // 新碟上架数据
    rePlaylist1: [],   // 精品歌单
    rePlaylist2: [],
    reAlbum: [],   // 专辑推荐
    reAlbumDetail: [],  // 推荐专辑详情
    newSongs: [],   // 新歌速递数据
  },

  // 进入今日推荐详情页面
  toDailyDetail(event) {
    if (wx.getStorageSync('loginCookie')) {
      if (event.currentTarget.id === 'song') {
        wx.navigateTo({
          url: '/pages/recommendSong/recommendSong',
        })
      } else {
        wx.navigateTo({
          url: '/pages/recommendPlaylist/recommendPlaylist',
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 新碟上架
    let newAlbumData = await request('/top/album', {
      limit: 10,
      area: 'EA',
    })
    // 精选歌单
    let rePlaylistData = await request('/top/playlist', {
      limit: 10,
      cat: '欧美'
    })
    // 推荐专辑
    let reAlbumData = await request('/album/list', {
      limit: 5,
    })
    // 新歌速递
    let newSongsData = await request('/top/song', { type: 96})
    let newSongsArr = []
    for (let i = 0; i < 5; i++) {
      let obj = {}
      obj.newSong = newSongsData.data.slice(4*i, (i+1) * 4)
      newSongsArr.push(obj)
    } 

    /**
     * 获取推荐专辑详情
     * 由于推荐专辑接口中的数据不详细，不能满足显示需求，所以要带着相应专辑的id去再次请求专辑详情数据
     */
    let reAlbumIdsArr = []
    let reAlbumDetailData = []
    reAlbumData.products.forEach(item => {
      reAlbumIdsArr.push(item.albumId)
    })
    for(let i = 0; i < 5; i++) {
      let reAlbumDetailItem = await request('/album/detail', { id: reAlbumIdsArr[i]})
      reAlbumDetailData.push(reAlbumDetailItem)
    }

    // 改变初始化数据
    this.setData({
      newAlbum: newAlbumData.monthData.slice(0, 7),
      rePlaylist1: rePlaylistData.playlists.slice(0, 5),
      rePlaylist2: rePlaylistData.playlists.slice(5, 10),
      reAlbum: reAlbumData.products,
      reAlbumDetail: reAlbumDetailData,
      newSongs: newSongsArr
    })

    /**测试数据 */
    // console.log(newAlbumData)
    // console.log(rePlaylistData)
    // console.log(reAlbumData)
    
    // console.log()
    // setTimeout(() => {
    //   console.log(this.data.reAlbumDetail)
    // }, 600)
    // console.log(this.data.reAlbumDetail)
  },

  toDetail(){
   
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