// pages/search/search.js
var config = require('../../config.js');
var host = config.service.host;
var resource = config.service.resourceUrl;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load: false,
    width: app.globalData.width,
    height: app.globalData.height,
    history: [],
    imgurl: resource,
    hide: true
  },
  input: function (e) {
    this.setData({
      input: e.detail.value
    })
  },
  clear: function (e) {
    this.setData({
      input: '',
      hide: true
    })
  },
  back: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  hide: function () {
    this.setData({
      hide: true
    })
  },
  search: function (e) {
    console.log(e)
    var that = this
    if (e.currentTarget.dataset.word) {
      this.setData({
        input: e.currentTarget.dataset.word
      })
    }
    else {
      if (that.data.input) {
        this.data.history.push(this.data.input)
        wx.setStorage({
          key: "history",
          data: this.data.history
        })
        this.setData({
          history: this.data.history
        })
      }
    }
    if (that.data.input) {
      that.setData({
        load: true,
        hide: false,
      })
      wx.request({
        url: host + '/video/searchvideo',
        data: { 
          message: that.data.input 
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (r) {
          console.log(r.data);
          that.setData({
            querylist: r.data.result,

            load: false
          })
        }
      })
    }
  },
  clearhistory: function (e) {
    var that = this;
    wx.removeStorage({
      key: 'history',
      success: function (res) {
        that.setData({
          history: [],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  jump: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../player/player?videoid=' + e.currentTarget.dataset.videoid,
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'history',
      success: function (res) {
        console.log(res.data)
        that.setData({
          history: res.data
        })
      },
      fail: function () {
        console.log(111)
        that.setData({
          history: []
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