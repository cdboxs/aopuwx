import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
     
  }

  getBanner(token){
    let parameter={
      url: '/comm/accreditDoor?token='+token, 
      data:{
        "controllerId": '307'
      },
      type:'POST'
    }
    return this.ajax('encode',parameter);
  }
  //是否可以编辑
  isEditor(cmac, token, callback) {
    let parameter = {
      url: '/api/judgeMac.json?token=' + token,
      data: {
        mac: cmac
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