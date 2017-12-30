import {observable, action} from 'mobx'

class InfoData {
    @observable
    gender = 'female' // male, female
    @observable
    age = '33'
    @observable
    Tstage = 1
    @observable
    Nstage = 0
    @observable
    grade = 1

    @observable
    pr = 1
    @observable
    er = 0
    @observable
    her2 = 0

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
    setTumorSize(val) { this.tumorSize = val }

    @action
    setLymphNode(val) { this.lymphNode = val }

    @action
    setGrade(val) { this.grade = val }

    @action
    setTStage(val) {this.Tstage = val }
    
    @action
    setNStage(val) { this.Nstage = val }

    @action
    setPR(val) { this.pr = val }

    @action
    setER(val) { this.er = val }

    @action
    setHER2(val) { this.her2 = val }

    @action
    KeyInfoButtonCheck() {
    }

}

var infoData = new InfoData()

export default infoData
