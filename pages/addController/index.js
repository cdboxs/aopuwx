// pages/addController/index.js
import {Model} from './model.js';
const m=new Model();
const app=getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_info:"",
    cInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    let c_info=options.result.split('|');
    that.setData({ c_info:c_info});
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
    that=this;
    let userInfo=wx.getStorageSync('userInfo');
    let fmData = {
      mac: that.data.c_info[3],
    }
    // 查询控制器
    m.getSearchCData(userInfo.token, that.data.c_info[3], (res) => {
      //判断不存在
      if(res.data.data.length==0){
        wx.showModal({
          title: '提示',
          content: '控制器不存在',
          showCancel: false,
          confirmText: '确定',
          success(res) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        });
        return;
      }else{
        //判断已存在
        res.data.data.map((item) => {
          if (item.mac == that.data.c_info[3]) {
            that.setData({
              cInfo: item
            });
          }
        });//
        m.getRes_depart(userInfo.token, (res) => {
          if (res.data.data.length != 0) {
            res.data.data.map((item, index) => {
              if (item.name == that.data.cInfo.resOffice.name) {
                that.setData({
                  resindex: index,
                  getRes_depart: res.data.data
                });
              }
            });
          } else {
            wx.showToast({
              title: '获取所属单位失败',
              mask: true,
              icon: 'none'
            });
          }
        });//
        m.getMaint_depart(userInfo.token, (res) => {
          if (res.data.data.length != 0) {
            res.data.data.map((item, index) => {
              if (item.name == that.data.cInfo.maintOffice.name) {
                that.setData({
                  maintindex: index,
                  getMaint_depart: res.data.data
                });
              }
            });
          } else {
            wx.showToast({
              title: '获取维护单位失败',
              mask: true,
              icon: 'none'
            });
          }
        });//
        m.getMaintUser(that.data.cInfo.maintDepartId, userInfo.token, (res) => {
          if (res.data.data.length != 0) {
            res.data.data.map((item,index)=>{
              if (item.userName == that.data.cInfo.maintUser.userName){
                that.setData({
                  getMaintUser: res.data.data,
                  userindex: index
                });
              }
            });
            
          } else {
            wx.showToast({
              title: '获取维护人员失败',
              mask: true,
              icon: 'none'
            });
          }
        });//



      }
  
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
  // 选择所属单位
  s_res_depart(e){

    that=this;
    that.setData({
      resindex: e.detail.value
    });
  },
  //维护单位
  maint_depart(e){
    let userInfo = wx.getStorageSync('userInfo');
    that=this;
    that.setData({
      maintindex:e.detail.value,
    });
    m.getMaintUser(that.data.getMaint_depart[e.detail.value].id, userInfo.token, (res) => {
      if (res.data.data.length != 0) {
        that.setData({
          getMaintUser: res.data.data,
          userindex: e.detail.value
        });
      } else {
        wx.showToast({
          title: '获取所属单位失败',
          mask: true,
          icon: 'none'
        });
      }
    });
  },
  //维护人员
  maint_user(e){
    that=this;
    that.setData({
      userindex: e.detail.value,
    });
  },
  //添加控制器
  addController(res){
    let locationInfo=wx.getStorageSync('locationInfo');
    let userInfo = wx.getStorageSync('userInfo');
    let fmData={
        id: res.detail.value.cid,
        code:res.detail.value.code,
        name: res.detail.value.name,
        model: res.detail.value.model,
        ip: res.detail.value.ip,
        mac: res.detail.value.mac,
        server_url: res.detail.value.server_url,
        lng: locationInfo.longitude,
        lat: locationInfo.latitude,
        res_depart_id: res.detail.value.res_depart_id,
        maint_depart_id: res.detail.value.maint_depart_id,
        maint_user_id: res.detail.value.maint_user_id,
        bind_user_id: userInfo.userId

    }
    m.addController(fmData, userInfo.token,(res)=>{
      if(res.data.code==0){
        wx.showToast({
          title: '保存成功',
          mask:true,
          icon:'success'
        });
        setTimeout(()=>{
          wx.switchTab({
            url: '../index/index',
          })
        },1500);
      }else{
        wx.showToast({
          title: '保存失败',
          mask: true,
          icon: 'success'
        });
        setTimeout(() => {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1500);
      }
    });
  },

})