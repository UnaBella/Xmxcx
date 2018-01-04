//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    uimgUrls: app.globalData.imgArr,
  },
  
  onShow:function(){
    app.globalData.templateData = {};
  },
  getIndex: function (option) {
    wx.navigateTo({
      url: option.currentTarget.dataset.url +'?index=' + option.currentTarget.dataset.i,
    })
  }
 

})