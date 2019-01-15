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
}
export {Model}