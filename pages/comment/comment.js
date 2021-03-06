// pages/comment/comment.js
var config = require('../../config.js');
var host = config.service.host;
var resource = config.service.resourceUrl;
var videoid;
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    videoid=options.commentvideoid
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
  formSubmit:function(e){
    var that=this;
    var formData = e.detail.value.comments;
    console.log(formData)
    wx.request({
      url: host + '/video/savecomment?videoid=' + videoid  ,
      data: { comments: formData, userid: app.data.user.userid }, 
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      success: function (res) {
        wx.showToast({
          title: '提交成功,审批中',
          icon: 'success',
          duration: 2000
        })
      }
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