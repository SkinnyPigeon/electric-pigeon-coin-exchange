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
        .then(function(data) {
            this.setState({
                blockchain: data
            })
        }.bind(this));
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        return (
            <div className="blockchainDiv">

            </div>
        )
    }
}