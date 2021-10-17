// components/SingerItem/SingerItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    singerItem: {
      type: 'Object',
      value: ''
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
    toSingerDetail(event) {
      console.log(event)
      wx.navigateTo({
        url: `/pages/singerDetail/singerDetail?id=${event.currentTarget.id}`,
      })
    }
  }
})
