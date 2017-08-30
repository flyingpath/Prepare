import {observable, action} from 'mobx'

class InfoData {
    @observable
    gender = '' // male, female
    @observable
    age = '50'
    @observable
    tumorSize = ''
    @observable
    lymphNode = ''


    @action
    setGender(gender) {
        this.gender = gender
    }

    @action
    setAge(int) {
        this.age = int
    }

    @action
    setTumorSize(val) {
        this.tumorSize = val
    }

    @action
    setLymphNode(val) {
        this.lymphNode = val
    }

}

var infoData = new InfoData()

export default infoData
