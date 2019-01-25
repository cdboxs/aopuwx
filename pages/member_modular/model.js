import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
  }
  m_setPwd(setpwd,token,callback){
    let parameter={
      url: '/api/updatePass?token='+token,
      type:'POST',
      data:setpwd,
      sCallBack(res){
        callback && callback(res);
      }
    }
    this.request('encode',parameter);
  }
  m_setMyInfo(setName, token, callback) {
    let parameter = {
      url: '/api/updateUserMess.json?token=' + token,
      type: 'POST',
      data: setName,
      sCallBack(res) {
        callback && callback(res);
      }
    }
    this.request('encode', parameter);
  }
  // 获取用户信息
  geUserInfo(token, callback) {
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
export{Model}