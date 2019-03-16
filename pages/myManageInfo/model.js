import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
     
  }


  getControllerData(c_id,token,callback){
    let parameter={
      url: '/manage/findControllerMonit?token='+token, 
      data:{
        controllerId: c_id,
      },
      type:'POST',
      sCallBack(res){
        callback && callback(res);
      }
    }
    this.request('encode',parameter);
  }
  
  resetController(c_id,token,callback){
    let parameter = {
      url: '/manage/resetController?token=' + token,
      data: {
        id: c_id,
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }
  
  openDoor(c_id, token, callback) {
    let parameter = {
      url: '/comm/accreditDoor?token=' + token,
      data: {
        controllerId: c_id,
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }
  mainSwitch(c_id, powerflagStatus, token, callback) {
    let parameter = {
      url: '/manage/saveControllerPower?token=' + token,
      data: {
        id: c_id,
        powerFlag:powerflagStatus
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }
  fanSwitch(c_id, windflagStatus, token, callback) {
    let parameter = {
      url: '/manage/saveControllerWind?token=' + token,
      data: {
        id: c_id,
        windFlag: windflagStatus
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }

  //获取设备信息
  getEquipmentData(e_id, token, callback) {
    let parameter = {
      url: '/manage/findEquipmentMonit?token=' + token,
      data: {
        equipmentId: e_id,
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }

  resetEquipment(e_id, token, callback) {
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