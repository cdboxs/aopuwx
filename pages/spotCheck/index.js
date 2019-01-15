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
  checkCode(e){
  
    wx.scanCode({
      onlyFromCamera: false,
      scanType: 'qrCode',
      success(e) {
        let userInfo = wx.getStorageSync('userInfo');
        let spotInfo = wx.getStorageSync('spotInfo');
        m.spotCheck(e.result, spotInfo.id, userInfo.token, (res) => {
          if(res.data.code==0){
            wx.navigateTo({
              url: '../spotOver/index',
            })
          }else if(res.data.code==-3){
            wx.showToast({
              title:'二维码信息错误',
              mask:true,
              icon:'none'
            });
            setTimeout(()=>{
              wx.switchTab({
                url: '../spotList/index',
              })
            },2000);
          }
        })
     
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


    let myLocation = wx.getStorageSync('locationInfo');
    m.location('realTime', (e) => {
      let markers = [
        {
          iconPath: "../img/position.png",
          id: 0,
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          width: 36,
          height: 36
        }
      ]
      that.setData({
        markers: markers,
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        myAddress: {
          address: myLocation.address
        }
      });
      m.hideLoading(1500);
    })

  }
})