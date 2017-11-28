import {observable, action} from 'mobx'

class InfoData {
    @observable
    gender = 'female' // male, female
    @observable
    age = '33'
    @observable
    stage = 1
    @observable
    grade = 1

    @observable
    pr = 1


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
    setGrade(val) {
        this.grade = val
    }

    @action
    setStage(val) {
        this.stage = val
    }

    @action
    setPr(val) {
        this.pr = val
    }

    @action
    KeyInfoButtonCheck() {
    }

}

var infoData = new InfoData()

export default infoData
