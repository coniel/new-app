import { Component } from 'react';
import RaisedButton from 'ui/RaisedButton';
import App from 'modules/Core/client/components/App';
import style from './home.import.scss';

export default class Home extends Component {
    render() {
        return  (
            <div className={style.container}>
                <h1 className={style.title}>Public home page</h1>
            </div>
        )
    }
}