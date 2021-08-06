import React, { Component } from 'react';

export default class Blockchain extends Component {
    state = {
        display: '',
        loading: true,
        blockchain: []

    }

    componentDidMount() {
        fetch('http://localhost:5000/chain')
        .then(response => response.json())
        .then(data => console.log(data));
    }

    render() {
        return (
            <div className="blockchainDiv">

            </div>
        )
    }
}