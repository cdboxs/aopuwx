// pages/spotList/index.js
import {Model} from './model.js';
const app=getApp();
let m=new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slist:true,
    searchResult: false,
    s_pages: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  
  },
  getSpotListMore() {
    let userInfo = wx.getStorageSync('userInfo');
    let sMore = that.data.s;
    that.data.s_pages += 1
    //console.log(that.data.c_pages);
    m.getSpotList(that.data.s_pages,10,"", userInfo.token, (res) => {
      //console.log(res);
      if (res.data.data.length >= res.data.count) {
        wx.showToast({
          title: '没有更多了',
          mask: true,
          icon: 'none'
        })
        return;
      }
      for (let i = 0; i < res.data.data.length; i++) {
        sMore.push(res.data.data[i]);
      }
      that.setData({
        s: sMore
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
    let userInfo = wx.getStorageSync('userInfo');
    m.getSpotList(1, 10,"", userInfo.token, (res) => {
      if (res.data.data.length != 0) {
        that.setData({
          slist: true,
          s: res.data.data
        });
      } else {
        wx.showToast({
          title: '暂无数据',
          mask: true,
          icon: 'none'
        })
      }

    });
    m.query('.search', (e) => {
      that.setData({
        searchResult: false,
        sHeight: app.globalData.windowHeight - e[0].height
      });
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

  },
  linkspotCheck(e) {
    wx.setStorageSync('spotInfo', e.currentTarget.dataset.cinfo);
    wx.navigateTo({
      url: '../spotCheck/index'
    })
  },
  getsearchData(e) {
    console.log(e.detail.value);
    if (e.detail.value) {
      let userInfo = wx.getStorageSync('userInfo');
      m.getsearSlist(1, 100, e.detail.value,userInfo.token, (res) => {
        console.log(res);
        that.setData({
          sName: e.detail.value,
        });
        if (res.data.code == 0 && res.data.data.length != 0) {
          m.showLoading('正在查询', 'none');
          setTimeout(() => {
            m.query('.search', (e) => {
              that.setData({
                listControllerS: res.data.data,
                searchResult: true,
                slist:false,
                searchResultHeight: app.globalData.windowHeight - e[0].height - 64
              });
            });
            wx.hideLoading()
          }, 1000);
        } else if (res.data.code == 0 && res.data.data.length == 0) {
          m.showLoading('正在查询', 'none');
          setTimeout(() => {
            wx.hideLoading();
            wx, wx.showToast({
              title: '未查到相关数据',
              mask: true,
              icon: 'none',
              duration: 1500
            });
          }, 1000);
        }
      });
    } else {
      that.setData({
        slist: true,
        searchResult: false,
      });
    }
  },
  del() {
    that.setData({
      result: '',
      slist: true,
      searchResult: false,
    });
  },
})