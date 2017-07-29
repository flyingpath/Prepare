import React from 'react'
import {observer} from 'mobx-react'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import footerNavigation from './store/footer_navigation'

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

const setIndex = (val) => {
    footerNavigation.setIndex(val)
}

const FooterNavigation = () =>{
    return (
       <Paper zDepth={1} style={{position:'absolute',bottom:'0px',zIndex:'999',width:'100%'}} >
          <BottomNavigation selectedIndex={footerNavigation.selectedIndex}>
             <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
                onTouchTap={() => {setIndex(0)}}
             />
             <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onTouchTap={() => {setIndex(1)}}
             />
             <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onTouchTap={() => {setIndex(2)}}
             />
          </BottomNavigation>
       </Paper>
    )
}

export default observer(FooterNavigation)