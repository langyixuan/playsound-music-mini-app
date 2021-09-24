import PubSub from 'pubsub-js'
import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songInfo: {},  // 歌曲详情数据
    isPlay: true,  // 是否播放
    songUrl: '',   // 当前歌曲播放地址
    currentTime: '00:00',   // 当前歌曲播放进度
    durationTime: '00:00',  // 当前歌曲总时长
    currentWidth: 0,   // 播放进度条实时长度
    lyricArr: [],   // 当前播放歌曲歌词
    currentTimeForLr: 0,  // 这个是没有格式化的实时播放的进度(单位：s)
    allKeys: [],  // 每条歌词对应时长
    playMode: 0,   // 歌曲播放模式(0: 列表循环 1： 单曲循环 2： 随机播放)
  },

  // 返回上一页
  back() {
    wx.navigateBack()
  },

  // 控制音乐播放 / 暂停
  handleMusicPlay(){
    let { isPlay, songUrl } = this.data
    isPlay = !isPlay
    // this.setData({ isPlay })
    this.musicControl(isPlay, this.data.songInfo.id, songUrl)
  },

  // 控制音乐播放 / 暂停的功能函数
  async musicControl(isPlay, id, songUrl) {
    if (isPlay) {
     if (!songUrl) {
       // 获取音乐url
       songUrl = await request('/song/url', { id })
      }
      this.setData({ songUrl })
      this.bgAudioManager.src = songUrl.data[0].url
      this.bgAudioManager.title = this.data.songInfo.name
    } else {
      this.bgAudioManager.pause()
    }
  },

  // 订阅来自recommendSong 页面的事件
  getCurrentSongData() {
    PubSub.subscribe('currentSongData', (msg, currentSongInfo) => {
      // 歌曲总时长（ms）
      let durationTime = this.formatMusicTime(currentSongInfo.dt / 1000)
      this.getSongLyric(currentSongInfo.id)
      this.setData({ songInfo: currentSongInfo, durationTime })
      this.musicControl(true, currentSongInfo.id)

      // 取消订阅, 防止重复触发
      PubSub.unsubscribe('currentSongData')
    })
  },

  // 歌曲切换功能 
  handleSwitch(event) {
    this.getCurrentSongData()
    // 给recommendSong页面发布歌曲切换的类型
    PubSub.publish('switchType', event.currentTarget.dataset )
  },

  // 格式化歌曲时长(秒——xx:xx)
  formatMusicTime(time) {
    let min = parseInt(time / 60)
    let sec = parseInt(time) % 60
    return `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
  },

  // 获取歌词数据
  async getSongLyric(id) {
    let res = await request('/lyric', { id })
    // 处理歌词格式
    let lyricContent = res.lrc.lyric 
    let lyricArr = []
    let lyrics = lyricContent.split('\n')
    let reg = /\[\d*:\d*(\.|:)\d*]/g
    for (let i = 0; i < lyrics.length; i++) {
      let lyricObj = {}
      let timeReg = lyrics[i].match(reg)
      if (!timeReg) continue
      let t = timeReg[0]
      let min = Number(t.match(/\[\d*/i).toString().slice(1))
      let sec = Number(t.match(/\:\d*/i).toString().slice(1))
      t = min * 60 + sec
      let content = lyrics[i].replace(timeReg, '')
      lyricObj.time = t
      lyricObj.lr = content
      lyricArr.push(lyricObj)
    }
    // 将每条歌词对应的时间保存起来，方便后期操作歌词
    let allKeys = []
    for (let obj of lyricArr) {
      allKeys.push(obj.time)
    }
    this.setData({ lyricArr, allKeys })
  },

  // 切换歌曲播放模式
  changePlayMode() {
    let { playMode } = this.data
    if (playMode < 2) {
      playMode++
    } else {
      playMode = 0
    }
    this.setData({ playMode })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过options参数取到从推荐歌曲页面传递进来的歌曲详情数据
    const songInfo = JSON.parse(decodeURIComponent(options.songInfo))
    // 歌曲总时长（ms）
    let durationTime = this.formatMusicTime(songInfo.dt / 1000)
    // 获取当前歌曲歌词
    this.getSongLyric(songInfo.id)
    this.setData({ songInfo, durationTime })
    // 获取全局唯一的背景音频管理器
    this.bgAudioManager = wx.getBackgroundAudioManager()
    // 监听背景音乐的播放 / 暂停 / 停止
    this.bgAudioManager.onPlay(() => {
      this.setData({ isPlay: true })
    })
    this.bgAudioManager.onPause(() => {
      this.setData({ isPlay: false })
    })
    this.bgAudioManager.onStop(() => {
      this.setData({ isPlay: false })
    })
    this.bgAudioManager.onEnded(() => {
      // 歌曲结束后，自动切换至下一首
      PubSub.publish('switchType', 'next')
      this.getCurrentSongData()
    })

    this.musicControl(true, this.data.songInfo.id)

    // 监听背景音乐的播放进度更新事件
    this.bgAudioManager.onTimeUpdate(() => {
      // 获取当前音乐实时播放的位置
      let currentTime = this.formatMusicTime(this.bgAudioManager.currentTime)
      let currentWidth = this.bgAudioManager.currentTime / this.bgAudioManager.duration * 100
      let currentTimeForLr = this.bgAudioManager.currentTime
      this.setData({ currentTime, currentWidth, currentTimeForLr})
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