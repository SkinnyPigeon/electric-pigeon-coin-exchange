import React, { Component } from 'react';
// import Transactions from '../transactions/Transactions';

export default class Block extends Component {
    render() {
        const row = this.props.row;
        const date = new Date(row.timestamp * 1000)
        const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        return (
            <>
                <td>{`${row.index}`}</td>
                <td>{`${dateString}`}</td>
                <td>{`${row.transactions.length}`}</td>
            </>
        )
    }
}