//index.js
//获取应用实例
const app = getApp()
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

    // 
    uimgUrls: [
      { img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', u: "u uone", url:"../avatarUpload/index/index"},
      { img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', u: "u utwo", url: "../avatarUpload/index/index"}
    ],
  },
  onLoad: function () {
    //设置全局变量    
    app.globalData.imgArr = this.data.uimgUrls;
  },
  getIndex: function (event) {
    console.log(app.aa);
    wx.navigateTo({
      url: '../avatarUpload/index/index?index=' + event.currentTarget.dataset.i,
    })
  }
 

})