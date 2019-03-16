// pages/member/index.js
import { Model } from './model.js';
const m = new Model();
const app = getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    let userInfo = wx.getStorageSync('userInfo');
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    m.geUserInfo(userInfo.token, res => {
      if (res.data.code == 0) {
        setTimeout(() => {
          that.setData({
            userInfo: res.data.data
          });
          wx.hideLoading();
        }, 1000);

      } else {
        wx.showToast({
          title: '获取数据失败',
          mask: true,
          icon: 'none'
        })
      }
    });
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

  },
  loginOut(){
    let userInfo= wx.getStorageSync('userInfo');
    m.loginOut(userInfo.userName,userInfo.token,(res)=>{
      if(res.data.code==0){
        wx.clearStorageSync();
        wx.reLaunch({
          url: '../login/index',
        })
      }
    });
  },
  linkSetPwd(){
    wx.navigateTo({
      url: '../member_modular/setPwd/index',
    })
  },
  linkMyInfo(){
    wx.navigateTo({
      url: '../member_modular/setMyInfo/index',
    })
  }
})