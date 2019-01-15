import { Tm } from '../../utils/tm.js';

class Model extends Tm {
  constructor() {
    super();
  }
  // 获取全部工单数据
  getHlist(hpage,cid,fcode, token, callBack) {
    let parameter = {
      url: '/order/listOrderInfoByFault?token=' + token,
      type: 'POST',
      data: {
        page: hpage,
        limit: 10,
        equipmentId:'',
        faultCode: fcode,
        controllerId: cid
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request('encode', parameter);
  }

}
export { Model }