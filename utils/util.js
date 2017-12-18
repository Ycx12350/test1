function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight / originalWidth;//图片高宽比  
  //console.log('originalWidth: ' + originalWidth)
  //console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比  
      //  console.log('系统windowWidth: ' + windowWidth)
      // console.log('系统windowHeight: ' + windowHeight)
      // if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
      //图片缩放后的宽为屏幕宽  
      imageSize.imageWidth = windowWidth;
      imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      // } else {//图片高宽比大于屏幕高宽比  
      //   //图片缩放后的高为屏幕高  
      //   imageSize.imageHeight = windowHeight;
      //   imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      // }

    }
  })
  //console.log('缩放后的宽: ' + imageSize.imageWidth)
  //console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

function formatTime2(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

module.exports = {
  imageUtil: imageUtil,
  formatTime: formatTime,
  formatTime2: formatTime2,
  uuid:uuid
} 