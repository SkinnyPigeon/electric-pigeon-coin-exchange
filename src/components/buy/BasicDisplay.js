import React, { Component } from 'react';
import Button from '../button/Button';

export default class BasicDisplay extends Component {
    render() {
        return (
            <div className="buyDiv">
            <div className="buyCoinDiv">
                <p>How many coins? </p>
                <input 
                    type="number" 
                    placeholder='0.00'
                    onChange={this.props.selectPurchaseAmount}
                    value={this.props.purchaseAmount}
                >
                </input>
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