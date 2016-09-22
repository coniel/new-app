import { Component } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import request from 'superagent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../../theme';
import style from './app.import.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loader from 'ui/Loader';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value       = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            translations: null
        };
    }

    componentWillMount() {
        request.get('/i18n/en-US.json', (err, res) => {
            this.setState({
                translations: flattenMessages(res.body)
            });
        });
    }

    render() {
        if (this.state.translations) {
            console.log(this.state.translations);
            return  (
                <IntlProvider locale="en" messages={this.state.translations}>
                    <MuiThemeProvider muiTheme={theme}>
                        {this.props.children}
                    </MuiThemeProvider>
                </IntlProvider>
            )
        } else {
            return  (
                <MuiThemeProvider muiTheme={theme}>
                    <Loader />
                </MuiThemeProvider>
            )
        }
    }
}