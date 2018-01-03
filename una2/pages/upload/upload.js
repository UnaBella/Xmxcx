import WeCropper from '../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      },
      //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
      saturate: 100,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      sepia: 0
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage (option) {
    this.wecropper.getCropperImage((avatar) => {
      console.log(avatar)
      console.log(option)
      if (avatar) {
        //  获取到裁剪后的图片
        // wx.redirectTo({
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          src: avatar,
          saturate: this.data.cropperOpt.saturate,
          brightness: this.data.cropperOpt.brightness,
          contrast: this.data.cropperOpt.contrast,
          grayscale: this.data.cropperOpt.grayscale,
          sepia: this.data.cropperOpt.sepia
        })
        //回到海报模板页
        wx.navigateBack({
          url: `../avatarUpload/index/aaa?avatar=${avatar}&saturate=${this.data.cropperOpt.saturate}&brightness=${this.data.cropperOpt.brightness}&contrast=${this.data.cropperOpt.contrast}&grayscale=${this.data.cropperOpt.grayscale}&sepia=${this.data.cropperOpt.sepia}`
        })
        
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        console.log(res);
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {

    this.setData({
      cropperOpt: {
        id: 'cropper',
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 300) / 2,
          y: (height - 300) / 2,
          width: 300,
          height: 300
        },
        //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
        saturate: option.saturate,
        brightness: option.brightness,
        contrast: option.contrast,
        grayscale: option.grayscale,
        sepia: option.sepia
      }
    })

    // this.data.cropperOpt.saturate = option.saturate
    // this.data.cropperOpt.brightness = option.brightness
    // this.data.cropperOpt.contrast = option.contrast
    // this.data.cropperOpt.grayscale = option.grayscale
    // this.data.cropperOpt.sepia = option.sepia

    const { cropperOpt } = this.data
    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})
