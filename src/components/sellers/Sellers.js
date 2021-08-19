import React, { Component } from 'react';

export default class Sellers extends Component {

    state = {
        sellers: [],
        display: ''
    }

    componentDidMount() {
        const display = this.generateSellerDisplay(this.props.sellers);
        this.setState({
            display: display,
        })
    }

    componentDidUpdate(prevProps) {
        let oldSellers = []
        let newSellers = []
        prevProps.sellers.forEach(seller => {
            console.log(this.sortSellerKeys(seller))
            oldSellers.push(this.sortSellerKeys(seller))
        });
        this.props.sellers.forEach(seller => {
            newSellers.push(this.sortSellerKeys(seller))
        });
        if (JSON.stringify(oldSellers) !== JSON.stringify(newSellers)) {
            const display = this.generateSellerDisplay(this.props.sellers)
            this.setState({
                sellers: this.props.sellers,
                display: display,
            })
        }
    }

    generateSellerDisplay = (sellers) => {
        const display = <div className="sellerDiv">
            {sellers.map((seller, index) => {
                return <div key={index} className="sellingDiv" onClick={this.props.selectSeller}>
                    <p id={seller.account}>Seller: {seller.account.substring(60,75)}</p>
                    <p id={seller.balance}>Selling: {seller.balance.toFixed(2)}</p>
                </div>
            })}
        </div>
        return display;
    }

    sortSellerKeys = (seller) => {
        return Object.keys(seller).sort().reduce(
            (sortedSeller, key) => {
                sortedSeller[key] = seller[key];
                return sortedSeller;
            },
            {}
        );
    }

    render() {
        const display = this.state.display === '' ? null : this.state.display;
        return (
            <div className="sellersDiv">
                {display}
            </div>
        )
    }
}