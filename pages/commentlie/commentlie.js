// pages/commentlie/commentlie.js
var config = require('../../config.js');
var host = config.service.host;
var resource = config.service.resourceUrl;
var videoid;
Page({

  /**
   * 页面的初始数据
   */
  data: {


    comments: [{
      icon: 'images/cat.jpg',
      wxname: 'cat1',
      comment: '这里是第一条评论的内容'

    }, {
      icon: 'images/cat.jpg',
      wxname: 'cat2',
      comment: '这里是第二条评论的内容'
    }]

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    videoid=options.mmvideoid
    console.log(options)
    wx.request({
      url: host + '/video/showComment?videoid=' + options.mmvideoid,
      success: function (res) {
        console.log(res.data.comment)
        that.setData({
          commentlist: res.data.comment
        })
      }

    }),
 
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })
 },


  commentjump: function (e) {
    console.log("videoid"+videoid)
    wx.navigateTo({
      url: '../comment/comment?commentvideoid=' + videoid,
    })
  },
})