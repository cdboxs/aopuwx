            // pages/worklist/index.js
const app = getApp();
import {Model} from './model.js';
let m=new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workNavId:7,//切换默认选中
    scrollHeight:'',//滚动的高度
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if (!app.globalData.worknavid) {
      that.scrollHeight();
      m.showLoading('正在加载', 'none');
      let userInfo = wx.getStorageSync('userInfo');
      //工单状态（""：所有、0：待派单、1：待维修、2：维修中、3：待评价、4：已撤单、5：已完成、6：未完成）
      m.getWorkAllData("", userInfo.token, (res) => {
    
        if (res.data.code == 0) {
          let result=res.data.data;
          result.forEach((item)=>{
            if (item.maintUserId==userInfo.userId){
              item.faultContent = item.faultContent.substring(0, 10);
            }
          })
          that.setData({
            getWorkAllData: result
          });
          m.hideLoading(500);
        } else {
          wx.showToast({
            title: '暂无数据',
            mask: true,
            icon: 'none',
            duration: 1500
          })
        }
      });
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getWorkAllData:[]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.worknavid==1){
      m.query('.active', (res) => {
        that.setData({
          scrollLeft: 0
        });
        that.indexLinkworkList();
      });
       
    } else if (app.globalData.worknavid == 2){

      that.indexLinkworkList();
    } else if (app.globalData.worknavid == 5){
      m.query('.active', (res) => {
        that.setData({
          scrollLeft: 300
        });
        that.indexLinkworkList();
      });
      
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
  /*
  *首页超链接进入我的工单
  */
  indexLinkworkList(){
    

    let e = {
      currentTarget: {
        dataset: {
          worknavid: app.globalData.worknavid
        }
      }
    }
    that.workNav(e)
    app.globalData.worknavid = "undefined"
  },
  /*
  *workNav点击切换事件
  */ 
  linkWorkinfo(e){
    wx.setStorageSync('workInfo',e.currentTarget.dataset.workinfo);
    wx.navigateTo({
      url: '../workinfo/index?id=' + e.currentTarget.dataset.id
    })
  },
  workNav(e){
    let userInfo = wx.getStorageSync('userInfo');
    that.setData({
      workNavId: e.currentTarget.dataset.worknavid
    });
    if (e.currentTarget.dataset.worknavid==7){
      e.currentTarget.dataset.worknavid="";
    }
    //工单状态（""：所有、0：待派单、1：待维修、2：维修中、3：待评价、4：已撤单、5：已完成、6：未完成）
    m.getWorkAllData(e.currentTarget.dataset.worknavid, userInfo.token, (res) => {
      if (res.data.code == 0 && res.data.data.length != 0) {
        let result = res.data.data;
        result.forEach((item) => {
          if (item.faultContent!=null){
            item.faultContent = item.faultContent.substring(0, 13);
          }
          
        })
        that.setData({
          getWorkAllData: result
        });
      } else if (res.data.code == 0 && res.data.data.length == 0) {
        that.setData({
          getWorkAllData:[]
        });
        wx.showToast({
          title: '暂无数据',
          mask: true,
          icon: 'none',
          duration: 1500
        })
      }
    });
  },
  scrollHeight(e){
    m.query('.workNav',(q)=>{
      that.setData({
        scrollHeight: app.globalData.windowHeight - q[0].height-55
      });
    });
  },
  // 加载更多
  getWorkMoreData(e){
    console.log(e.currentTarget.dataset.id);
    let userInfo = wx.getStorageSync('userInfo');
    that.data.page=parseInt(that.data.page)+1;
    m.getWorkMoreData(that.data.page, 10, e.currentTarget.dataset.id, userInfo.token,(res)=>{
      let moreData = that.data.getWorkAllData;
    
      if (res.data.code == 0 && res.data.data.length != 0 && moreData.length < res.data.count) {
      
        for(let i=0;i<res.data.data.length;i++){
          moreData.push(res.data.data[i]);
        }
        moreData.forEach((item) => {
          if (item.faultContent != null) {
            item.faultContent = item.faultContent.substring(0, 13);
          }
        })
        that.setData({
          getWorkAllData: moreData
        });
      } else if (res.data.code == 0 && that.data.getWorkAllData.length == res.data.count) {    
        wx.showToast({
          title: '没有更多了',
          mask: true,
          icon: 'none',
          duration: 1500
        })
      }
    });
  }
})