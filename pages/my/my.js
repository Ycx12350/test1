// pages/my/my.js
var config = require('../../config.js');
var resource = config.service.resourceUrl;
var utils = require('../../utils/util.js');
var host = config.service.host;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    isvip:0,
    imgurl:resource,
    width: app.globalData.width,
    height: app.globalData.height,
  },
  jump: function (e) {
    wx.navigateTo({
      url: '../player/player?videoid=' + e.currentTarget.dataset.videoid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var that = this;
    if(app.data.user){
      this.setData({
        isvip:app.data.user.isvip
      })
    wx.request({
      url: host + '/user/myoperation',
      data: {
        userid: app.data.userid,
        message: 'History'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          historylist: res.data.video,
          userInfo: app.globalData.userInfo,
        })
      }
      })
    }
  },
  onLoad: function (options) {
    if (options.uuid != null && options.uuid != "" && options.uuid != undefined) {

      wx.request({
        url: host + '/user/updatevip',
        data: {
          userid: app.data.user.userid,
          uuid: options.uuid
        },
        success: function (res) {
          console.log(res.data);
          if (res.data == 1) {
            wx.showToast({
              title: '恭喜成为会员',
            })
          }
        }
      });
    }
    if (options.shareuserid != null && options.shareuserid != "") {
      getApp().data.appshareuserid = options.shareuserid
    }
    var that = this;
    console.log("我的页面")
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  myopera: function (e) {
    if (app.data.user) {
      console.log(e)
      if (e.currentTarget.dataset.flag == 'Pay') {
        wx.navigateTo({
          url: '../payvip/payvip',
        })
      }
      else {
        wx.navigateTo({
          url: '../showrecord/showrecord?targetpage=' + e.currentTarget.dataset.flag,
        })

      }
    }
    else {
      this.showToast()
    }
  },
  showToast: function () {
    var that = this;
    // 显示toast  
    that.setData({
      isShowToast: true,
    });
    // 定时器关闭  
    setTimeout(function () {
      that.setData({
        isShowToast: false
      });
    }, 1000);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
    if (e.detail.userInfo) {
      wx.login({
        success: function (res) {
          console.log(res.code)
          // 可以将 res 发送给后台解码出 unionId
          wx.request({
            url: app.data.host + '/user',
            method: "POST",
            data: {
              Js_code: res.code,
              username: e.detail.userInfo.nickName
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data);
              app.data.userid = res.data.user.userid;
              app.data.user = res.data.user;
            }
          });
        },
        fail: function () {
          console.log("获取用户信息失败")
        }
      })
      //   }
      // })
    }

  },

  /**
 * 用户点击右上角分享
 */
  // onShareAppMessage: function () {
  //   var that = this
  //   return {
  //     //title: that.data.video.name,
  //     title: "我的",
  //     path: '/pages/my/my?videoid=' + app.data.user.userid,

  //     success: function (res) {
  //       if (app.data.user) {
  //         wx.request({
  //           url: host + '/video/saveshare',
  //           data: {
  //             userid: app.data.user.userid,
  //            // videoid: that.data.video.id
  //           },
  //         })
  //       }
  //     },
  //   }
  // },
  onShareAppMessage: function () {
    var that = this;
    //console.log("indexonShareAppMessageapp.data.appisadvanced:" + app.data.appisadvanced);
    if (app.data.appisadvanced) {
      var uuid = utils.uuid().replace(/-/g, "");
      console.log(uuid);
      return {
        title: "我的",
        path: '/pages/my/my?uuid=' + uuid,
        success: function () {
          wx.request({
            url: host + '/user/savesharevip',
            data: {
              userid: app.data.user.userid,
              uuid: uuid
            },
            success: function () {
              console.log("分享记录插入成功");
            }
          })

        }
      }
    }
    else {
      return {
        title: "我的",
        path: '/pages/my/my?shareuserid=' + app.data.user.userid,
        success: function (res) {
          if (app.data.user) {
            wx.request({
              url: host + '/video/saveshare',
              data: {
                userid: app.data.user.userid,
                // videoid: that.data.video.id
              },
            })
          }
        },
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})