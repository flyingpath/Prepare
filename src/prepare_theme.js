import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as _colors from 'material-ui/styles/colors';
import * as _colorManipulator from 'material-ui/utils/colorManipulator'

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: _colors.pink900,
        primary2Color: _colors.tealA700,
        primary3Color: _colors.lime800,
        accent1Color: _colors.orange500,
        accent2Color: _colors.pink900,
        accent3Color: _colors.indigo900,
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