/**
 * Created by sail on 2017/4/14.
 */
var draw = require('./draw.js');
const app = getApp();
Page({
  data: {
    srcsss: {
      '0': {
        'src': ''
      }
    },
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
    genateBtnShow: 'none',
    containerShow : '',
    canvasShow : '',
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
 
  tofilter: function (option) {
    wx.navigateTo({
      url: '../../../pages/picture/picture?datai=' + option.currentTarget.dataset.i
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

    var ctx = wx.createCanvasContext('canvas');
    var _this = this;
    var head_w;
    var head_h;
    var data = this.data;
    wx.showLoading({
      title: '生成中...',
    })
    //将图片保存到本地（canvas绘制线上图片时，必须先下载到本地,真机不显示）
    wx.downloadFile({
      url: data.bg, 
      success: function (res) {
        if (res.statusCode === 200) {

          wx.saveFile({
            tempFilePath: res.tempFilePath, //下载后的图片临时地址
            success: function (res) {

              var savedFilePath = res.savedFilePath
              //头像，描述生成海报
              //1.绘制背景
              ctx.drawImage(savedFilePath, 0, 0, data.windowWidth, data.windowHeight);
              ctx.draw(true,function(){
                //-------------------------------------------------------------------
                //2.绘制头像
                ctx.drawImage(data.src, data.targetImg.left, data.targetImg.top, data.targetImg.width, data.targetImg.height);
                ctx.draw(true, function () {
                  //3.canvas生成图片
                  wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: data.windowWidth,
                    height: data.windowHeight,
                    destWidth: data.windowWidth,
                    destHeight: data.windowHeight,
                    canvasId: 'canvas',
                    success: function (res) {
                      _this.setData({
                        containerShow: 'none',
                        canvasShow: 'none',
                        genateBtnShow: 'none',
                        targetImg: {
                          src: res.tempFilePath
                        }
                      });
                      wx.hideLoading();
                      //4.保存到相册
                      if (wx.saveImageToPhotosAlbum) {
                        console.log(res.tempFilePath);
                        wx.saveImageToPhotosAlbum({
                          filePath: res.tempFilePath,
                          success: function (res) {
                            console.log(res);
                            //Toast                     
                            wx.showToast({
                              title: '保存到相册',
                              icon: 'success',
                              duration: 2000
                            });
                          },
                          fail: function (res) {
                            console.log(res)
                            console.log('fail')
                          }
                        });
                      } else {
                        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                        wx.showModal({
                          title: '提示',
                          content: '预览长按保存'
                        })
                      }

                    }
                  });
                });

              });
            },
            fail: function () {
              console.log("保存图片失败")
            }
          })
        }
      }
    });    

  },
  /**   
     * 预览图片  
     */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [this.data.targetImg.src] // 需要预览的图片http链接列表  
    })
  }    
})
