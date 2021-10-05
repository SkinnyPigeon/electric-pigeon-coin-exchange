import React, { Component } from 'react';
import Home from '../home/Home';
import Presale from '../presale/Presale';
import Blockchain from '../blockchain/Blockchain';
import Stolen from '../stolen/Stolen';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const urlPrefix = "http://localhost:5000"
// const urlPrefix = "https://13.80.254.215"

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
        likeTheCoinClass: 'like',
        walletID: 0,
        burgerMenuViewable: false,
        likeCount: 0,
        likeTheCoinDifference: 0,
        intervals: [],
        elonUpCount: 0,
        elonUpFirst: true,
        elonDownCount: 0,
        elonDownFirst: true,
        elonActionClass: 'elon',
        stolen: false,
    }

    componentDidMount() {
        fetch(urlPrefix + '/wallet_and_keys/keys')
            .then(response => response.json())
            .then(function (data) {
                this.setState({
                    walletID: data.id,
                    publicKey: data.publicKey,
                    privateKey: data.privateKey
                })
            }.bind(this));
        this.getSellerInfo();
        this.checkStolen();
        this.getElonCounts();
        this.startQueryingBlockchain();
    }

    componentWillUnmount() {
        this.state.intervals.forEach(interval => {
            clearInterval(interval)
        })
    }

    startQueryingBlockchain = () => {
        // const sellerInfoIntervalID = setInterval(this.getSellerInfo, 5000);
        // const userBalanceIntervalID = setInterval(this.getUserBalance, 5000);
        const likeCountIntervalID = setInterval(this.getLikeCount, 5000);
        const elonReactionCountIntervalID = setInterval(this.getElonCounts, 5000);
        const valueIntervalID = setInterval(this.getCoinValue, 1000);
        // const stolenIntervalID = setInterval(this.checkStolen, 5000);
        const intervals = [
            // sellerInfoIntervalID, 
            // userBalanceIntervalID, 
            likeCountIntervalID,
            valueIntervalID,
            elonReactionCountIntervalID,
            // stolenIntervalID
        ]
        this.setState({
            intervals: intervals
        });
    }

    likeTheCoin = () => {
        fetch(urlPrefix + '/stats/add_like')
            .then(response => response.json())
            .then(data => console.log(data))
    }

    getLikeCount = () => {
        const like = {
            'table': 'likes'
        }
        fetch(urlPrefix + '/stats/get_counts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(like)
        })
            .then(response => response.json())
            .then(function (data) {
                const likeCount = this.state.likeCount;
                if (likeCount > 0) {
                    const newLikeCount = data['message'];
                    if (Number.isInteger(newLikeCount)) {
                        if (newLikeCount > likeCount) {
                            console.log('UPDATING THE LIKE COUNT')
                            const difference = newLikeCount - likeCount;
                            this.setState({
                                likeCount: newLikeCount,
                                likeTheCoinDifference: difference
                            })
                        }
                    }
                } else {
                    if (Number.isInteger(data['message'])) {
                        console.log('SETTING LIKE COUNT FOR THE FIRST TIME')
                        this.setState({
                            likeCount: data['message']
                        });
                    }
                }
            }.bind(this));
    }

    checkStolen = () => {
        fetch(urlPrefix + '/steal/check_status')
            .then(response => response.json())
            .then(function (data) {
                if (data['message'] !== this.state.stolen) {
                    this.setState({
                        stolen: data['message']
                    })
                }
            }.bind(this))
    }

    getElonCounts = () => {
        fetch(urlPrefix + '/elon/get_elon_counts')
            .then(response => response.json())
            .then(function (data) {
                const elonUpCount = this.state.elonUpCount;
                const elonDownCount = this.state.elonDownCount;
                if (Number.isInteger(data['elon_up'])) {
                    if (data['elon_up'] > elonUpCount) {
                        console.log(data);
                        this.setState({
                            elonUpCount: data['elon_up'],
                            elonUpFirst: false
                        })
                    }
                }
                if (Number.isInteger(data['elon_down'])) {
                    if (data['elon_down'] > elonDownCount) {
                        this.setState({
                            elonDownCount: data['elon_down'],
                            elonDownFirst: false
                        })
                    }
                }
            }.bind(this));
    }

    getSellerInfo = () => {
        fetch(urlPrefix + '/wallet_and_keys/wallets')
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
        fetch(urlPrefix + '/wallet_and_keys/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(function (data) {
                console.log(data)
                const difference = data.balance - this.state.coinsOwned;
                let coinsPending = this.state.coinsPending - difference;
                coinsPending = coinsPending < 0 ? 0 : coinsPending;
                this.setState({
                    coinsOwned: data.balance,
                    coinsPending: coinsPending
                })
            }.bind(this))
            .catch(error => console.log(error))
    }

    getCoinValue = () => {
        fetch(urlPrefix + '/stats/get_value')
            .then(response => response.json())
            .then(function (data) {
                const value = data['message'];
                if (Number(value) && value !== this.state.exchangeRate) {
                    this.setState({
                        exchangeRate: value
                    })
                }
            }.bind(this))
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
        if (this.state.selectedSeller !== '' &&
            this.state.purchaseAmount > 0 &&
            this.state.balance * this.state.exchangeRate < this.state.selectedSellerBalance &&
            this.state.balance >= this.state.purchaseAmount &&
            this.state.balance > 0) {
            const transaction = {
                id: this.state.walletID,
                seller: this.state.selectedSeller,
                buyer: this.state.publicKey,
                amount: this.state.purchaseAmount / this.state.exchangeRate
            };
            console.log(transaction)
            fetch(urlPrefix + '/transactions/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction)
            })
                .then(response => response.json())
                .then(function () {
                    const coinsPending = this.state.coinsPending + this.state.purchaseAmount / this.state.exchangeRate;
                    const newBalance = this.state.balance - this.state.purchaseAmount;
                    this.setState({
                        coinsPending: coinsPending,
                        balance: newBalance
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
        const mainDisplay = <div className="headerDiv">
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

                                    likeTheCoinClass={this.state.likeTheCoinClass}
                                    likeTheCoin={this.likeTheCoin}
                                    likeTheCoinDifference={this.state.likeTheCoinDifference}

                                    elonActionClass={this.state.elonActionClass}
                                    elonUpCount={this.state.elonUpCount}
                                    elonUpFirst={this.state.elonUpFirst}
                                    elonDownCount={this.state.elonDownCount}
                                    elonDownFirst={this.state.elonDownFirst}
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
        let toDisplay = this.state.stolen ? <Stolen /> : mainDisplay
        return <div>{toDisplay}</div>
    }
}