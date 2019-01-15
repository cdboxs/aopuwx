import {Tm} from '../../utils/tm.js';

class Model extends Tm{
  constructor(){
    super();
     
  }

  getBanner(token){
    let parameter={
      url: '/comm/accreditDoor?token='+token, 
      data:{
        "controllerId": '307'
      },
      type:'POST'
    }
    return this.ajax('encode',parameter);
  }
  
}
export {Model}