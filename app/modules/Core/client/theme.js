import {deepPurple500, deepPurple700, deepPurple400, lightBlue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme({
    palette: {
        primary1Color: deepPurple500,
        primary2Color: deepPurple700,
        primary3Color: deepPurple400,
        accent1Color: lightBlue500
    }
});

export default theme;