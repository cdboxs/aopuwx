import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
  }

  /**
   * 请求我的控制器列表
  */
  getListController(cName,token,callBack){
    
    cName ? cName:"";
    let parameter={
      url: '/manage/listController?token=' + token +'&page=1&limit=10',
      type:'POST',
      data:{
        mac:'',
        name: cName
      },
      sCallBack(res){
        callBack&&callBack(res);
      }
    };
    this.request('json',parameter);
  }

  getMoreCData(c_pages,token,callBack){
    let parameter = {
      url: '/manage/listController?token=' + token + '&page=' + c_pages+'&limit=10',
      type: 'POST',
      data: {
        mac:'',
        name: ""
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    };
    this.request('encode', parameter);
  }

  getSearchCData(c_pages, token,sName,callBack) {
    let parameter = {
      url: '/manage/listController?token=' + token + '&page=' + c_pages + '&limit=10',
      type: 'POST',
      data: {
        mac:'',
        name: sName
      },
      sCallBack(res) {
        callBack && callBack(res);
      }
    };
    this.request('encode', parameter);
  }
}
export{Model};