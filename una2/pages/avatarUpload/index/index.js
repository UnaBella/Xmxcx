/**
 * Created by sail on 2017/4/14.
 */
const app = getApp()
Page({
  data: {
    src: '',
    bg:'',
    //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
    saturate: 100,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0

  },
  // upload () {
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success (res) {
    //     const src = res.tempFilePaths[0]

    //     wx.redirectTo({
    //       url: `../../upload/upload?src=${src}`
    //     })
    //   }
    // })
  // }
  tofilter: function () {
    wx.navigateTo({
      url: '../../../pages/picture/picture'
    })
  },
  // ,
  // onLoad (option) {
  //   let { avatar } = option
  //   if (avatar) {
  //     this.setData({
  //       src: avatar
  //     })
  //   }
  // }
 onLoad : function (option) {
   console.log(123)
   let avatar, index;
   if (option.avatar !== undefined) { avatar = option.avatar };

   if (avatar !== undefined) {
     this.setData({
       src: avatar
     })
   }
   console.log(option);

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
