import { Tm } from '../../utils/tm.js';

class Model extends Tm {
  constructor() {
    super();
  }

  // 获取所属单位
  loginOut(userName,token, callback) {
    let parameter = {
      url: '/api/loginOut.json?token=' + token,
      data: {
        loginName: userName,
        token: token
      },
      type: 'POST',
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('json', parameter);
  }


}
export { Model }