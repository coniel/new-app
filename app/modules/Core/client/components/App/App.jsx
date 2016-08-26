import { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../../theme';
import style from './app.import.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
    render() {
        return  (
            <MuiThemeProvider muiTheme={theme}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}