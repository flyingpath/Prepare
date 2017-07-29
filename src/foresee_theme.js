import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as _colors from './custom_theme_color';
import * as _colorManipulator from 'material-ui/utils/colorManipulator'

const muiTheme = getMuiTheme({
   fontFamily: 'Roboto, sans-serif',
   palette: {
      primary1Color: _colors.prepare100,
      primary2Color: _colors.cyan700,
      primary3Color: _colors.grey400,
      accent1Color: _colors.purple400,
      accent2Color: _colors.grey100,
      accent3Color: _colors.grey500,
      textColor: _colors.darkBlack,
      alternateTextColor: _colors.white,
      canvasColor: _colors.grey50,
      borderColor: _colors.grey300,
      disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
      pickerHeaderColor: _colors.cyan500,
      clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
      shadowColor: _colors.fullBlack
   }
});

export default muiTheme;