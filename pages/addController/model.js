import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
  }
  //是否可以编辑
  isEditor(cmac,token, callback){
    let parameter = {
      url: '/api/judgeMac.json?token=' + token,
      data: {
        mac:cmac
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }
  // 获取所属单位
  getRes_depart(token,callback){
    let parameter = {
      url: '/api/queryResOffice.json?token=' + token,
      data: {},
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }

  getMaint_depart(token,callback){
    let parameter={
      url:'/api/queryMaintOffice.json?token='+token,
      data:{},
      type:'POST',
      sCallBack(res){
        callback && callback(res);
      }
    };
    this.request('encode',parameter);
  }

  getMaintUser(uID,token,callback){
    let parameter={
      url:'/api/queryMaintUser.json?token='+token,
      type:'POST',
      data:{
        departId:uID
      },
      sCallBack(res){
        callback && callback(res)
      }
    };
    this.request('json',parameter);
  }

  addController(fmData, token, callback){
    let parameter = {
      url: '/api/saveController.json?token=' + token,
      type: 'POST',
      data: {
        controller: fmData,
      },
      sCallBack(res) {
        callback && callback(res)
      }
    };
    this.request('json', parameter);
  }
  
  getSearchCData( token, smac, callBack) {
    let parameter = {
      url: '/api/queryController.json?token=' + token,
      type: 'POST',
      data: {
        mac:smac
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    };
    this.request('encode', parameter);
  }
}
export{Model}