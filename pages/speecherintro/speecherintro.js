// pages/speecherintro/speecherintro.js
var config = require('../../config.js');
var host = config.service.host;
var resource = config.service.resourceUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videourl: resource,
    speecherintroduction:'白铭宇：无涯演说家创始人、樊登读书会无涯分会会长、DISC国际认证顾问&讲师、五维教练领导力认证导师、《苏州演讲大师班》冠军、喜马拉雅认证主播粉丝6200+。'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: host + "/video/getPreachById",
      data: {
        //preachid: options.videoid,
        preachid: 1,
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          preach: res.data.preachdetail

        })
      },
    })
  },



  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  
})