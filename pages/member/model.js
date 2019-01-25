import { Tm } from '../../utils/tm.js';

class Model extends Tm {
  constructor() {
    super();
  }

  // 退出
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
  // 获取用户信息
  geUserInfo( token, callback) {
    let parameter = {
      url: '/api/userMess.json?token=' + token,
      data: {
        
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