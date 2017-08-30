import {observable, action} from 'mobx'
import dataStore from './data'

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
    keyinfoConfirmButton = true
    @observable
    dialogOpen = false
    @observable
    err = ''


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

    @action confirm(){
        //--- 檢查性別與年齡是否有填 ----//
        //------ 年齡須為正整數 -------//
        const gender = this.gender
        const age = this.age

        const reNonNum = /\D/

        if(gender !=='male' && gender !== 'female'){
            console.log(gender);
            this.err = '請輸入您的性別'
            this.dialogOpen = !this.dialogOpen
        }else if(age === '' ){
            this.err = '請輸入年齡'
            this.dialogOpen = !this.dialogOpen
        }else if( age.search(reNonNum) !== -1 || Number.isInteger(parseFloat(reNonNum))){
            this.err = '年齡請輸入正整數'
            this.dialogOpen = !this.dialogOpen
        }else{
            this.keyinfoConfirmButton = false
            dataStore.changePageTo('featureAndReport')
        }
    }

}

var infoData = new InfoData()

export default infoData
