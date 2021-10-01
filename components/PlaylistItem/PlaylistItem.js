// components/PlaylistItem/PlaylistItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlistItem: {
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
    // 进入歌单详情页面
    toPlaylistDetail(event) {
      wx.navigateTo({
        url: `/pages/playlistDetail/playlistDetail?id=${event.currentTarget.id}`,
      })
    }
  }
})
