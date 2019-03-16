// pages/history/index.js
const app = getApp();
import { Model } from './model.js';
let m = new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hpage:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    let userInfo = wx.getStorageSync('userInfo');
    m.getHlist(1, options.cid, options.fcode,userInfo.token,(res)=>{
      that.setData({
        history:res.data.data,
        cid: options.cid,
        fcode: options.fcode,
      });
    });
  },
  // 加载更多
  geHMoreData(e) {
    let userInfo = wx.getStorageSync('userInfo');
    that.data.hpage = parseInt(that.data.hpage) + 1;
    m.getHlist(that.data.hpage, 10, that.data.cid, that.data.fcode, userInfo.token, (res) => {
      let moreData = that.data.history;

      if (res.data.code == 0 && res.data.data.length != 0 && moreData.length < res.data.count) {

        for (let i = 0; i < res.data.data.length; i++) {
          moreData.push(res.data.data[i]);
        }

        that.setData({
          history: moreData
        });
      } else if (res.data.code == 0 && that.data.history.length == res.data.count) {
        wx.showToast({
          title: '没有更多了',
          mask: true,
          icon: 'none',
          duration: 1500
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
    that.geHMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
})