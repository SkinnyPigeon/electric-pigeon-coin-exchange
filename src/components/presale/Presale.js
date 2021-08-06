import React, { Component } from "react";
import Balance from '../balance/Balance';

export default class Presale extends Component {
    
    render() {
        return (
            <div className="presaleDiv">
                <Balance balance={this.props.balance} coins={this.props.coins} chainStatus={this.props.chainStatus}/>
                <button onClick={this.props.increaseBalance}>Click ME</button>
            </div>
        )
    }
}