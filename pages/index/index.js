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

  },
  onShow:function(){
   
    m.location(3000, (e) => {
      //console.log(e);
      if (e.wxMarkerData.length == 1) {
        let markers = [
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
          locationInfo: {
            latitude: e.wxMarkerData[0].latitude,
            longitude: e.wxMarkerData[0].longitude

          }
        });
        let locationInfo = {
          latitude: e.wxMarkerData[0].latitude,
          longitude: e.wxMarkerData[0].longitude,
          address: e.wxMarkerData[0].address
        }
        m.cleatDW();
      }
    })
  },
  onUnload(){
    // m.cleatDW();
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
      onlyFromCamera:true,
      scanType: 'qrCode',
      success(e){       
        let userInfo = wx.getStorageSync('userInfo');
        m.isEditor(e.result, userInfo.token, (res) => {     
          //code=1编辑控制器 code=2查询控制器信息
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../addController/index?result='+ e.result,
            })
          } else if (res.data.code == 2) {
            wx.navigateTo({
              //url: '../addController/index?result=' + e.result,
              url: '../aSController/index?result=' + e.result,
            })
          } else if (res.data.code == 3) {
            wx.showModal({
              title: '提示',
              content: '控制器未接入系统,请重试',
              showCancel:false,
              success(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              }
            })
          }
        });
       
      },
      fail(res){
        console.log(res);
      }
    })
  }

})
