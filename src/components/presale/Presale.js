import React, { Component } from "react";
import Balance from '../balance/Balance';
import Sellers from '../sellers/Sellers';
import Buy from '../buy/Buy';
// import Button from '../button/Button';

export default class Presale extends Component {
    
    render() {
        return (
            <div className="presaleDiv">
                <div className="sellersAndBalance">
                    <div>
                        <h3 className="sellersAndBalanceText">Top Sellers</h3>
                        <Sellers
                            sellers={this.props.sellers}
                            selectSeller={this.props.selectSeller}
                        />
                    </div>
                    <div>
                        <h3 className="sellersAndBalanceText">Your Wallet</h3>
                        <Balance 
                            balance={this.props.balance} 
                            coins={this.props.coins} 
                            chainStatus={this.props.chainStatus}
                            exchangeRate={this.props.exchangeRate}
                        />
                    </div>
                    
                </div>
                
                
                <Buy 
                    selectedSeller={this.props.selectedSeller}

                    purchaseAmount={this.props.purchaseAmount}
                    selectPurchaseAmount={this.props.selectPurchaseAmount}

                    buyButtonClass={this.props.buyButtonClass}
                    makePurchase={this.props.makePurchase}
                    
                    cancelButtonClass={this.props.cancelButtonClass}
                    cancelPurchase={this.props.cancelPurchase}

                />
            </div>
        )
    }
}