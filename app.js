// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 调用函数设置自定义导航栏信息
    this.setNavBarInfo()

    console.log(this)

  },
  // 全局数据管理
  globalData: {
    userInfo: null,
    // 自定义导航栏相关信息
    navBarHeight: 0,  // 导航栏高度
    menuBottom: 0, // 胶囊距离底部间距
    menuRight: 0,  // 胶囊距离右边间距
    menuHeight: 0,  // 胶囊高度
    // 标识全局音乐播放
    isMusicPlay: false,  // 是否有音乐在播放
    currentMusicId: '',  // 正在播放的音乐id
  },
  // 设置导航栏信息
  setNavBarInfo(){
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    // 获取胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    // 获取导航栏高度
    // 导航栏高度 = 状态栏到胶囊的间距(胶囊距上距离 - 状态栏高度)) * 2 + 状态栏高度 + 胶囊高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 
    + menuButtonInfo.height + systemInfo.statusBarHeight
    this.globalData.menuBottom = menuButtonInfo.top - systemInfo.statusBarHeight
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right
    this.globalData.menuHeight = menuButtonInfo.height
  }
})
