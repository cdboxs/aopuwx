import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
  }
  // 获取全部工单数据
  getWorkAllData(status,token,callBack){
    let parameter={
      url:'/order/listOrderInfo?token='+token,
      type:'POST',
      data:{
        page:1,
        limit:10,
        status: status
      },
      sCallBack(res){
        callBack&&callBack(res);
      }
    }
    this.request('encode',parameter);
  }

  //加载更多
  getWorkMoreData(page, limit,status,token,callBack){
    if (status == 7) status = "";
    let parameter = {
      url: '/order/listOrderInfo?token=' + token,
      type: 'POST',
      data: {
        page: page,
        limit: limit,
        status: status
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    }
    this.request('encode', parameter);
  }
}
export{Model}