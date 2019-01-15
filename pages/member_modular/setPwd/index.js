// pages/member_modular/setPwd/index.js
import {Model} from '../model.js';
const m=new Model();
const app=getApp();
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
    that=this;
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
  setPwd(e){
    //console.log(e.detail.value);
    if(e.detail.value.oldPwd==""){
      wx.showToast({
        title: '请输入原始密码',
        mask:true,
        icon:'none'
      })
      return;
    } else if (e.detail.value.newPwd==""){
      wx.showToast({
        title: '请输入新密码',
        mask:true,
        icon:'none'
      });
      return;
    }else{
      let userInfo = wx.getStorageSync('userInfo');
      m.m_setPwd({ pass: e.detail.value.oldPwd, newPass: e.detail.value.newPwd }, userInfo.token, (res) => {
        console.log(res);
        if(res.data.code==-3){
          wx.showToast({
            title: '原始密码错误',
            mask:true,
            icon:'none'
          });
          return;
        }else if(res.data.code==0){
          wx.removeStorageSync('userInfo');
          wx.showModal({
            title: '提示',
            content: '密码修改成功,请重新登录',
            showCancel:false,
            success(){
             wx.reLaunch({
               url: '../../login/index',
             })
            }
          })
        }
      })
    }
   
  }
})