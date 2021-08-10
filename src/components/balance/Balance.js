import React, { Component } from 'react';

export default class Balance extends Component {
    render() {
        return (
            <div className="balanceContainer">
                <p className="balanceText">Balance: £{this.props.balance.toFixed(2)}</p>
                <p className="balanceText">Coins Owned: {this.props.coinsOwned}</p>
                <p className="balanceText">Coins Pending: {this.props.coinsPending}</p>
                <p className="balanceText">Exchange Rate: {this.props.exchangeRate}</p>
                <p className="balanceText">Chain Status: {this.props.chainStatus}</p>
            </div>
        )
    }
}