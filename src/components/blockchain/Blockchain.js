import React, { Component } from 'react';
import Block from '../block/Block';

const urlPrefix = "http://localhost:5000"
// const urlPrefix = "https://13.80.254.215"

export default class Blockchain extends Component {
    state = {
        display: '',
        loading: true,
        blockchain: [],
        row: {
            index: 0,
            previous_hash: "",
            proof: 0,
            timestamp: 0,
            transactions: []
        }
    }

    componentDidMount() {
        fetch( urlPrefix + '/blockchain/chain')
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

    selectRow = (data) => {
        console.log(data)
        this.setState({
            row: data
        })
        console.log(this.state)
    }



    render() {
        const detailTables = <table className="transactionTable">
            <thead>
                <tr>
                    <th>Proof</th>
                    <th>Previous Hash</th>
                    <th>Transactions</th>
                </tr>
            </thead>
        </table>
        const showTable = this.state.row.transactions.length > 0; 
        const extraTable = showTable ? detailTables : "";
        return (
            <div className="blockchainDiv">
                <table className="blockTable">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Timestamp</th>
                            <th>Transaction Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.blockchain.map((data, key) => {
                            return (
                                <tr key={key} className="tableRow" onClick={() => this.selectRow(data)}>
                                    <Block row={data} />
                                </tr>
                            );
                            })
                        }
                    </tbody>
                </table>
                {extraTable}
            </div>
        )
    }
}