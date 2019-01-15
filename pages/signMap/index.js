// pages/workMap/index.js
import {Model} from './model.js';
const app=getApp();
const m=new Model();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    signMapH: app.globalData.screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    m.query('.signBtn',(e)=>{
      that.setData({
        id:options.id,
        signBtnLeft:app.globalData.windowWidth-e[0].width
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
    that.myLocation();
    that.getNowTime();
    setInterval(()=>{
     that.getNowTime(); 
    },10000);
    console.log(getCurrentPages()[0].data.workNavId);
   
  },
  getNowTime(){
    let nowDate = new Date();
    let tims = nowDate.getHours() + ':' + nowDate.getMinutes();
     that.setData({
       nowTime: tims
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

  /**
   * 点击签到
   */
  sign(e){
   m.showLoading('正在签到','none');
    let userInfo = wx.getStorageSync('userInfo');
    m.mSign(that.data.id, userInfo.token,(res)=>{
      if(res.data.code==0){
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          mask:true,
          icon:'success',
          success(){
            setTimeout(()=>{
              app.globalData.worknavid = getCurrentPages()[0].data.workNavId;
              wx.switchTab({
                url: '../worklist/index',
              })
            },2000)
          }
        });
      }else if(res.data.code==-3){
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          mask: true,
          icon: 'none'
        });
      }
    });
  },
  /**
   * 控件点击定位
   */
  myLocation(){
    m.showLoading('正在定位','none');
    that.location();
    
  },
  /**
   * 定位方法
   */
  location(){

    let zb = wx.getStorageSync('workInfo');
    let myLocation = wx.getStorageSync('locationInfo');
    if (zb.lat != null || zb.lng != null) {
      m.location('realTime', (e) => {
        let markers = [
          {
            iconPath: "../img/position.png",
            id: 0,
            latitude: zb.lat,
            longitude: zb.lng,
            width: 36,
            height: 36
          }
        ]
        console.log(zb.lng);
        that.setData({
          markers: markers,
          lng: zb.lng,
          lat: zb.lat,
          myAddress: {
            address: myLocation.address
          }
        });
        m.hideLoading(1500);
      })
     
    }else{
      wx.showToast({
        title: '定位失败',
        icon: 'none',
        mask: true,
        duration: 2000,
        success(){
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            });
          },2500);
         
        }
      });
     
      m.hideLoading(1500);
      
    }

  }
})