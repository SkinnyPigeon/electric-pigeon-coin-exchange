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
        console.log(this.state)
        prevProps.sellers.forEach(seller => {
            oldSellers.push(this.sortSellerKeys(seller))
        });
        this.props.sellers.forEach(seller => {
            newSellers.push(this.sortSellerKeys(seller))
        });
        if (JSON.stringify(oldSellers) !== JSON.stringify(newSellers)) {
            const display = this.generateSellerDisplay(this.props.sellers)
            console.log("UPDATING THE SELLERS")
            this.setState({
                sellers: this.props.sellers,
                display: display,
            })
        }
    }

    generateSellerDisplay = (sellers) => {
        const display = <div className="sellerDiv">
            {sellers.map((seller, index) => {
                return <div key={index} className="sellingDiv">
                    <p>Seller: {seller.account.substring(0,15)}</p>
                    <p>Selling: {seller.balance.toFixed(2)}</p>
                </div>
            })}
        </div>
        console.log(display)
        return display;
    }

    sortSellerKeys = (seller) => {
        Object.keys(seller).sort().reduce(
            (obj, key) => {
                obj[key] = seller[key];
                return obj;
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