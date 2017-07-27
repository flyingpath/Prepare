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
   setIndex: action(function(val) {
      footerNavigation.selectedIndex = val
   })
})

export default footerNavigation