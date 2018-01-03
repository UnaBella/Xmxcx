// pages/allEffect/allEffect.js
Page({
  data: {
    saturate: 170,
    brightness: 110,
    contrast: 70
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
  }
})