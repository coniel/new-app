import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.import';

const AddFABOnboarding = React.createClass({
    render: function () {
        return (
            <div styleName="container">
                <p styleName="paragraph">{this.props.text}</p>

                <img src="/icons/arrow.svg" styleName="arrow" />
            </div>
        )
    }
});

export default CSSModules(AddFABOnboarding, styles);