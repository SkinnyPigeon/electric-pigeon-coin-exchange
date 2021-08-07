import React, { Component } from 'react';

export default class Buy extends Component {
    render () {
        return (
            <div className="buyDiv">
                <div className="buyCoinDiv">
                    <p>How many coins? </p>
                    <input type="float" placeholder="0.00"></input>
                </div>
                <div className="buySellerDiv">
                    <p>Seller: </p>
                    <p>{this.props.selectedSeller.substring(60, 75)}</p>
                </div>
            </div>
        )
    }
}