import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
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
        // equipments:[{
        //   code:'1',
        //   name:'2',
        //   type_id:'3',
        //   brand_id:'4',
        //   model_id:'5',
        //   brand:'6',
        //   model:'7',
        //   ip:'192.168.0.1',
        //   mac:'SDF24SDF4S',
        //   controller_id:'1',
        //   res_depart_id:'2',
        //   maint_depart_id:'3',
        //   maint_user_id:'4'
        // }]
      },
      sCallBack(res) {
        callback && callback(res)
      }
    };
    this.request('json', parameter);
  }
  
  getSearchCData( token, smac, callBack) {
    let parameter = {
      url: '/manage/listController?token=' + token + '&page=1&limit=10',
      type: 'POST',
      data: {
        mac:smac,
        name: ''
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    };
    this.request('json', parameter);
  }
}
export{Model}