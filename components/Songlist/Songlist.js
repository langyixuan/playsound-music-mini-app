// components/Songlist/Songlist.js
import PubSub from 'pubsub-js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 歌曲列表数据
    songsDetail: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,   // 当前点击歌曲在歌曲列表中的索引值
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转至歌曲详情页面
    toSongdDetail(event) {
      let { songinfo, index } = event.currentTarget.dataset
      let songInfo = encodeURIComponent(JSON.stringify(songinfo))
      wx.navigateTo({
        url: `/pages/songDetail/songDetail?songInfo=${songInfo}`,
      })
      this.setData({ index })
    },
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  lifetimes: {
    attached() {
      // 订阅来自songDetail页面发送来的歌曲播放模式
      PubSub.subscribe('switchType', (msg, typeObj) => {
        let switchType = typeObj.switchmode
        let playMode = typeObj.playmode
        let { songsDetail, index } = this.data
        console.log(songsDetail)
        console.log(index)
        switch (playMode) {
          case 0:  // 列表循环
            if (switchType === 'prev') {
              // 如果在第一首歌曲上触发上一首操作，则跳到最后一首
              if (index === 0) {
                index = songsDetail.length - 1
              } else {
                index -= 1
              }
            } else {
              // 如果在第最后一首歌曲上触发下一首操作，则跳到第一首
              if (index === songsDetail.length - 1) {
                index = 0
              } else {
                index += 1
              }
            }
            break
          case 2:   //随机播放
            let randomIndex = Math.floor(Math.random() * songsDetail.length)
            while (randomIndex === index) {
              randomIndex = Math.floor(Math.random() * songsDetail.length)
            }
            index = randomIndex
            break
          default:  // 单曲循环
            index = index
        }

        this.setData({ index })
        let songData = songsDetail[index]
        PubSub.publish('currentSongData', songData)
      })
    },

     // 在组件实例被从页面节点树中移除时执行
     detached() {
       PubSub.unsubscribe('switchType')
     },
  }
})