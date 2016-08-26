import { Component } from 'react';
import styles from './authentication.import.scss';
import { Motion, spring, presets } from 'react-motion';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'ui/IconButton';
import Colors from 'ui/Colors';

export default class Layout extends Component {
    render() {
        return  (
            <div className={styles["layout-container"]}>
                <AppBar zDepth={0} iconElementLeft={<IconButton icon="arrow-left" color="#FFF" href="/" />} iconElementRight={this.props.topButton} />
                <div className={styles["authentication-layout-container"]}>
                    <Motion defaultStyle={{translateY: 200, opacity: 0}} style={{translateY: spring(0, presets.stiff), opacity: spring(1, presets.stiff)}}>
                        {interpolatedStyle => {
                            return (
                                <div className={styles["animation-container"]} style={{backgroundColor: Colors.primaryColor, transform: "translate(0, " + interpolatedStyle.translateY + "px)", opacity: interpolatedStyle.opacity}}>

                                    {this.props.children}

                                    <div style={{textAlign: 'center', marginTop: 8}}>
                                        {this.props.bottomButton}
                                    </div>
                                </div>
                            )
                        }}
                    </Motion>
                </div>
            </div>
        )
    }
}