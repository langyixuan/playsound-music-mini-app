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
    hotSinger: [],  // 热门歌手
  },

  // 进入今日推荐详情页面
  toDailyDetail(event) {
    if (event.currentTarget.id === 'song') {
      wx.navigateTo({
        url: '/pages/recommendSong/recommendSong',
      })
    } else {
      wx.navigateTo({
        url: '/pages/recommendPlaylist/recommendPlaylist',
      })
    }
  },

  // 跳转至歌单详情页面
  toPlaylistDetail(event) {
    wx.navigateTo({
      url: `/pages/playlistDetail/playlistDetail?id=${event.currentTarget.id}`,
    })
  },

  // 进入歌曲详情页面
  async toSongDetail(event) {
    let id = event.currentTarget.id
    let res = await request('/song/detail', { ids: id })
    let songInfo = encodeURIComponent(JSON.stringify(res.songs[0]))
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?songInfo=${songInfo}`,
    })
  },

  // 进入歌手详情页面
  toSingerDetail(event) {
    wx.navigateTo({
      url: `/pages/singerDetail/singerDetail?id=${event.currentTarget.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 新碟上架
    let newAlbumData = await request('/top/album', {
      limit: 20,
      area: 'EA',
    })
    // 精选歌单
    let rePlaylistData = await request('/top/playlist', {
      limit: 10,
      cat: '欧美'
    })
    // 推荐专辑
    let reAlbumData = await request('/album/new', {
      area: 'EA',
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
    reAlbumData.albums.forEach(item => {
      reAlbumIdsArr.push(item.id)
    })
    for(let i = 0; i < 5; i++) {
      let reAlbumDetailItem = await request('/album', { id: reAlbumIdsArr[i]})
      reAlbumDetailData.push(reAlbumDetailItem)
    }

    // 获取热门歌手
    let hotSingerData = await request('/toplist/artist', { type: 2 })
    let hotSingerArr = []
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * hotSingerData.list.artists.length)
      if (!hotSingerArr.includes(hotSingerData.list.artists[randomIndex])) {
        hotSingerArr.push(hotSingerData.list.artists[randomIndex])
      }
    }

    // 改变初始化数据
    this.setData({
      newAlbum: newAlbumData.monthData.slice(10, 17),
      rePlaylist1: rePlaylistData.playlists.slice(0, 5),
      rePlaylist2: rePlaylistData.playlists.slice(5, 10),
      reAlbum: reAlbumData.products,
      reAlbumDetail: reAlbumDetailData,
      newSongs: newSongsArr,
      hotSinger: hotSingerArr
    })
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