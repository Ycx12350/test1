/**
 * 小程序配置文件
 */
// 此处主机域名修改成腾讯云解决方案分配的域名
var app=getApp().data.host;
var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host:`${app}`,

    //图片位置
    resourceUrl: `https://www.wuxishiduhx.cn/speech_resource`,

 
  }
};

module.exports = config;