// pages/workinfo/index.js
import {Model} from './model.js';
let app=getApp();
let m= new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    height: app.globalData.windowHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    let getWorkInfo=wx.getStorageSync('workInfo');
    let userInfo = wx.getStorageSync('userInfo');
    getWorkInfo.equipmentCname = options.equipmentCname;
    if (getWorkInfo.pointType==2){
      m.getCData(getWorkInfo.controllerId, userInfo.token, res => {
        let getWI= wx.getStorageSync('workInfo');
        getWI.lng = res.data.data.controller.lng;
        getWI.lat = res.data.data.controller.lat;
        wx.setStorageSync('workInfo', getWI)
      });
    }
   
    that.setData({
      wi: getWorkInfo
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
  historyGz(e){
    wx.navigateTo({
      url: '../history/index?cid=' + e.currentTarget.dataset.cid + '&fcode='+e.currentTarget.dataset.fcode,
    })
  },
  linkSignMap(e){
    let workInfo = wx.getStorageSync('workInfo');
    wx.navigateTo({
      url: '../signMap/index?id=' + workInfo.id + '&onlymap=' + e.currentTarget.dataset.onlymap,
    })
  },
  signShowModal(){
    let that = this;
    that.setData({
      showModal: true
    });
  },
  btnFalse(){
    let that=this;
    that.setData({
      showModal:false
    });
  },
  signOver(e){
    if (e.detail.value.wxfs==""){
      wx.showToast({
        title: '请填写维修方式',
        mask:true,
        icon:'none'
      });
      return;
    }else{
      let workInfo = wx.getStorageSync('workInfo');
      let userInfo = wx.getStorageSync('userInfo');
      m.signOver(workInfo.id, userInfo.token, e.detail.value.wxfs, (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '维修成功',
            mask: true,
            icon: 'none',
            success() {
              setTimeout(() => {
                app.globalData.worknavid = getCurrentPages()[0].data.workNavId;
                wx.switchTab({
                  url: '../worklist/index',
                })
              }, 2000);
            }
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            mask: true,
            icon: 'none'
          })
        }
      });
    }
 
  },
  callPhone(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum,
    })
  }
})