import React, { Component } from 'react';
import title from './title.png';
import Home from '../home/Home';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class Header extends Component {
    render() {
        const borderStyle = {
            borderBottom: "#994fd3 solid 2px",
            // float: 'left'
        }
        const textStyle = {
            fontFamily: 'riffic-bold'
        }
        return <div>
            <Router>
                <div>
                    <div className="navHeader">
                        <img src={title} alt='Title'></img>
                        <nav className="item" >
                            <ul className='links' style={textStyle}>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div style={borderStyle}></div>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/users">
                            <Users />
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

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}