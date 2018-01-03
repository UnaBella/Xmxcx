/**
 * Created by sail on 2017/4/14.
 */
var draw = require('./draw.js');
const app = getApp();
Page({
  data: {
    src: '',
    bg:'',
    //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
    saturate: 100,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0,
    pixelRatio : 0,
    windowWidth : 0,
    windowHeight : 0,
    containerShow : '',
    genateBtnShow : 'none',
    targetImgShow : '',
    targetImg :{
      width:93,
      height:93,
      left: 140,
      top:215,
      src : ''
    }

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
 onLoad : function (option) {
   let avatar, index;
   
   console.log(option);
   
    //1.加背景图
   if (option.index !== undefined) {
     index = 1 * (option.index);
     //全局变量方式
     var imgArr = app.globalData.imgArr;
     this.setData({
       bg: imgArr[index].img
     });
   }
  },
  onShow : function(){
    var _this = this;
    if (this.data.src !== ''){
      //显示生成图片按钮
      this.setData({
        genateBtnShow : ''
      });

      //设置设备参数
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            pixelRatio: res.pixelRatio,
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        }
      });
    }
  },
  generatePic : function(){
    var ctx = wx.createCanvasContext('canvas');
    var _this = this;
    var head_w;
    var head_h;
    var data = this.data;

    //头像，描述生成海报
    ctx.drawImage(data.bg, 0, 0, data.windowWidth, data.windowHeight);
    ctx.draw();
    //获取头像参数
    wx.getImageInfo({
      src: _this.data.src,
      success: function (res) {
        console.log(res);
        head_w = res.width;
        head_h = res.height;
        ctx.drawImage(data.src, data.targetImg.left, data.targetImg.top, data.targetImg.width, data.targetImg.height);
        ctx.draw(true,function(){
          console.log('draw------------------------------')
          //canvas生成图片
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: data.windowWidth,
            height: data.windowHeight,
            destWidth: data.windowWidth,
            destHeight: data.windowHeight,
            canvasId: 'canvas',
            success: function (res) {
              console.log(res.tempFilePath);
              _this.setData({
                // containerShow: 'none',
                // targetImgShow : '',
                targetImg: {
                  src: res.tempFilePath
                }
              });
            }
          });
        });
        
      }
    });
  }
})
