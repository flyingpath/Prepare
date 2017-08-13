import {observable, action} from 'mobx'

class InfoData {
    @observable
    gender = '' // male, female
    @observable
    age = ''
    @observable
    tumorSize = ''
    @observable
    lymphNode = ''

    @action
    setGender(gender) {
        this.gender = gender
    }

}

var infoData = new InfoData()

export default infoData
