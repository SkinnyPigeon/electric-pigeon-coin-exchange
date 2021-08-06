import React, { Component } from 'react';
import title from './title.png';
import Home from '../home/Home';
import Presale from '../presale/Presale';
import Blockchain from '../blockchain/Blockchain';

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
        chainStatus: 'Not Yet Active',
        buttonClass: 'active',
        buttonDisabled: false,
    }   

    increaseBalance = () => {
        const balance = this.state.balance + 5;
        this.setState({
            balance: balance,
            // buttonClass: 'deactive',
            // buttonDisabled: true,
        })
    }

    render() {
        const textStyle = {
            fontFamily: 'riffic-bold'
        }
        return <div className="headerDiv">
            <Router>
                <div className="routerDiv">
                    <div className="navHeader">
                        <img src={title} alt='Title'></img>
                        <nav className="item" >
                            <ul className='links' style={textStyle}>
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
                            <Presale buttonDisabled={this.state.buttonDisabled} class={this.state.buttonClass} increaseBalance={this.increaseBalance} balance={this.state.balance} coins={this.state.coins} chainStatus={this.state.chainStatus} />
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

// function Shh() {
//     console.log("INSIDE THE SECRET")
//     return <h2>Secret</h2>;
// }