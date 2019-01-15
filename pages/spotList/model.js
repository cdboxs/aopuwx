import {Tm} from '../../utils/tm.js';
class Model extends Tm{
 constructor(){
   super();
 }
  getSpotList(spage, slimit,cInfo,token,callBack){
    let parameter={
      url:'/route/listRouteCheckPoint?token='+token,
      type:'POST',
      data:{
        page:spage,
        limit: slimit,
        controllerName: cInfo
      },
      sCallBack(res){
        callBack && callBack(res);
      }
    }
    this.request('encode', parameter);
  }
  getsearSlist(page, limit, cInfo, token, callBack) {
    let parameter = {
      url: '/route/listRouteCheckPoint?token=' + token,
      type: 'POST',
      data: {
        controllerName: cInfo
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request('encode', parameter);
  }
}
export{Model};