// pages/picture/picture.js

Page({
  data:{
    datai:'',
    picArray:[],
    //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
    saturate: 100,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia:0
  },
  onLoad:function(op){
    
    // console.log(op.datai)
    this.data.datai = op.datai;
  },
  takephoto:function(){
    var self = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        self.setData({
            picArray:res.tempFilePaths
        });
        // console.log(res);
      }
    })
  },
  //模糊
  addblur:function(){
    var self = this;
    self.setData({
      oldEffect: 0,
      addretro: 0,
      addBeati: 0,
      addblur:1
    });
  },
  //还原
  originpic:function(){
     var self = this;
    self.setData({
      //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
      saturate: 100,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      sepia: 0
    });
  },
  //怀旧
  addOld:function(){
    var self = this;
    self.setData({
      //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
      saturate: 110,
      brightness: 90,
      contrast: 100,
      grayscale: 0,
      sepia: 50
    });
  },
  //复古
  addretro:function(){
    var self = this;
    self.setData({
      //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
      saturate: 90,
      brightness: 100,
      contrast: 100,
      grayscale: 50,
      sepia: 5
    });
  },
  //美白
  addBeati:function(e){
     var self = this;
    self.setData({
      //饱和度 / 亮度 / 对比度 / 灰度 / 陈旧度（褐色）
      saturate: 100,
      brightness: 120,
      contrast: 100,
      grayscale: 0,
      sepia: 0
    });
  },

  baohedu: function (e) {
    var self = this;
    self.setData({
      saturate: e.detail.value
    });
  },
  liangdu: function (e) {
    var self = this;
    self.setData({
      brightness: e.detail.value
    });
  },
  duibidu: function (e) {
    var self = this;
    self.setData({
      contrast: e.detail.value
    });
  },
  huidu: function (e) {
    var self = this;
    self.setData({
      grayscale: e.detail.value
    });
  },
  hese: function (e) {
    var self = this;
    self.setData({
      sepia: e.detail.value
    });
  },
  //跳转剪裁框
  toCut : function(op){
    // console.log(this.data.datai);
    var src = this.data.picArray[0];
    
    wx.redirectTo({
      url: "../upload/upload?src=" + src + "&datai=" + this.data.datai + "&saturate=" + this.data.saturate + "&brightness=" + this.data.brightness + "&contrast=" + this.data.contrast + "&grayscale=" + this.data.grayscale + "&sepia=" + this.data.sepia
    })
  }
})