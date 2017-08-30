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
        !this.gender == '' && !this.age == '' && !this.tumorSize == '' && !this.lymphNode == '' ? this.KeyInfoButtonDisabled = false : this.KeyInfoButtonDisabled = true
    }

    @action
    setAge(int) {
        this.age = int
        !this.gender == '' && !this.age == '' && !this.tumorSize == '' && !this.lymphNode == '' ? this.KeyInfoButtonDisabled = false : this.KeyInfoButtonDisabled = true
    }

    @action
    setTumorSize(val) {
        this.tumorSize = val
        !this.gender == '' && !this.age == '' && !this.tumorSize == '' && !this.lymphNode == '' ? this.KeyInfoButtonDisabled = false : this.KeyInfoButtonDisabled = true
    }

    @action
    setLymphNode(val) {
        this.lymphNode = val
        !this.gender == '' && !this.age == '' && !this.tumorSize == '' && !this.lymphNode == '' ? this.KeyInfoButtonDisabled = false : this.KeyInfoButtonDisabled = true
    }

    @action
    KeyInfoButtonCheck() {

    }
}

var infoData = new InfoData()

export default infoData
