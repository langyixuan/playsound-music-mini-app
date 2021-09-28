// components/Navigation/Navigation.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 导航栏的背景颜色
    bgcolor: {
      type: String,
      value: ''
    },
    navPosition: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuBottom: app.globalData.menuBottom,
    menuRight: app.globalData.menuRight,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
