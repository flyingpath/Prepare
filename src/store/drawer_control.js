import {observable} from 'mobx'
import {action} from 'mobx'
import _ from 'lodash'

var drawerControl = observable({
   drawerToggle: false,
})

const loaddata = () => {

}

_.assign(drawerControl, {
   load: action(function () {
      loaddata()
   }),
   handleToggle: action(function (val) {
      drawerControl.drawerToggle = !val
   })
})

export default drawerControl