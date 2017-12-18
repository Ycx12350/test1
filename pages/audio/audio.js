// pages/audio/audio.js
var config = require('../../config.js');
var utils = require('../../utils/util.js');
var host = config.service.host;
var resource = config.service.resourceUrl;
var app = getApp();
var backgroundAudioManager;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: resource,
    btntext: "播放",
    duration: 0,
    playtime: 0,
    sliderischanging: false,
    formatedDurationTime: "00:00",
    formatedPlayTime: "00:00",
    trylisten: 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.src = resource + "/audio/1234.mp3";

    backgroundAudioManager.onCanplay(function () {
      backgroundAudioManager.pause();
      that.setData({ duration: backgroundAudioManager.duration });
      console.log("onCanplayduration:" + that.data.duration);
    });

    backgroundAudioManager.onWaiting(function () {
      //console.log("onWaitingduration:" + backgroundAudioManager.duration);
      console.log("onWaitingcurrentTime:" + backgroundAudioManager.currentTime);
      console.log("onWaitingbuffered:" + backgroundAudioManager.buffered);
    });

    backgroundAudioManager.onTimeUpdate(function () {
      var currentTime = backgroundAudioManager.currentTime;
      if (currentTime <= trylisten) {

        if (!that.data.sliderischanging) {
          that.setData({
            playtime: currentTime,
            duration: backgroundAudioManager.duration
          });
        }

      } else {
        backgroundAudioManager.seek(0);
        backgroundAudioManager.pause();
        wx.showToast({
          title: '试听已结束',
          duration: 3000,
          mask: true,
        })
      }
      that.setData({
        formatedPlayTime: utils.formatTime2(Math.floor(backgroundAudioManager.currentTime)),
        formatedDurationTime: utils.formatTime2(Math.floor(backgroundAudioManager.duration))
      })
    });
    backgroundAudioManager.onPlay(function () {
      console.log("开始播放");
      console.log("onPlayduration:" + backgroundAudioManager.duration);
    });
    backgroundAudioManager.onPause(function () {
      console.log("暂停播放");
    });
    backgroundAudioManager.onStop(function () {
      console.log("停止播放");
    });
    backgroundAudioManager.onError(function (res) {
      console.log("error");
      console.log(res.data);
    });


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

  },
  start: function () {
    if (backgroundAudioManager.paused) {
      backgroundAudioManager.play();
      this.setData({ btntext: "暂停" });
    } else {
      backgroundAudioManager.pause();
      this.setData({ btntext: "播放" });
    }

  },
  stop: function () {
    backgroundAudioManager.stop();
  },
  seek: function (e) {
    var newtime = e.detail.value;
    console.log(newtime);
    backgroundAudioManager.seek(e.detail.value);
  },
  touchstart: function () {
    this.setData({ sliderischanging: true });
  },
  touchend: function () {
    this.setData({ sliderischanging: false });
  }
})