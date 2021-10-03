import React, { Component } from 'react';

export default class Balance extends Component {
    render() {
        return (
            <div className="balanceContainer">
                <p className="balanceText">Your Wallet: {this.props.yourWallet.substring(60,75)}</p>
                <p className="balanceText">Balance: £{this.props.balance.toFixed(2)}</p>
                <p className="balanceText">Coins Owned: {this.props.coinsOwned.toFixed(2)}</p>
                <p className="balanceText">Coins Pending: {this.props.coinsPending.toFixed(2)}</p>
                <p className="balanceText">Exchange Rate: {this.props.exchangeRate.toFixed(2)}</p>
                <p className="balanceText">Value of coins: £{(this.props.exchangeRate * this.props.coinsOwned).toFixed(2)}</p>
            </div>
        )
    }
}