// pages/payvip/payvip.js
var config = require('../../config.js');
var app = getApp();
var resource = config.service.resourceUrl;
var host = config.service.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: app.globalData.width,
    height: app.globalData.height,
    personnumber: 0,
    aa: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: host + '/video/vipdetail',
      success: function (res) {
        console.log(res.data)
        that.setData({
          vipdetail: res.data.vipdetail[0],
          personnumber: res.data.vipdetail[0].number+'',
        })
        //取出人数放入数组
        for (var i = 0; i < that.data.personnumber.length;i++){
          that.data.aa[i] = that.data.personnumber[i]
        }
        // var index = 0;
        // do {
        //   that.data.aa[index] = '' + parseInt((that.data.personnumber % (i * 10)) / i);
        //   index = index + 1;
        //   i = i * 10;
        // } while (i < that.data.personnumber)
        // //数组中调换位置
        // for (var x = 0; x < that.data.aa.length / 2; x++) {
        //   var middle = that.data.aa[x];
        //   that.data.aa[x] = that.data.aa[that.data.aa.length - 1 - x];
        //   that.data.aa[that.data.aa.length - 1 - x] = middle;
        // }
        that.setData({
          aa: that.data.aa
        })
      }
    })
  },
  buyvip: function () {
    var that = this
    wx.request({
      url: host + '/pay/prepay',
      data: {
        openid: app.data.user.openid,
        userid: app.data.user.userid,
        videoname: '无涯管理学院-' + that.data.vipdetail.type + "-VIP",
        videoprice: that.data.vipdetail.price,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success: function (res) {
        console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function () {
            app.data.user.isvip = 1;
            wx.navigateBack({
              delta: 1
            })
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
          },
          fail: function () {
            title: '支付失败'
          }
        })
      }
    })
  },
})