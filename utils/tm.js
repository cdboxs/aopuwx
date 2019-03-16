let bmap=require('./bmap-wx.min.js');
class Tm{
  constructor(){
    //this.httpurl ='http://120.77.80.232:8090';
    this.httpurl = 'https://www.opt-ims.com/znywapi';
    this.mapAK ='hpbEveY2MpkN1UT6w4i2DgCfyrNvfsAc';
    this.clear = '';
  }
  
  /**
   *request 数据请POSTPO求
   **/

   request(headerType,parameter){
     if(headerType=='json'){
       var header = {
         'Content-Type': 'application/json;'
       }
     }else if(headerType=='encode'){
       var header = {
         'Content-Type': 'application/x-www-form-urlencoded;'
       }
     }
     wx.request({
       url: this.httpurl+parameter.url,
       header: header,
       method: parameter.type,
       data:parameter.data,
       dataType: 'json',
       responseType: 'text',
       success: function(res) {
        // 判断token是否过期
         if (res.data.code == -1 || res.data.code == -3) {
           wx.removeStorageSync('userInfo');
           wx.showModal({
             title: '提示',
             content: '登录已过期请重新登录',
             showCancel:false,
             success(){
               wx.reLaunch({
                 url: '../login/index',
               })
             }
           })
          
           return;
         }
         parameter.sCallBack&&parameter.sCallBack(res);
       },
       fail: function(res) {
         parameter.fCallBack&&parameter.fCallBack(res);
       },
       complete: function(res) {},
     })
   }

  /**
  *query 查询节点信息
  *element 节点元素
  **/

  query(element, callback) {
    var query = wx.createSelectorQuery();
    query.select(element).boundingClientRect();
    query.exec(callback);
  }

  /**
    *map 地图定位
    *fixedTime 定位一次
    *realTime  实时定位
  **/  
  location(times,mapCallBack){
    let BMap = new bmap.BMapWX({
      ak: this.mapAK
    });
    let success = function (res) {
      mapCallBack(res);
    };
    let fail = function (res) {
     
      //console.log(res);
      
    };
    if(typeof times=='number'){
      var startTime=setInterval(()=>{        
        BMap.regeocoding({
          fail: fail,
          success: success,
        }); 
      },times);
      this.clear = startTime;
    } else if (times =='realTime'){
      BMap.regeocoding({
        fail: fail,
        success: success,
      });
    }
   
  }
  cleatDW(){
    clearInterval(this.clear);
  }
  /**
   *showloading 提示封装 
   *
   * **/ 
  showLoading(title,tip){
    wx.showLoading({
      title: title,
      master:true,
      icon: tip
    })
  }

  /**
   *hideloading 提示封装 
   *times  延迟关闭时间
   * **/
  hideLoading(times) {
    if(times){
      setTimeout(()=>{
        wx.hideLoading();
      },times)
    }else{
      wx.hideLoading();
    }
    
  }
  /**
   * echars报表
   * 
   * **/ 

  ajax(headerType, parameter) {
    let promise=new Promise((resolve,reject)=>{
          if (headerType == 'json') {
            var header = {
              'Content-Type': 'application/json;'
            }
          } else if (headerType == 'encode') {
            var header = {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }

          let a = wx.request({
            url: this.httpurl + parameter.url,
            header: header,
            method: parameter.type,
            data: parameter.data,
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              // 判断token是否过期
              if (res.data.code == -1) {
                wx.removeStorageSync('userInfo');
                wx.showModal({
                  title: '提示',
                  content: '登录已过期请重新登录',
                  showCancel: false,
                  success() {
                    wx.reLaunch({
                      url: '../login/index',
                    })
                  }
                })

                return;
              }
              resolve(res);
            },
            fail: function (res) {
              reject(res);
            },
            complete: function (res) { },
          });
    });

    return promise;
  }



}
export {Tm}