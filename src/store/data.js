import {observable, action} from 'mobx'

class DataStore {

    @observable
        // cancer = { value: 'breast', label: '乳癌' }
    cancer = {}
    @observable
        // feature = 'op'
    feature = ''
    @observable
    page = 'info' // -- cancer, info, featureAndReport
    @observable
    routePageClass = "prepare_route_page_forward"
    @observable
    confirmButton = true

    @action
    changePageTo(page) {
        this.page = page
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
}

var dataStore = new DataStore()

export default dataStore
