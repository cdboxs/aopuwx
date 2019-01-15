//app.js
App({
  globalData: {
    windowWidth:'',
    windowHeight:'',
    screenHeight:'',
    worknavid:''
  },
  onLaunch: function () {
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
        that.globalData.screenHeight = res.screenHeight
      },
    })
  },


 
})