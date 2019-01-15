// pages/login/index.js
import { Model } from './model.js';
const app=getApp();
let m=new Model();
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
    if (wx.getStorageSync('userInfo')){
      wx.switchTab({
        url: '../index/index',
      })
    }
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
  login(e){
    if (e.detail.value.phone == "" || isNaN(e.detail.value.phone)){
      wx.showToast({
        title: '手机号有误',
        mask:true,
        icon:'none'
      })
      return;
    } else if (e.detail.value.pwd == ""){
      wx.showToast({
        title: '密码不能为空',
        mask: true,
        icon: 'none'
      })
      return;
    }else{
      wx.showLoading({
        title: '正在登录',
        mask: true,
        icon: 'none'
      })
      m.login({ loginName: e.detail.value.phone, loginPass: e.detail.value.pwd},(res) => {   
       
        if(res.data.code !=0){
          wx.hideLoading()
          wx.showToast({
            title: '用户名或密码错误',
            mask: true,
            icon: 'none'
          });
          return;
        } else if(res.data.code == 0){
          wx.setStorageSync('userInfo',res.data.data);
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index',
          });
        }
      });
    }
  }
})