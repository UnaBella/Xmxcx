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
  //输入框
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
 
  tofilter: function () {
    wx.navigateTo({
      url: '../../../pages/picture/picture'
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
  generatePic : function(e){
    console.log(e);
    var ctx = wx.createCanvasContext('canvas');
    var _this = this;
    var head_w;
    var head_h;
    var data = this.data;
    console.log(data.bg);
    //将图片保存到本地（canvas绘制线上图片时，必须先下载到本地,真机不显示）
    wx.saveFile({
      tempFilePath: app.globalData.tempFilePaths,
      success: function (res) {
        console.log('saved.....................')
        console.log(res);
        var savedFilePath = res.savedFilePath;

        //获取保存的
        wx.getSavedFileList({
          success: function (res) {
            console.log(res.fileList)
          }
        })

        //头像，描述生成海报
        //ctx.drawImage(savedFilePath, 0, 0, data.windowWidth, data.windowWidth);
        //ctx.draw(true);
      }
    });

    
    

    //获取头像参数
    // wx.getImageInfo({
    //   src: _this.data.src,
    //   success: function (res) {
    //     console.log(res);
    //     head_w = res.width;
    //     head_h = res.height;
    //     ctx.drawImage(data.src, data.targetImg.left, data.targetImg.top, data.targetImg.width, data.targetImg.height);
    //     ctx.draw(true,function(){
    //       //canvas生成图片
    //       wx.canvasToTempFilePath({
    //         x: 0,
    //         y: 0,
    //         width: data.windowWidth,
    //         height: data.windowHeight,
    //         destWidth: data.windowWidth,
    //         destHeight: data.windowHeight,
    //         canvasId: 'canvas',
    //         success: function (res) {
    //           console.log(res.tempFilePath);
    //           _this.setData({
    //             // containerShow: 'none',
    //             // targetImgShow : '',
    //             targetImg: {
    //               src: res.tempFilePath
    //             }
    //           });
    //         }
    //       });
    //     });
        
    //   }
    // });
  }
})
