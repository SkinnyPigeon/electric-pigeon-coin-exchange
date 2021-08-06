import React, { Component } from "react";
import Balance from '../balance/Balance';

export default class Presale extends Component {
    state = {
        balance: 1000,
        coins: 0,

    }
    render() {
        return (
            <div className="presaleDiv">
                <Balance balance={this.state.balance} coins={this.state.coins}/>
            </div>
        )
    }
}