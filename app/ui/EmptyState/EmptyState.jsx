import React from 'react';
import CSSModules from 'react-css-modules';
import SVGIcon from '../SVGIcon';
import styles from './styles.import.scss';

const EmptyState = React.createClass({
    _renderParagraphs() {
        if (this.props.paragraphs) {
            var i = 0;
            return this.props.paragraphs.map((paragraph) => {
                i++;
                return <p styleName="paragraph" key={i} style={{textAlign: (this.props.centerParagraphs? 'center' : 'left')}}>{paragraph}</p>
            });
        }
    },
    render: function () {
        return (
            <div styleName="container">
                <SVGIcon icon={this.props.icon} className={styles["icon"]} />
                <h1 styleName="title">{this.props.title}</h1>
                {this._renderParagraphs()}
                <div styleName="button">{this.props.actions}</div>
                {this.props.fabHint? this.props.fabHint : ''}
            </div>
        )
    }
});

export default CSSModules(EmptyState, styles);