import * as echarts from '../../ec-canvas/echarts';
import { Model } from './model.js';
let m = new Model();
const app = getApp();
let that;

Page({

  data: {
    maskflag:false,
    ybflag:true,
    height: app.globalData.windowHeight
  },
  onLoad:function(e){
    that=this;
    that.setData({ e_id:e.id});
    
  },
  onShow(){
    var that=this;
    
    that.getEquipmentData();
    that.setData({
      allSwitch: { onInit: that.allSwitch },//总闸
      temperature: { onInit:that.temperature},//温度
      humidity: { onInit: that.humidity},//湿度
      PowerSupply:{ onInit: that.PowerSupply}//电源
    });
    
    
  },
  onReady() {

  },
  /*总闸*/ 
  allSwitch(canvas, width, height) {
    var that = this;
    var CPS = wx.getStorageSync('controllerParam');
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    option.series[0].data[0].value = CPS.controllerMonit.voltageOwn;
    //option.series[0].data[0].value =211;
    option.series[0].detail.formatter= "{value}V",
    option.series[0].max = 280
    option.series[0].min = 160
    option.series[0].splitNumber =10
    //间隔最小范围min/280 间隔最大范围 max/280
    option.series[0].axisLine.lineStyle.color = [[0.2, '#ff4500'], [0.8, 'green'], [1, '#ff4500']],
    canvas.setChart(chart);
    chart.setOption(option, true);
   
    return chart;
    
  },
  /*电流*/
  temperature(canvas, width, height) {
    var that = this;
    var CPS = wx.getStorageSync('controllerParam');
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    option.series[0].data[0].value = CPS.controllerMonit.electricOwn
    //option.series[0].data[0].value = 47
    option.series[0].detail.formatter = "{value}℃",
    option.series[0].min = 0
    option.series[0].max = 120
    option.series[0].splitNumber =10 
    option.series[0].axisLine.lineStyle.color = [[0.2, '#ff4500'], [0.8, 'green'], [1, '#ff4500']],
    canvas.setChart(chart);
    chart.setOption(option, true);
    return chart;
  },
  /*丢包率*/
  humidity(canvas, width, height) {
    var that = this;
    var CPS = wx.getStorageSync('controllerParam');
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
     option.series[0].data[0].value = CPS.controllerMonit.dampNum
    //option.series[0].data[0].value = 61
    option.series[0].detail.formatter = "{value}%",
      option.series[0].min = 0
    option.series[0].max = 120
    option.series[0].splitNumber = 10
    option.series[0].axisLine.lineStyle.color = [[0.2, '#ff4500'], [0.8, 'green'], [1, '#ff4500']],
    canvas.setChart(chart);
    chart.setOption(option, true);
    return chart;
  },
  /*电源适配器*/
  PowerSupply(canvas, width, height) {
    var that = this;
    var CPS = wx.getStorageSync('controllerParam');
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    option.series[0].data[0].value = CPS.controllerMonit.adapterVoltage
    //option.series[0].data[0].value = 77
    option.series[0].detail.formatter = "{value}V",
    option.series[0].min = 0
    option.series[0].max = 120
    option.series[0].splitNumber = 10
    option.series[0].axisLine.lineStyle.color = [[0.2, '#ff4500'], [0.8, 'green'], [1, '#ff4500']],
    canvas.setChart(chart);
    chart.setOption(option, true);
    return chart;
  },
  /**
  * 获取控制器下设备的详情
  * **/
  getEquipmentData() {
    let userInfo = wx.getStorageSync('userInfo');
    m.getEquipmentData(that.data.e_id, userInfo.token, (res) => {
      console.log(res);
      if(res.data.code==0 && res.data.data !=null){
        setTimeout(()=>{
          that.setData({
            c: res.data.data,
            maskflag: false,
            ybflag: true
          });
        },1000);
        
      }
    });
  },
  /**
   * 重启控制器下的设备
   * */ 
  resetEquipment(){
    m.showLoading('正在重启','none');
    let userInfo = wx.getStorageSync('userInfo');
    m.resetEquipment(that.data.e_id, userInfo.token, (res) => {
     if(res.data.code==0){
       setTimeout(()=>{
         wx.hideLoading();
         wx.showToast({
           title: '重启成功',
           mask: true,
           icon: 'none'
         })
       },1000);
     }
     
    });
  },
});
let option = {
  backgroundColor: "#ffffff",
  series: [{
    name: '业务指标',
    type: 'gauge',
    center: ["50%", "50%"], // 仪表位置
    radius: "100%", //仪表大小
    min: 0,
    max: 120,
    splitNumber: 6,
    detail: {
      formatter: '{value}%'
    },
    splitLine: { // 分隔线
      length: 10, // 属性length控制线长
      lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
        width: 2,
        color: '#2cabe3',
        shadowColor: '#2cabe3', //默认透明
        shadowBlur: 0
      }
    },
    detail: {
      show: true,
      formatter: "{value}%",
      offsetCenter: [0, "78%"],
      fontSize:14
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 4,
        shadowBlur: 0,
        color: [[0.2, '#228b22'], [0.2, 0.4, 'blue'], [1, '#ff4500']], 
      },
    },
    axisLabel:{
      textStyle: {
        fontSize: 10
      }
    },
 
    data: [{
      value: 0,//默认百分百
      name: '',
      
    }]

  }]
}
