import React, { Component } from 'react';

export default class Transaction extends Component {
    render() {
        const isMining = this.props.transaction.sender === 'MINING';
        const sender = isMining ? 'MINING' : this.props.transaction.sender.substring(60, 75);
        const signature = isMining ? 'None': this.props.transaction.signature.substring(0, 15);
        return (
            <>
                <td>{this.props.transaction.amount.toFixed(2)}</td>
                <td>{this.props.transaction.recipient.substring(60,75)}</td>
                <td>{sender}</td>
                <td>{signature}</td>
            </>
        )
    }
}