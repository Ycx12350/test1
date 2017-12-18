//app.js
App({
  data: {
    appisadvanced:null,
    appshareuserid:null,
    location: null,
    user:null,
    userid: null,
  //host: 'http://192.168.0.101:8080/speech',
 host: 'https://www.wuxishiduhx.cn/speech',
  },
  onLaunch: function () {
    var globalData = this.globalData
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        globalData.width = res.windowWidth;
        globalData.height = res.windowHeight;
        // var windowscale = windowHeight / windowWidth;//屏幕高宽比  
      }
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("wx.getSetting没有运行")
    wx.login({
      success: function (res) {
        console.log(res.code)
        wx.getUserInfo({
          success: r => {
            // 可以将 res 发送给后台解码出 unionId
            globalData.userInfo = r.userInfo
            console.log(r.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(r)
              // console.log(r.userInfo)
              console.log("if action")
            }
            wx.request({
              url: that.data.host + '/user',
              method:'POST',
              data: {
                Js_code: res.code,
                username: r.userInfo.nickName,
                userpic: r.userInfo.avatarUrl
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                console.log("appjsres.data.user.isadvanced:" + res.data.user.isadvanced)
                that.data.userid = res.data.user.userid;
                that.data.user=res.data.user;
                that.data.appisadvanced = res.data.user.isadvanced;
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
    })
  },
  fixint: function (data) {
    if(data){
    for (var i = 0; i < data.length; i++) {
      if (data[i].playcount > 10000) {
        data[i].playcount = parseInt(data[i].playcount / 10000) + "w+";
      }
      if (data[i].paycount > 10000) {
        data[i].paycount = parseInt(data[i].paycount / 10000) + "w+";
      }
    }}
  },
  globalData: {
    userInfo: null,
    width: 0,
    height: 0,
    location: '',
    
  }
})