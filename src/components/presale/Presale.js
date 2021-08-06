import React, { Component } from "react";
import Balance from '../balance/Balance';
import Sellers from '../sellers/Sellers';
// import Button from '../button/Button';

export default class Presale extends Component {
    
    render() {
        return (
            <div className="presaleDiv">
                <Balance 
                    balance={this.props.balance} 
                    coins={this.props.coins} 
                    chainStatus={this.props.chainStatus}
                    exchangeRate={this.props.exchangeRate}
                />
                <Sellers
                    sellers={this.props.sellers}
                />
                {/* <Button 
                    buttonDisabled={this.props.buttonDisabled} 
                    class={this.props.class} 
                    action={this.props.increaseBalance} 
                    buttonText={"Click ME"}
                /> */}
            </div>
        )
    }
}