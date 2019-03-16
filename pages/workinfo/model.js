import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
  }

  signOver(orderid, token,wxfs,callBack) {
    let parameter = {
      url: '/order/overOrderInfo?token=' + token,
      type: 'POST',
      data: {
        id: orderid,
        content: wxfs
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request("encode",parameter);
  }
  getCData(c_id, token, callBack) {
    let parameter = {
      url: '/manage/findControllerMonit?token=' + token,
      type: 'POST',
      data: {
        controllerId: c_id
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    };
    this.request('encode', parameter);
  }
  solution(oid,token,callBack){
    let parameter = {
      url: '/order/repository?token=' + token,
      type: 'POST',
      data: {
        orderInfoId: oid
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    };
    this.request('encode', parameter);
  }
}
export{Model}