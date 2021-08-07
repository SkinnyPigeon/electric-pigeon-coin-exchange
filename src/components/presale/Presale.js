import React, { Component } from "react";
import Balance from '../balance/Balance';
import Sellers from '../sellers/Sellers';
import Buy from '../buy/Buy';
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
                    selectSeller={this.props.selectSeller}
                />
                <Buy 
                    selectedSeller={this.props.selectedSeller}
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