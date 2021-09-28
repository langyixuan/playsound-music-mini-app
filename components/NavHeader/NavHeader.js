// components/NavHeader/NavHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 定义headerText的默认值
    title: {
      type: String,
      value: 'Header Text',
    },
    // 跳转详情页的路由
    router: {
      type: String,
      value: ''
    },
    // 是否显示更多按钮
    showmore: {
      type: String,
      value: 'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转至相应详情页的方法
    toDetailPage() {
      wx.navigateTo({
        url: this.data.router,
      })
    }
  }
})
