// pages/member_modular/setMyInfo/index.js
import { Model } from '../model.js';
const m = new Model();
const app = getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  setMyInfo(e){
    console.log(e.detail.value.userName);
    if (e.detail.value.userName==""){
      wx.showToast({
        title: '用户名不能为空',
        mask:true,
        icon:'none'
      })
      return;
    }else{
      let userInfo=wx.getStorageSync('userInfo');
      m.m_setMyInfo({ userName: e.detail.value.userName }, userInfo.token,(res)=>{
        if(res.data.code==0){
          wx.showToast({
            title: '修改成功',
            mask:true,
            icon:'none'
          });
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000);
         
        }else{
          wx.showToast({
            title: '修改修改失败',
            mask: true,
            icon: 'none'
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        }
      })
    }
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
    let that=this;
    let userInfo=wx.getStorageSync('userInfo');
    m.geUserInfo(userInfo.token, res => {
      if (res.data.code == 0) {
        that.setData({
          userInfo: res.data.data
        });
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