import {observable, action, computed, toJS} from 'mobx'
import _ from 'lodash'

import infoData from './infoData'

class DataStore {

    @observable
        // cancer = { value: 'breast', label: '乳癌' }
    cancer = { value: 'breast', label: '乳癌' }
    
    @observable
        // feature = 'op'
    feature = ''

    @observable
    actionFeature={
        ct: 0,
        rt: 0,
        ht: 0,
    }
    @observable
    survivalData=[]
    @observable
    fetchData=[]


    @observable
    page = 'cancer' // -- cancer, info, featureAndReport
    @observable
    routePageClass = "prepare_route_page_forward"
    @observable
    confirmButton = false

    @observable
    load=false
    @observable
    reportType='bar'

    @action
    changeReportType(value) {
        this.reportType = value
    }
    @action
    changePageTo(page) {
        this.page = page
    }
    @action
    setActionFeature(key, val) {
        let obj = this.actionFeature
        obj[key]= val
        this.actionFeature= obj
        this.setSurvivalData()
    }
    @action
    initActionFeature(obj) {
        // this.actionFeature=obj
    }
    @action
    setCancer(ca) {
        this.cancer = ca;
    }

    @action
    setFeature(val) {
        this.feature = val;
    }

    @action
    setRouteDirection(val) {
        if (val === 'forward') {
            this.routePageClass = "prepare_route_page_forward"
        } else if (val === 'backward') {
            this.routePageClass = "prepare_route_page_backward"
        } else if (val === 'no') {
            this.routePageClass = "no_transition"
        }
    }

    @action
    goToPrePage() {
        const nowPage = this.page
        const pageList = [
            'cancer',
            'info',
            'featureAndReport'
        ]
        const index = pageList.indexOf(nowPage)
        if (index !== 0) {
            this.page = pageList[index - 1]
        }
    }

    @action
    cancerPageCheck() {
        this.confirmButton = false
    }

    @action
    fetchSurvival() {
        this.load = true
        const pr = infoData.pr
        const age = infoData.age
        const stage = infoData.stage
        const grade = infoData.grade

        const uri=`https://prepare.kfsyscc.org/api/python/prepare-breast_model1/${age},${stage},${grade},${pr}`
        fetch(uri, {
            credentials:'include'
        })
        .then(res=>res.json())
        .then(backdata=>{
            this.fetchData = backdata
            this.setSurvivalData()
            this.load = false
        })
    }

    @action
    setSurvivalData() {
        const ct = dataStore.actionFeature.ct
        const rt = dataStore.actionFeature.rt
        const ht = dataStore.actionFeature.ht
        const data = _.filter(this.fetchData, (x)=>x.ct==ct&&x.rt==rt&&x.ht==ht)
        this.survivalData = data[0].survival
    }
}

var dataStore = new DataStore()

export default dataStore
