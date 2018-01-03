var ctx = wx.createCanvasContext('myCanvas');
var  bg_w;
var  bg_h;
var ratio;

wx.getSystemInfo({
  success: function(res) {
    console.log(res);
    ratio = res.pixelRatio;
    bg_w = res.windowWidth;
    bg_h = res.windowHeight
  },
})


function draw(){
  ctx.drawImage(bg, 0, 0, bg_w, bg_h);
}
module.exports = {
  draw: draw
}
