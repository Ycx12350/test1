var config = require('../../config.js');
var resource = config.service.resourceUrl;
var utils = require('../../utils/util.js');
var host = config.service.host;
var app = getApp();
// pages/classify/classify.js
Page({
  data: {
    urlimg: resource,
    curNav: 0,
    width: app.globalData.width,
    height: app.globalData.height,
    placeholder: '输入搜索信息',
  },
  onLoad:function(options){
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
  },
  //点击左侧子标题跳转事件
  onShow: function (options) {
  
    var that = this
    wx.request({
      // url: host + '/test/query',
      url: host+'/video/showall',
      success: function (res) {
        app.fixint(res.data.video);
        that.setData({
          types: res.data,
          clickItem: res.data.category[that.data.curNav].name,
          clickId: res.data.category[that.data.curNav].id
        })
      }
    })
  },
  switchRightTab: function (e) {
    let
      index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: index,
      clickItem: e.target.dataset.type.name,
      clickId: e.target.dataset.type.id
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  player: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../player/player?videoid=' + e.currentTarget.dataset.videoid,
    })
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   var that = this
  //   return {
  //     //title: that.data.video.name,
  //     title: "首页",
  //     path: '/pages/index/index?shareuserid=' + app.data.user.userid,
  //     success: function (res) {
  //       if (app.data.user) {
  //         wx.request({
  //           url: host + '/video/saveshare',
  //           data: {
  //             userid: app.data.user.userid,
  //             // videoid: that.data.video.id
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
        title: "分类",
        path: '/pages/classify/classify?uuid=' + uuid,
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
        title: "分类",
        path: '/pages/classify/classify?shareuserid=' + app.data.user.userid,
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
  onPullDownRefresh: function () {
this.onLoad();
console.log("刷新")
    wx.stopPullDownRefresh();
  }
})