import React, { Component } from 'react';

export default class Balance extends Component {
    render() {
        return (
            <div className="balanceContainer">
                <p className="balanceText">Balance: £{this.props.balance}</p>
                <p className="balanceText">Coins: {this.props.coins}</p>
            </div>
        )
    }
}