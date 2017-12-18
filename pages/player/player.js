// pages/player/player.js
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
    vvid: 0,
    imgurl: resource,
    width: app.globalData.width,
    height: app.globalData.height,
    trywatch: 0,
    vip: false,
    playcount: 0,
    time: 0,
    ispay: 0,
    duration: 0,
    playtime: 0,
    sliderischanging: false,
    formatedDurationTime: "00:00:00",
    formatedPlayTime: "00:00:00",
    trylisten: 30,
    playbtnimg: "image/play.png",
    type: '视频',
    isChecked1: 'is_checked',
    isChecked2: '0',
    isChecked3: '0',
    iscollect: 0,
    imagetext: [{
      image: 'image/demo.png',
      title: '课程简介',
      text: '作为初入职场的新人，虽然有马行千里的傲人志向，但面对文秘、统计以及打水、扫地等低端的岗位，往往都会有怀才不遇的巨大落差，心生不平之气。其实每个岗位都是一个舞台，只要你肯于付出、善于展示，小职位上也能做大事，身在低层也能把工作做出彩。'

    }, {
      image: 'image/demo.png',
      title: '心态决定人生，态度决定命运',
      text: '明朝初年，太祖朱元璋下令让太学的学生先抄写朝廷的公文，以从中选人用人。那时的太学，相当于今天的北大、清华，让这些高材生们干些抄抄写写的事，许多人都有大材小用之感，几乎都应付了事。一位叫夏原吉的学生却心态平和，字写得端端正正。有人嘲笑他字写得像小学生一样认真，他回答说：“写公文是严肃的事，怎么能像写书法那样随心所欲呢？”有一天，太祖朱元璋想看看太学生们的工作状态，只见那些才子们一边龙飞凤舞，一边嘻嘻哈哈，闹个不停。只有夏原吉正襟危坐，埋首挥毫，对身旁的一切听而不闻、视而不见。太祖大为奇怪，走过去观看，只见他所抄写的皇诰笔画方正，字体文雅。太祖一下记住了夏原吉。三年后，夏原吉被直接特授户部侍郎，成为深为皇帝器重的股肱之臣。夏原吉不以抄抄写写为大材小用，待之以严谨认真的态度，得到了朱元璋认可，也奠定了飞腾的根基。哲人说：“你的心态就是你真正的主人。”心态决定人生，态度决定命运。良好的心态促使人积极向上，端正的态度是做好一切的工作的基础。人与人之间的能力固然有差距，但并不是决定成败的关键因素。态度才能决定一切。即使能力不足，只要态度端正就可以弥补不足，提高自己'
    }, {
      image: 'image/demo.png',
      title: '兵谋将事，卒担帅责',
      text: '邱伯毓大学毕业后应聘到微软公司上海技术中心，成为一名统计员。他不仅工作认真，把每个数字都弄准，而且爱动脑筋。没多久，他发现公司业绩统计表按月上报，经理月末才能看到，就动起了心思：如果改为每天上报一次，从经理的角度看，岂不是可以更及时有效地协调督促工作？当他把这个想法跟经理沟通后，经理上下打量着他说：“你能站在我的角度想问题，不简单，我们需要的就是你这样的员工，大胆去做吧！”邱伯毓立刻利用业余时间改造系统，成功地变月报为日报。随着对业务的深入了解，他又着眼公司总部的财务管理问题，提出开展成本控制和财务预算分析，从而使中心赢利能力大增。邱伯毓被公司领导刮目相看，两年后，他走进微软总部，成为微软历史上最年轻的业务主管。邱伯毓初入职场，并没有安于统计员的工作，而是为经理操起了心，为公司高层谋起了事，而这成了他快速晋升的起点。不想当将军的士兵不是好士兵。要想兵谋帅事，就要有超前意识，善于“越位”思考，突破自我看问题，站在更高的层次想事情。有了这样的视角，小职员就有了大视野，低职位就会做出大业绩，领导自然刮目相看，机会也就滚滚而来。'
    }]
  },
  toggle1: function (e) {
    var that = this;
    var type = '视频';
    that.setData({
      type: type,
      isChecked1: 'is_checked',
      isChecked2: '0',
      isChecked3: '0',
    });
  },
  toggle2: function (e) {
    var that = this;
    var type = '音频';
    that.setData({
      type: type,
      isChecked1: '0',
      isChecked2: 'is_checked',
      isChecked3: '0',
    });
  },
  toggle3: function (e) {
    var that = this;
    var type = '图文';
    that.setData({
      type: type,
      isChecked1: '0',
      isChecked2: '0',
      isChecked3: 'is_checked',
    });
  },
  iscollect: function (e) {
    var that = this;
    wx.request({
      url: host + '/video/addUpvoteCount',
      data: {
        id: that.data.video.id
      },
      success: function () {
        that.setData({
          iscollect: 1,
        });
      }
    })

  },

  trywatch: function () {
    this.setData({
      novip: true,
    })
    this.tryvideo.play();
  },
  //限时功能，试看功能
  limit: function (e) {
    //  console.log(e)
    this.data.time = parseInt(e.detail.currentTime)
    this.data.timestamp = parseInt(e.timeStamp)
    if ((e.currentTarget.id == 'tryvideo') && (e.detail.currentTime > this.data.trywatch)) {
      this.tryvideo.seek(0);
      this.tryvideo.pause();
      this.setData({
        novip: false,
      })
    }
  },
  nolimit: function (e) {
    this.data.time = parseInt(e.detail.currentTime)
    this.data.timestamp = parseInt(e.timeStamp)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    backgroundAudioManager = wx.getBackgroundAudioManager();
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
    console.log(options)
    var that = this
    wx.request({
      url: host + '/notice/shownotice1',
      success: function (res) {
        that.setData({
          msgList: res.data.notice
        })
      }
    }),
      this.tryvideo = wx.createVideoContext('tryvideo');
    this.video = wx.createVideoContext('video');
    var that = this
    that.setData({
      vvid: options.videoid,
      userid: app.data.userid,
      shareuserid: options.shareuserid ? options.shareuserid : null,
    })
    wx.request({
      url: host + "/video/showvideo",
      data: {
        id: options.videoid,
        userid: app.data.user ? app.data.user.userid : ""
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          video: res.data.video,
          trywatch: res.data.video.trytime,
          trylisten: res.data.video.audiotrytime,
          ispay: res.data.ispay,
          collectflag: res.data.collectflag,
          paycount: res.data.video.paycount > 10000 ? parseInt(res.data.video.paycount / 10000) + "w+" : res.data.video.paycount + 1,
          playcount: res.data.video.playcount > 10000 ? parseInt(res.data.video.playcount / 10000) + "w+" : res.data.video.playcount + 1,
        })
        //backgroundAudioManager.src = resource + that.data.video.audiourl;
        //backgroundAudioManager.title = that.data.video.name;
      },
    })
    //图文详情
    wx.request({
      url: host + "/video/showPicText",
      data: {
        videoid: options.videoid,
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: function (res) {
        console.log(res.data.pictext)
        that.setData({
          pictext: res.data.pictext,
        })
      },
    })
    wx.request({
      url: host + "/video/addplaycount",
      data: {
        id: options.videoid
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: function (res) {
        console.log("add playcount success")
      },
    })

    if (app.data.user && app.data.user.isvip == 1) {
      wx.request({
        url: host + "/video/getwatchtime",
        data: {
          id: options.videoid,
          userid: app.data.userid
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        success: function (res) {
          console.log(res.data.watchtime)
          var time = parseInt(res.data.watchtime);
          var watch = "";
          if (time > 3600) {
            watch += parseInt(time / 3600) > 9 ? parseInt(time / 3600) + ":" : "0" + parseInt(time / 3600) + ":";
          };
          watch += parseInt(time % 3600 / 60) > 9 ? parseInt(time % 3600 / 60) + ":" : "0" + parseInt(time % 3600 / 60) + ":";
          watch += parseInt(time % 3600 % 60) > 9 ? parseInt(time % 3600 % 60) : "0" + parseInt(time % 3600 % 60);

          that.setData({
            watchtime: res.data.watchtime,
            toasttext: '您上次看到了' + watch + '处'
          })

          if (parseInt(res.data.watchtime) > 0) {
            that.showToast()
            setTimeout(function () {
              that.video.seek(parseInt(res.data.watchtime));
            }, 3000);
            setTimeout(function () {
              that.video.play();
            }, 2000);
          }
          else {
            that.video.play()
          }
        },
      })
    }

    //音频部分
    //console.log("that.data.video.audiourl:" + that.data.video.audiourl);


    backgroundAudioManager.onCanplay(function () {
      console.log("onCanplay");
      // backgroundAudioManager.pause();
      that.setData({ duration: backgroundAudioManager.duration });
      //console.log("onCanplayduration:" + that.data.duration);
    });

    backgroundAudioManager.onWaiting(function () {
      //console.log("onWaitingduration:" + backgroundAudioManager.duration);
      console.log("onWaitingcurrentTime:" + backgroundAudioManager.currentTime);
      console.log("onWaitingbuffered:" + backgroundAudioManager.buffered);
    });

    backgroundAudioManager.onTimeUpdate(function () {
      var currentTime = backgroundAudioManager.currentTime;
      //vip与试听判断
      if (that.data.vip == false) {

        if (currentTime >= that.data.trylisten) {

          backgroundAudioManager.seek(0);
          backgroundAudioManager.stop();
          wx.showModal({
            title: '试听已结束',
            content: '成为vip即可听完整音频',
            confirmText: "去购买",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/payvip/payvip',
                });
              }
            }
          });
        }
      }
      //进度条更新
      if (!that.data.sliderischanging) {
        that.setData({
          playtime: currentTime,
          duration: backgroundAudioManager.duration
        });
      }
      //进度条下播放时间数字更新
      that.setData({
        formatedPlayTime: utils.formatTime2(Math.floor(backgroundAudioManager.currentTime)),
        formatedDurationTime: utils.formatTime2(Math.floor(backgroundAudioManager.duration))
      });
    });

    backgroundAudioManager.onPlay(function () {
      console.log("开始播放");
      that.setData({ playbtnimg: "image/pause.png" });
      //console.log("onPlayduration:" + backgroundAudioManager.duration);
    });

    backgroundAudioManager.onPause(function () {
      console.log("暂停播放");
      that.setData({ playbtnimg: "image/play.png" });
    });

    backgroundAudioManager.onStop(function () {
      console.log("停止播放");
      that.setData({ playbtnimg: "image/play.png" });
    });

    backgroundAudioManager.onError(function (res) {
      console.log("error");
      console.log(res.data);
    });

    //音频部分结束

  },
  tocollect: function (e) {
    if (app.data.user) {
      var that = this
      wx.request({
        url: host + "/video/tocollect",
        data: {
          id: this.data.vvid,
          userid: app.data.userid
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        success: function (res) {
          that.setData({
            collectflag: 1
          })
        },
      })
    }
    else {
      this.setData({
        toasttext: "你还没有登陆"
      })
      this.showToast()
    }
  },
  //视频点赞
  toupvote: function (e) {
    if (app.data.user) {
      var that = this
      wx.request({
        url: host + "/video/toupvote",
        data: {
          id: this.data.vvid,
          userid: app.data.userid
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        success: function (res) {
          that.setData({
            collectflag: 1
          })
        },
      })
    }
    else {
      this.setData({
        toasttext: "你还没有登陆"
      })
      this.showToast()
    }
  },
  showToast: function () {
    console.log("弹出toast")
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
    }, 2000);
  },
  getUserInfo: function (e) {
    var that = this
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
            data: {
              Js_code: res.code,
              username: e.detail.userInfo.nickName
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data);
              app.data.userid = res.data.user.userid;
              that.setData({
                userid: res.data.user.userid,
                vip: res.data.user.isvip == 1
              })
            }
          });
        },
        fail: function () {
          console.log("获取用户信息失败")
        }
      })
    }
    // else {
    //   console.log('获取用户登录态失败！' + res.errMsg)
    // },
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this
    this.setData({
      user: app.data.user
    })
    if (app.data.user && app.data.user.isvip == 1) {
      that.setData({
        vip: true
      })
    }
    if (app.data.userid == 0) {
      setTimeout(function () {
        that.setData({
          userid: app.data.userid
        })
        if (app.data.user && app.data.user.isvip == 1) {
          that.setData({
            vip: true
          })
        }
      }, 200)
    }
  },
  onReady: function (res) {
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
        title: that.data.video.name,
        path: '/pages/player/player?uuid=' + uuid + "&videoid=" + that.data.video.id,
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
        title: that.data.video.name,
        path: '/pages/player/player?videoid=' + that.data.video.id + '&shareuserid=' + app.data.user.userid,
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
  onUnload: function () {
    console.log("页面卸载")
    if (this.data.timestamp > 10000 && this.data.time >= 10) {
      var that = this
      console.log("添加jilu")
      if (app.data.user) {
        wx.request({
          url: host + "/video/addhistory",
          data: {
            id: this.data.vvid,
            userid: app.data.userid,
            time: that.data.time
          },
          header: { 'content-type': 'application/json' },
          method: 'GET',
          success: function () {

          }
        })
      }
    }
  },
  jump: function (e) {
    wx.navigateTo({
      url: '../payvip/payvip',
    })
  },
  commentjump: function (e) {
    var that = this
    console.log("oooooo" + that.data.video.id)
    wx.navigateTo({
      url: '../commentlie/commentlie?mmvideoid=' + that.data.video.id,
    })
    console.log("oooooo" + that.data.video.id)
  },
  topay: function () {
    var that = this
    wx.request({
      url: host + '/pay/prepay',
      data: {
        openid: app.data.user.openid,
        userid: app.data.user.userid,
        id: that.data.video.id,
        videoname: '无涯管理学院-' + that.data.video.name,
        videoprice: that.data.video.price,
        shareuserid: app.data.appshareuserid ? app.data.appshareuserid : '',
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
            that.setData({
              ispay: 1
            })
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
          },
          fail: function () {
            console.log("支付失败")
          }
        })
      }
    })
  },
  //音频事件
  start: function (e) {
    console.log(e);
    if (backgroundAudioManager.paused || backgroundAudioManager.paused == undefined) {
      if (backgroundAudioManager.src) {
        backgroundAudioManager.play();
      } else {
        console.log(resource + this.data.video.audiourl);
        backgroundAudioManager.src = resource + this.data.video.audiourl;
        backgroundAudioManager.title = this.data.video.name;
      }

      this.setData({ playbtnimg: "image/pause.png" });
    } else {
      console.log(backgroundAudioManager.paused);
      backgroundAudioManager.pause();
      this.setData({ playbtnimg: "image/play.png" });
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
  //音频事件结束
})