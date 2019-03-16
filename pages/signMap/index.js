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
        onlymap: options.onlymap,
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
    m.showLoading('正在定位', 'none');
    that.location();
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
    m.cleatDW();
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
    if (zb.lat != null && zb.lng != null) {
      m.location(500, (e) => {
        if (e.wxMarkerData.length==1){
          let markers = [
            {
              iconPath: "../img/position.png",
              id: 0,
              latitude: zb.lat,
              longitude: zb.lng,
              width: 36,
              height: 36
            },
            {
              iconPath: "../img/mylcation.png",
              id: 0,
              latitude: e.wxMarkerData[0].latitude,
              longitude: e.wxMarkerData[0].longitude,
              width: 36,
              height: 36
            }
          ]
          that.setData({
            marker: markers,
            lat: e.wxMarkerData[0].latitude,
            lng: e.wxMarkerData[0].longitude,
            myAddress: {
              address: e.wxMarkerData[0].address
            }
          });
          m.cleatDW();
          m.hideLoading(2000);
        }else{
          that.location();
        }
   
      
      })
     
    }else{
     
      wx.showModal({
        title: '提示',
        content: '定位失败，获取经纬度失败',
        showCancel:false,
        success(res){
          if(res.confirm){
            wx.navigateBack({
              delta: 1
            });
          }
        }
      })
    }

  }
})