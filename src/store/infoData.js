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
    @observable
    KeyInfoButtonDisabled = true


    @action
    setGender(gender) {
        this.gender = gender
        !this.gender == '' && !this.age == '' ? this.KeyInfoButtonDisabled = false : this.KeyInfoButtonDisabled = true
    }

    @action
    setAge(int) {
        this.age = int
        !this.gender == '' && !this.age == '' ? this.KeyInfoButtonDisabled = false : this.KeyInfoButtonDisabled = true
    }

    @action
    setTumorSize(val) {
        this.tumorSize = val
    }

    @action
    setLymphNode(val) {
        this.lymphNode = val
    }

    @action
    KeyInfoButtonCheck() {

    }
}

var infoData = new InfoData()

export default infoData
