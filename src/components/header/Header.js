import React, { Component } from 'react';
import title from './title.png';
import Home from '../home/Home';
import Presale from '../presale/Presale';
import Blockchain from '../blockchain/Blockchain';
// import Sellers from '../sellers/Sellers';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class Header extends Component {

    state = {
        balance: 1000,
        coins: 0,
        privateKey: '',
        publicKey: '',
        chainStatus: 'Buy Buy Buy!!!',
        chainReady: true,
        buttonClass: 'active',
        buttonDisabled: false,
        exchangeRate: 1,
        sellers: [],
        topSellers: [],
        selectedSeller: '',
        selectedSellerBalance: 0.0
    }

    componentDidMount() {
        fetch('http://localhost:5000/keys')
            .then(response => response.json())
            .then(function (data) {
                this.setState({
                    publicKey: data.publicKey,
                    privateKey: data.privateKey
                })
            }.bind(this));
        this.getSellerInfo();
    }

    // componentDidUpdate() {
    //     console.log(this.state)
    // }

    getExchangeRate = () => {
        setInterval(function () {
            const exchangeRate = this.state.exchangeRate + this.getRandomInt(3);
            this.setState({
                exchangeRate: exchangeRate
            })
        }.bind(this), 5000)
    }

    getRandomGrowth = (max) => {
        const growthArray = [true, true, true, true, true, true, true, false, false, false]
        const arrayIndex = Math.floor(Math.random() * 9)
        console.log("Array Index: ", arrayIndex)
        const grow = growthArray[arrayIndex]
        const growthAmount = Math.floor(Math.random() * max) / 10
        const growth = grow ? growthAmount : -growthAmount
        return growth
    }

    startQueryingSellers = () => {
        setInterval(this.getSellerInfo, 5000)
    }

    getSellerInfo = () => {
        fetch('http://localhost:5000/wallets')
        .then(response => response.json())
        .then(function (wallets) {
            const sortedWallets = wallets.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
            const topSellers = sortedWallets.slice(0, 5);
            this.setState({
                sellers: topSellers
            })
        }.bind(this));
    }

    selectSeller = (e) => {
        const seller = e.target.parentNode.children;
        const sellerId = seller[0].id;
        const sellerBalance = seller[1].id;
        this.setState({
            selectedSeller: sellerId,
            selectedSellerBalance: sellerBalance
        })
    }

   


    // increaseBalance = () => {
    //     const balance = this.state.balance + 5;
    //     this.setState({
    //         balance: balance,
            // buttonClass: 'deactive',
            // buttonDisabled: true,
    //     })
    // }

    render() {
        return <div className="headerDiv">
            <Router>
                <div className="routerDiv">
                    <div className="navHeader">
                        <img src={title} alt='Title'></img>
                        <nav className="item">
                            <ul className='links'>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/presale">Presale</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                                <li>
                                    <Link to="/blockchain">Blockchain</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="borderDiv"></div>
                    <Switch>
                        <Route path="/presale">
                            <div>
                                <Presale
                                    buttonDisabled={this.state.buttonDisabled}
                                    class={this.state.buttonClass}
                                    // increaseBalance={this.increaseBalance}
                                    balance={this.state.balance}
                                    coins={this.state.coins}
                                    chainStatus={this.state.chainStatus}
                                    exchangeRate={this.state.exchangeRate}
                                    sellers={this.state.sellers}
                                    selectSeller={this.selectSeller}
                                    selectedSeller={this.state.selectedSeller}
                                />
                            </div>
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/blockchain">
                            <Blockchain />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    }
}


function Users() {
    console.log("INSIDE THE USERS")
    return <h2>Users</h2>;
}