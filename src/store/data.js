
import {observable, action} from 'mobx'

class CounterStore {
  
  @observable 
  cancer = '';

  @observable 
  feature = '';

  @action 
  setCancer(ca){
		this.cancer = ca;
	}

  @action 
  setFeature(val){
		this.feature = val;
	}


}

var counter = new CounterStore()

export default counter
