import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
     
  }

//获取设备信息
  getEquipmentData(e_id,token,callback){
    let parameter={
      url: '/manage/findEquipmentMonit?token='+token, 
      data:{
        equipmentId: e_id,
      },
      type:'POST',
      sCallBack(res){
        callback && callback(res);
      }
    }
    this.request('encode',parameter);
  }
  
  resetEquipment(e_id,token,callback){
    let parameter = {
      url: '/manage/resetEquipment?token=' + token,
      data: {
        id: e_id,
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }
}
export {Model}