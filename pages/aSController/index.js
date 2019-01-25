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
    cmac:"",
    cInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.setData({ cmac: options.result});
    let userInfo = wx.getStorageSync('userInfo');
    let fmData = {
      mac: options.result,
    }

    // 查询控制器
    m.getSearchCData(userInfo.token, options.result, (res) => {
      //判断不存在
      if (res.data.data.length == 0) {
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
      } else {
        //判断已存在
        that.setData({
          cInfo: res.data.data[0]
        });//
        //获取所属单位
        m.getRes_depart(userInfo.token, (res) => {
          if (res.data.data.length != 0 && that.data.cInfo.resDepartName !=null) {
            res.data.data.map((item, index) => {
              if (item.name == that.data.cInfo.resDepartName) {
                that.setData({
                  resindex: index,
                  getRes_depart: res.data.data
                });
              }
            });
          } else {
            wx.showToast({
              title: '获取数据失败',
              mask: true,
              icon: 'none'
            });
            return;
          }
        });

        //获取维护单位
        m.getMaint_depart(userInfo.token, (res) => {
          if (res.data.data.length != 0 && that.data.cInfo.maintDepartName !=null) {
            let MaintdepartId = "";
            res.data.data.map((item, index) => {
              if (item.name == that.data.cInfo.maintDepartName) {
                that.setData({
                  maintindex: index,
                  getMaint_depart: res.data.data
                });
                MaintdepartId = item.id
              }
            });
            that.getMaintUser(MaintdepartId);
          } else {
            wx.showToast({
              title: '获取数据失败',
              mask: true,
              icon: 'none'
            });
            return;
          }
        });
      }//else
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取维护人员
  getMaintUser(id) {
    let userInfo = wx.getStorageSync('userInfo');
    m.getMaintUser(id, userInfo.token, (res) => {
      if (res.data.data.length != 0) {
        res.data.data.map((item, index) => {
          if (item.userName == that.data.cInfo.maintUserName) {
            that.setData({
              getMaintUser: res.data.data,
              userindex: index
            });
          }
        });

      } else {
        wx.showToast({
          title: '获取数据失败',
          mask: true,
          icon: 'none'
        });
        return;
      }
    });//
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
    let userInfo = wx.getStorageSync('userInfo');
    let fmData={
        name: res.detail.value.name,
        mac: res.detail.value.mac,
        res_depart_id: res.detail.value.res_depart_id,
        maint_depart_id: res.detail.value.maint_depart_id,
        maint_user_id: res.detail.value.maint_user_id,
        bind_user_id: userInfo.userId

    }
    m.addController(fmData, userInfo.token,(res)=>{
      console.log(res)
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
      } else if (res.data.code == 9000){
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