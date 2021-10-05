import React, { Component } from 'react';
import Block from '../block/Block';
import Transaction from '../transaction/Transaction';

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

    createDetailTables = () => {
        if(this.state.row.transactions.length > 0) {
            return <>
                <div className="detailsContainer">
                    <table className="detailsTable">
                        <thead>
                            <tr>
                                <th>Proof</th>
                                <th>Previous Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.row.proof}</td>
                                <td>{this.state.row.previous_hash}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <table className="transactionsTable">
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Recipient</th>
                                <th>Sender</th>
                                <th>Signature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.row.transactions.map((data, key) => {
                                return (
                                    <tr key={key} className="tableRow">
                                        <Transaction transaction={data} />
                                    </tr>
                                );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        } else {
            return <></>
        }
    }



    render() {
        const detailTables = this.createDetailTables()
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