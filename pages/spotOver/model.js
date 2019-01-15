import { Tm } from '../../utils/tm.js';
class Model extends Tm {
  constructor() {
    super();
  }
  getcinfo(page, limit, ccode, token, callBack) {
    let parameter = {
      url: '/route/listRouteCheckPoint?token=' + token,
      type: 'POST',
      data: {
        controllerName: ccode
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request('encode', parameter);
  }
  sendCheck(checkID, cresult, token, callBack) {
    let parameter = {
      url: '/route/saveRouteCheckPointRecord?token=' + token,
      type: 'POST',
      data: {
        routeCheckPointId: checkID,
        checkResult: cresult
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request('json', parameter);
  }
}
export { Model };