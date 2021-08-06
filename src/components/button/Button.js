import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        return (
            <button disabled={this.props.buttonDisabled} className={this.props.class} onClick={this.props.action}>{this.props.buttonText}</button>
        )
    }
}