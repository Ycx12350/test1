//index.js
//获取应用实例
var config = require('../../config.js');
var resource = config.service.resourceUrl;
var host = config.service.host;
var app = getApp();
var arrid = [];
var param = {
  data: {
    select: [],
    urlimg: resource,
    width: app.globalData.width,
    height: app.globalData.height,
    allchoose: '',
    list: null,
    loading: false,
    allid: '',
    targetpage: '',
    choose: false
  },
  onLoad: function (options) {
    console.log(options.targetpage)
    this.setData({
      targetpage: options.targetpage
    })
  },
  onShow: function () {
    var that = this
    that.setData({
      allchoose: false,
    })
    wx.request({
      url: host + '/user/myoperation',
      data: {
        message: that.data.targetpage,
        userid: app.data.userid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.data.select.length = res.data.video.length;
        that.setData({
          loading: true,
          list: res.data.video,
          select: that.data.select
        });
      }
    })
  },
  jump: function (e) {
    if (!this.data.choose) {
      wx.navigateTo({
        url: '../player/player?videoid=' + e.currentTarget.dataset.videoid,
      })
    }
  },
  empty: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  select: function (e) {
    if (e.currentTarget.dataset.index >= 0) {
      var select = 'select[' + e.currentTarget.dataset.index + ']';
      this.setData({
        [select]: !this.data.select[e.currentTarget.dataset.index]
      })
    }
    console.log(this.data.select.length)
    this.count(this.data.list)
  },
  count: function (data) {
    var allid = "";
    var allchoose = true;
    for (var i = 0; i < data.length; i++) {
      if (this.data.select[i]) {
        allid += this.data.list[i].id + ",";
      }
      else {
        allchoose = false;
      }
    }
    console.log('allid：' + allid)
    this.setData({
      allid: allid,
      allchoose: allchoose
    })
  },
  allchoose: function (e) {
    var that = this
    if (this.data.allchoose) {
      for (var i = 0; i < this.data.list.length; i++) {
        this.data.select[i] = false;
      }
    }
    else {
      for (var i = 0; i < this.data.list.length; i++) {
        this.data.select[i] = true;
      }
    }
    this.setData({
      allchoose: !this.data.allchoose,
      select: this.data.select
    })
    dis: that.count(this.data.list);
  },
  opera: function () {
    this.setData({
      choose: !this.data.choose,
    })
    console.log(this.data.choose)
  },
  cannel: function () {
    this.setData({
      choose: false,
    })
    console.log(this.data.choose)
  },
  deleterecord: function (e) {
    var that = this
    dis: this.count(this.data.list)
    if (this.data.allid != '') {
      wx.request({
        url: host + "/user/deloperation?videoid=" + this.data.allid + "&flag=" + that.data.targetpage + "&userid=" + app.data.userid,
        method: 'GET',
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data)  
          for (var i = 0; i < that.data.list.length; i++) {
            if (that.data.select[i]) {
              that.data.select[i] = false
            };
            that.setData({
              list: res.data.video,
              select:that.data.select
            })
          }
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '你还没有选择视频',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
};
Page(param);