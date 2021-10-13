import React, { Component } from "react";
import Balance from '../balance/Balance';
import Sellers from '../sellers/Sellers';
import Buy from '../buy/Buy';

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
                            yourWallet={this.props.yourWallet}
                            balance={this.props.balance}
                            coinsOwned={this.props.coinsOwned}
                            coinsPending={this.props.coinsPending}
                            chainStatus={this.props.chainStatus}
                            exchangeRate={this.props.exchangeRate}
                        />
                    </div>
                </div>
                <Buy
                    selectedSeller={this.props.selectedSeller}

                    purchaseAmount={this.props.purchaseAmount}
                    selectPurchaseAmount={this.props.selectPurchaseAmount}
                    exchangeRate={this.props.exchangeRate}

                    buyButtonClass={this.props.buyButtonClass}
                    makePurchase={this.props.makePurchase}

                    cancelButtonClass={this.props.cancelButtonClass}
                    cancelPurchase={this.props.cancelPurchase}

                    likeTheCoinClass={this.props.likeTheCoinClass}
                    likeTheCoin={this.props.likeTheCoin}
                    likeTheCoinDifference={this.props.likeTheCoinDifference}

                    elonActionClass={this.props.elonActionClass}
                    elonUpCount={this.props.elonUpCount}
                    elonUpFirst={this.props.elonUpFirst}
                    elonDownCount={this.props.elonDownCount}
                    elonDownFirst={this.props.elonDownFirst}
                />
            </div>
        )
    }
}