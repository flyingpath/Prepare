import {observable, action, computed, toJS} from 'mobx'
import _ from 'lodash'

import infoData from './infoData'

import { data2 } from './fakeData'

class DataStore {

    @observable
        // cancer = { value: 'breast', label: '乳癌' }
    cancer = {value: 'breast', label: '乳癌'}

    @observable
        // feature = 'op'
    feature = ''

    @observable
    actionFeature = {
        ct: 0,
        rt: 0,
        ht: 0,
        herceptin:0
    }
    @observable
    survivalData = []
    @observable
    fetchData = []


    @observable
    page = 'cancer' // -- cancer, info, featureAndReport
    @observable
    routePageClass = "prepare_route_page_forward"
    @observable
    confirmButton = false

    @observable
    load = false
    @observable
    reportType = 'bar'

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
        obj[key] = val
        this.actionFeature = obj
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
        const age = infoData.age
        const Tstage = infoData.Tstage
        const Nstage = infoData.Nstage
        const grade = infoData.grade
        const pr = infoData.pr
        const er = infoData.er
        const her2 = infoData.her2

        this.fetchData = data2
        this.setSurvivalData()
        this.load = false

        // const uri = `https://prepare.kfsyscc.org/api/python/prepare-breast_model4/${age},${grade},${Tstage},${Nstage},${pr},${er},${her2}`
        // fetch(uri, {
        //     credentials: 'include'
        // })
        //     .then(res => res.json())
        //     .then(backdata => {
        //         console.log('fetchSurvival', backdata)
        //         this.fetchData = backdata
        //         this.setSurvivalData()
        //         this.load = false
        //     })
    }

    @action
    setSurvivalData() {
        const ct = dataStore.actionFeature.ct
        const rt = dataStore.actionFeature.rt
        const ht = dataStore.actionFeature.ht
        const herceptin = dataStore.actionFeature.herceptin
        const data = _.filter(this.fetchData, (x) => x.ct == ct && x.rt == rt && x.ht == ht && x.herceptin==herceptin)
        this.survivalData = data[0].survival
    }
}

var dataStore = new DataStore()

export default dataStore
