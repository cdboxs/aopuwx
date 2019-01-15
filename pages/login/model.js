import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
  }

  login(namePwd,callback){
    let parameter={
      url:'/api/login.json',
      type:'POST',
      data: namePwd,
      sCallBack(res){
        callback && callback(res)
      }
    };
    this.request('json',parameter);
  }

}
export{Model}



















