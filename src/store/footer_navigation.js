import {observable} from 'mobx'
import {action} from 'mobx'
import _ from 'lodash'

var footerNavigation = observable({
    selectedIndex: 0,
})

const loaddata = () => {

}

_.assign(footerNavigation, {
    load: action(function () {
        loaddata()
    }),
    setIndex: action(function (val) {
        footerNavigation.selectedIndex = val
    }),
    getDelay: action(function (ms) {
            let d = new Date();
            let d2 = null;
            do {
                d2 = new Date();
            }
            while (d2 - d < ms);
        }
    )
})

export default footerNavigation