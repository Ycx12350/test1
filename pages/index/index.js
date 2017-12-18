// pages/homee/homee.js
var config = require('../../config.js');
var utils = require('../../utils/util.js');
var host = config.service.host;
var resource=config.service.resourceUrl;
var app = getApp();
var index;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    width: app.globalData.width,
    height: app.globalData.height,
    urlimg: resource,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    id:null,
  
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     console.log("进入indexonload");
    console.log(options);
    console.log("indexonLoadapp.data.appisadvanced:" + app.data.appisadvanced)
    console.log("indexonLoadoptions.uuid:" + options.uuid);
    console.log("indexonLoadoptions.shareuserid:" + options.shareuserid);

    if (options.shareuserid != null && options.shareuserid != "" && options.shareuserid != undefined) {
      getApp().data.appshareuserid = options.shareuserid
    }

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
    wx.request({
      url: host + '/notice/shownotice',
      success: function (res) {
        that.setData({
          msgList: res.data.notice
        })
      }
    });

      wx.request({
        url: host + '/notice/showbanner',
        success: function (res) {
          that.setData({
            bannerlist: res.data.banner
          })
        }
      })
  },
  onShow: function () {
    var that = this
    wx.request({
      url: host + '/video/showspecial',
      method: 'GET',
      data: {
        flag: "hot"
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        app.fixint(res.data.hot);
        that.setData({
          hot: res.data.hot
        })
      }
    }),
      wx.request({
        url: host + '/video/showspecial',
        method: 'GET',
        data: {
          flag: "famous"
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          app.fixint(res.data.famous);
          that.setData({
            famous: res.data.famous
          })
        }
      }),
      wx.request({
        url: host + '/video/showspecial',
        method: 'GET',
        data: {
          flag: "new"
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
         app.fixint(res.data.new);
          that.setData({
            news: res.data.new
          })
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log("indexonShareAppMessageapp.data.appisadvanced:" + app.data.appisadvanced);
    if (app.data.appisadvanced) {
      var uuid = utils.uuid().replace(/-/g, "");
      console.log(uuid);
      return {
        title: "首页",
        path: '/pages/index/index?uuid=' + uuid,
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
    else{
      return {
        title: "首页",
        path: '/pages/index/index?shareuserid=' + app.data.user.userid,
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
  jump: function (e) {
    console.log()
    wx.navigateTo({
      url: '../player/player?videoid=' + e.currentTarget.dataset.videoid,
    })
  },
  banner: function (e) {
    console.log()
    wx.navigateTo({
      url: '../speecherintro/speecherintro'
    })
  }
})