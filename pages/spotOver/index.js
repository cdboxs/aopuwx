// pages/spotOver/index.js
import { Model } from './model.js';
const app = getApp();
let m = new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkResult:['无异常情况','正常重启一次','简单问题已修复','其他']
  },
  resultCheck(res){

    if (that.data.rcindex == 3) {
      that.setData({
        otherResult: res.detail.value.otherResult
      });
    }
    that.setData({
      rcindex: res.detail.value
    });
  },
  sendCheck(e){

    if (that.data.rcindex == 3) {
      e.detail.value.selectResult = e.detail.value.otherResult;
    }
    if (e.detail.value.selectResult==""){
      wx.showToast({
        title: '请填写巡检结果',
        mask:true,
        icon:"none"
      });
      return;
    }else{
      let userInfo = wx.getStorageSync('userInfo');
      m.sendCheck(e.detail.value.routeCheckId, e.detail.value.selectResult, userInfo.token,(res)=>{
        //console.log(res);
        if(res.data.code==0){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success(e) {
              if (e.confirm) {
                wx.navigateBack({
                  delta:2
                })
              }
            }
          })
        }else if(res.data.code==-3){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false,
            success(e){
                if(e.confirm){
                  wx.navigateBack({
                    delta: 2
                  })
                }
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
   // console.log(options.ccode);
    let userInfo = wx.getStorageSync('userInfo');
    let spotInfo = wx.getStorageSync('spotInfo');
    m.getcinfo(1, 10, spotInfo.controllerName, userInfo.token,(res)=>{
      that.setData({
        so:res.data.data[0]
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})