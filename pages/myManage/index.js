// pages/myManage/index.js
import { Model} from './model.js';
const app=getApp();
let m=new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult:false,
    c_pages:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.getListControllerData("");
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
    m.query('.search', (e) => {
      that.setData({
        searchResult: false,
        searchResultHeight: app.globalData.windowHeight - e[0].height 
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
  linkManageInfo(e){
    wx.navigateTo({
      url: '../myManageInfo/index?mmid=' + e.currentTarget.dataset.mmid,
    })
  },
  getsearchData(e){
    //console.log(e.detail.value);
    if (e.detail.value){
      let userInfo = wx.getStorageSync('userInfo');
      m.getListController(e.detail.value, userInfo.token, (res) => {
        that.setData({
          sName: e.detail.value,
        });
        if (res.data.code == 0 && res.data.data.length != 0) {
          m.showLoading('正在查询','none');
          setTimeout(() => {
            m.query('.search', (e) => {
              that.setData({
                listControllerS: res.data.data,
                searchResult: true,
                searchResultHeight: app.globalData.windowHeight - e[0].height - 64
              });
            });
            wx.hideLoading()
          }, 1000);
        } else if (res.data.code == 0 && res.data.data.length == 0) {
          m.showLoading('正在查询', 'none');
          setTimeout(()=>{
            wx.hideLoading();
            wx, wx.showToast({
              title: '未查到相关数据',
              mask: true,
              icon: 'none',
              duration: 1500
            }); 
          },1000); 
        }
      });
    }else{
      that.setData({
        searchResult: false,
      });
    }
  },
  del(){
    that.setData({
      result:'',
      searchResult: false,
    });
  },
  getListControllerData(sName){
    sName ? sName : "";
    let userInfo = wx.getStorageSync('userInfo');
    m.getListController(sName, userInfo.token, (res) => {
      if (res.data.code == 0 && res.data.data.length != 0) {
        //console.log(res);
        that.setData({
          listController: res.data.data
        });
      } else if (res.data.code == 0 && res.data.data.length == 0) {
        wx, wx.showToast({
          title: '暂无数据',
          mask: true,
          icon: 'none',
          duration: 1500
        })
      }
    });
  },
  getMoreControllerData(){
    let userInfo = wx.getStorageSync('userInfo');
    let mList = that.data.listController;
    that.data.c_pages+=1
    //console.log(that.data.c_pages);
    m.getMoreCData(that.data.c_pages,userInfo.token,(res)=>{
      console.log(res);
      if(res.data.data.length>=res.data.count){
        wx.showToast({
          title: '没有更多了',
          mask:true,
          icon:'none'
        })
        return;
      }
      for(let i=0;i<res.data.data.length;i++){
        mList.push(res.data.data[i]);
      }
      that.setData({
        listController: mList
      });
    })
  },
  searchLoadMore() {
    let userInfo = wx.getStorageSync('userInfo');
    let mList = that.data.listControllerS;
    that.data.c_pages += 1
    console.log(that.data.c_pages);
    m.getSearchCData(that.data.c_pages, userInfo.token, that.data.sName, (res) => {
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
        mList.push(res.data.data[i]);
      }
      that.setData({
        listControllerS: mList
      });
    })
  }
})