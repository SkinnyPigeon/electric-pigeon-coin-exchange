import React, { Component } from 'react';
import Button from '../button/Button';

export default class BasicDisplay extends Component {
    render() {
        console.log(this.props.exchangeRate)
        const coinAmount = parseFloat(this.props.purchaseAmount) / parseFloat(this.props.exchangeRate);
        console.log(coinAmount)
        const coinDisplay = Number.isNaN(coinAmount) ? "0.00" : coinAmount.toFixed(2);
        return (
            <div className="buyDiv">
            <div className="buyCoinDiv">
                <p>Spend how much? </p>
                <input 
                    type="number" 
                    placeholder='0.00'
                    onChange={this.props.selectPurchaseAmount}
                    value={this.props.purchaseAmount}
                >
                </input>
                <p>Coins: {coinDisplay}</p>
            </div>
            <div className="buySellerDiv">
                <p>Seller: </p>
                <p>{this.props.selectedSeller.substring(60, 75)}</p>
            </div>
            <div className="buyButtonDiv">
                <div id="buyButton">
                    <Button 
                        buttonText="Buy!"
                        class={this.props.buyButtonClass}
                        action={this.props.makePurchase}
                    />
                </div>
                <div id="cancelBuyDiv">
                    <Button 
                        buttonText="Cancel"
                        class={this.props.cancelButtonClass}
                        action={this.props.cancelPurchase}
                    />
                </div>
                <div id="likeDiv">
                </div>
                <div id="likeTheCoinDiv">
                    <Button 
                        id="likeTheCoinButton"
                        buttonText="👍"
                        class={this.props.likeTheCoinClass}
                        action={this.props.likeTheCoin}
                    />
                </div>
            </div>
        </div>
        )
    }
}