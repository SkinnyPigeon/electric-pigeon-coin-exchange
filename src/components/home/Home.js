import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        const textStyle = {
            fontFamily: 'riffic-bold',
            textAlign: 'center'
        }
        return (
            <div style={textStyle}>
                <h1>Welcome to Electric Pigeon Coin</h1>
                <p>The home of the internet's newest, hottest meme coin 💩💩💩💩</p>
                <p>You already have an account and £1000 has been deposited ready to trade 💰💰</p>
                <p>Trading is due to start soon so get ready to buy, buy, buy!!! 🤑</p>
                <p>When you're ready head over to <Link to="/presale">PRESALE</Link> and let's <b>take this to the moon 🚀🚀🚀</b></p>
            </div>
        )
    }
}
