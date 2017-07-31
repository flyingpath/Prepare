
import {observable, action} from 'mobx'

class DataStore {
  
  @observable 
  cancer = ''
  @observable 
  feature = ''
  @observable 
  page = 'cancer' // -- cancer, info, featureAndReport
  
  @action
  changePageTo(page){
    this.page = page
  }
  @action 
  setCancer(ca){
		this.cancer = ca;
	}
  @action 
  setFeature(val){
		this.feature = val;
	}

}

var dataStore = new DataStore()

export default dataStore
