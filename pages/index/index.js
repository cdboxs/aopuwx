//index.js
const app = getApp();
import {Model} from './model.js';
let m=new Model();
let that;
Page({
  data: {
   
  },

  
  onLoad: function () {
    that=this;
    m.query('.indexMap', (res) => {
      that.setData({
        mapHeight: app.globalData.windowHeight - res[0].top
      });
    });
    // let userInfo = wx.getStorageSync('userInfo');
    // m.getBanner(userInfo.token).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  },
  onShow:function(){
    
    m.location('realTime',(e)=>{
      let markers=[
        {
          iconPath: "../img/position.png",
          id: 0,
          latitude: e.wxMarkerData[0].latitude,
          longitude: e.wxMarkerData[0].longitude,
          width: 36,
          height: 36
        }
      ]
      that.setData({
        markers: markers,
        locationInfo:{
          latitude: e.wxMarkerData[0].latitude,
          longitude: e.wxMarkerData[0].longitude
          
        }
      });
      let locationInfo={
        latitude: e.wxMarkerData[0].latitude,
        longitude: e.wxMarkerData[0].longitude,
        address: e.wxMarkerData[0].address
      }
      wx.setStorageSync('locationInfo', locationInfo);
    })
  },

  
  /*----------------------------事件处理函数---------------------------------------*/
  linkWorkList(res){
    //console.log(res.currentTarget.dataset.worknavid);
    app.globalData.worknavid = res.currentTarget.dataset.worknavid;
    wx.switchTab({
      url: '../worklist/index',
    });
  },
  linkmyManage(){
    wx.navigateTo({
      url: '../myManage/index',
    })
  },
  linkMember(){
    wx.switchTab({
      url: '../member/index',
    })
  },
  linkSpotCheck(){
    wx.navigateTo({
      url: '../spotList/index',
    })
  },
  /**
   * 扫一扫
   * */ 
  scanCode(){
    wx.scanCode({
      onlyFromCamera:false,
      scanType: 'qrCode',
      success(e){
        wx.navigateTo({
          url: '../addController/index?result=' + e.result,
        })
      }
    })
  }

})
