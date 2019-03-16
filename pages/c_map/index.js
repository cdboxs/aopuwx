// pages/workMap/index.js
import { Model } from './model.js';
const app = getApp();
const m = new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    signMapH: app.globalData.screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
  
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
    that.location();

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

  },

  /**
   * 点击签到
   */

  /**
   * 控件点击定位
   */
  /**
   * 定位方法
   */
  location() {
    m.showLoading('正在定位', 'none');
    let zb = wx.getStorageSync('controllerParam');
    if (zb.controllerMonit.lng != null && zb.controllerMonit.lat!=null){
      let markers = [
        {
          iconPath: "../img/position.png",
          id: 0,
          longitude: zb.controllerMonit.lng,
          latitude: zb.controllerMonit.lat,
          width: 36,
          height: 36
        }
      ]
      that.setData({
        marker: markers,
        locationInfo: {
          latitude: zb.controllerMonit.lat,
          longitude: zb.controllerMonit.lng,
        }
      });
      m.hideLoading(2000);
    }else{
      m.hideLoading(100);
      wx.showModal({
        title: '提示',
        content: '控制器经纬度错误',
        showCancel:false,
        success(e){
          if(e.confirm){
            wx.navigateBack({
              data:1
            })
          }
        }
      })
    }

  }
})