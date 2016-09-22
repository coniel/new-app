import { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class ButtonLoader extends Component {
    render() {
        return (
            <CircularProgress size={0.5} style={{margin: '0 auto 0 auto', padding: "8px 0 8px 0", display: 'block'}} />
        )
    }
}