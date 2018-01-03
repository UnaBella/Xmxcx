/**
 * Created by sail on 2017/4/14.
 */
const app = getApp();
Page({
  
  
  data: {
    srcss:['',''],
    src: '',
    bg:'',
    //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
    saturate: 100,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0
  
  },
  //输入框
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
 
  tofilter: function (option) {
    wx.navigateTo({
      url: '../../../pages/picture/picture?datai'+ option.currentTarget
    })
  },

 onLoad : function (option) {
   let avatar, index;
   if (option.avatar !== undefined) { avatar = option.avatar };

   if (avatar !== undefined) {
     this.setData({
       src: avatar
     })
   }


   if (option.index !== undefined) {
     index = 1 * (option.index);

     //全局变量方式
     var imgArr = app.globalData.imgArr;
     this.setData({
       bg: imgArr[index].img
     });
   }
  }


})
