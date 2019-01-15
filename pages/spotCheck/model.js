import {Tm} from '../../utils/tm.js';
class Model extends Tm{
  constructor(){
    super();
  }
  spotCheck(cmac,rcpid,token,callBack){
    let parameter={
      url:'/route/patrolScanningCode?token='+token,
      type:'POST',
      data:{
        mac:cmac,
        routeCheckPointId: rcpid
      },
      sCallBack(res){
        callBack&&callBack(res);
      }
    };
    this.request("encode",parameter);
  }
}
export{Model}