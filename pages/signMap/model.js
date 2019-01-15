import {Tm} from '../../utils/tm.js';
class Model extends Tm{
  constructor(){
    super();
  }
  mSign(id,token,callBack){
    let parameter={
      url:'/order/signInOrderInfo?token='+token,
      type:'POST',
      data:{
        id:id
      },
      sCallBack(res){
        callBack&&callBack(res);
      }
    };
    this.request("encode",parameter);
  }
}
export{Model}