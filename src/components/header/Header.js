import React, { Component } from 'react';
// import title from './title.png';
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
        coinsOwned: 0,
        coinsPending: 0,
        privateKey: '',
        publicKey: '',
        chainStatus: 'Buy Buy Buy!!!',
        chainReady: true,
        exchangeRate: 1,
        sellers: [],
        topSellers: [],
        selectedSeller: '',
        selectedSellerBalance: 0,
        purchaseAmount: '',
        buyButtonClass: 'buy',
        cancelButtonClass: 'cancel',
        walletID: 0,
        burgerMenuViewable: false,
    }

    componentDidMount() {
        fetch('/keys')
            .then(response => response.json())
            .then(function (data) {
                this.setState({
                    walletID: data.id,
                    publicKey: data.publicKey,
                    privateKey: data.privateKey
                })
            }.bind(this));
        this.getSellerInfo();
        this.startQueryingBlockchain()
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

    startQueryingBlockchain = () => {
        setInterval(this.getSellerInfo, 5000);
        setInterval(this.getUserBalance, 5000)
    }

    getSellerInfo = () => {
        console.log("HELLO")
        fetch('/wallets')
        .then(response => response.json())
        .then(function (wallets) {
            const sortedWallets = wallets.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
            const topSellers = sortedWallets;
            this.setState({
                sellers: topSellers
            })
        }.bind(this));
    }

    getUserBalance = () => {
        const user = {
            public_key: this.state.publicKey
        }
        fetch('balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(function(data) {
            const difference = data.balance - this.state.coinsOwned;
            const coinsPending = this.state.coinsPending - difference 
            this.setState({
                coinsOwned: data.balance,
                coinsPending: coinsPending
            })
        }.bind(this))
        .catch(error => console.log(error))
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

    selectPurchaseAmount = (e) => {
        const purchaseAmount = e.target.value > 0 ? parseFloat(e.target.value) : '';
        this.setState({
            purchaseAmount: purchaseAmount
        })
    }

    makePurchase = () => {
        if( this.state.selectedSeller !== '' && 
            this.state.purchaseAmount > 0 && 
            this.state.balance * this.state.exchangeRate < this.state.selectedSellerBalance &&
            this.state.balance * this.state.exchangeRate < this.state.selectedSellerBalance &&
            this.state.balance > 0) {
            const transaction = { 
                id: this.state.walletID,
                seller: this.state.selectedSeller,
                buyer: this.state.publicKey,
                amount: this.state.purchaseAmount
            };
            console.log(transaction)

            fetch('/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction)
            })
            .then(response => response.json())
            .then(function(data) {
                const coinsPending = this.state.coinsPending + this.state.purchaseAmount;
                this.setState({
                    coinsPending: coinsPending
                })
                this.cancelPurchase();
            }.bind(this))
            .catch(error => console.log(error))
        }
    }

 

    cancelPurchase = () => {
        this.setState({
            purchaseAmount: '',
            selectedSeller: '',
            selectedSellerBalance: 0
        })
    }

    showBurgerMenu = () => {
        const menu = document.getElementById('burgerLinks');
        menu.style.width = '250px';
    }

    hideBurgerMenu = () => {
        const menu = document.getElementById('burgerLinks');
        menu.style.width = '0';
    }
   

    render() {
        return <div className="headerDiv">
            <Router>
                <div className="routerDiv">
                    <div className="navHeader">
                        <div className="titleDiv"></div>
                        <div className="burgerMenu" onClick={() => this.showBurgerMenu()}>
                            <div className="burger"></div>
                            <div className="burger"></div>
                            <div className="burger"></div>
                        </div>
                        <nav className="navLinks">
                            <ul className='links'>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/presale">Presale</Link>
                                </li>
                                <li>
                                    <Link to="/blockchain">Blockchain</Link>
                                </li>
                            </ul>
                        </nav>
                        
                    </div>

                    <div className="borderDiv"></div>
                    <nav id="burgerLinks" className="burgerLinks">
                        <div className="closeBurgerMenu" onClick={() => this.hideBurgerMenu()}>&times;</div>
                        <ul className='burgerLinksList'>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/presale">Presale</Link>
                            </li>
                            <li>
                                <Link to="/blockchain">Blockchain</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/presale">
                            <div>
                                <Presale
                                    yourWallet={this.state.publicKey}
                                    balance={this.state.balance}
                                    coinsOwned={this.state.coinsOwned}
                                    coinsPending={this.state.coinsPending}
                                    chainStatus={this.state.chainStatus}
                                    exchangeRate={this.state.exchangeRate}

                                    sellers={this.state.sellers}
                                    selectSeller={this.selectSeller}
                                    selectedSeller={this.state.selectedSeller}

                                    purchaseAmount={this.state.purchaseAmount}
                                    selectPurchaseAmount={this.selectPurchaseAmount}

                                    buyButtonClass={this.state.buyButtonClass}
                                    makePurchase={this.makePurchase}

                                    cancelButtonClass={this.state.cancelButtonClass}
                                    cancelPurchase={this.cancelPurchase}

                                />
                            </div>
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