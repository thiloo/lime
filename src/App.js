import React, { Component } from 'react';
import './App.css';
import InputBar from './input/input_bar';
import Currency from './currencies/currency';
import InputNewCurrency from './input/input_new_currency';
import axios from 'axios';


class App extends Component {
    constructor() {
        super();

        this.state = {
            chosenCurrency: this.getLocalStorageCurrency(),
            list: this.getLocalStorageList(),
            prices: {},
            quantity: 1
        };

        this.getPrices();        
    }

    getPrices() {
        const URL = `https://min-api.cryptocompare.com/data/price?fsym=${this.state.chosenCurrency}&tsyms=${this.state.list.toString()}`;
        axios.get(URL).then(res => {this.setState({ prices: res.data }); console.log(res.data)});
        
    }

    componentDidUpdate(props, state){
        if(state.chosenCurrency !== this.state.chosenCurrency){
            this.getPrices();
            this.setLocalStorageCurrency();
            this.setLocalStorageList();
        }
    }

    setQuantity(quantity) {
        this.setState({ quantity });
    }

    changeChosenCurrency(currency) {

        let newList = this.state.list;
        newList.push(this.state.chosenCurrency);
        newList.splice(newList.indexOf(currency), 1);

        this.setState({ list: newList, chosenCurrency: currency });

    }

    addCurrency(currency) {
        let list = this.state.list;
        list.push(currency);

        this.setState({ list });
        this.getPrices();

        this.setLocalStorageList();
    }

    removeCurrency(currency) {
        let list = this.state.list;

        list.splice(list.indexOf(currency), 1);
        this.setState({list});
        this.setLocalStorageList();
    }

    setLocalStorageList() {
        localStorage.list = JSON.stringify(this.state.list);
    }

    setLocalStorageCurrency() {
        localStorage.currency = JSON.stringify(this.state.chosenCurrency);
    }

    getLocalStorageList(){
        if(localStorage.list){
            return JSON.parse(localStorage.list);
        } else {
            return ['BTC', 'ETH'];
        }
    }

    getLocalStorageCurrency() {
        if (localStorage.currency) {
            return JSON.parse(localStorage.currency);
        } else {
            return 'USD';
        }
    }

    renderCurrencies() {
        return this.state.list.map(currency => {
            return <Currency
                removeCurrency = {this.removeCurrency.bind(this)}
                changeCurrency = {this.changeChosenCurrency.bind(this)}
                currency = {currency}
                key={ currency }
                quantity = {this.state.quantity}
                price={this.state.prices[currency]} />;
        });
    }

    renderInputBar() {
        return <InputBar
            chosenCurrency={this.state.chosenCurrency}
            setQuantity={this.setQuantity.bind(this)} />;
    }

    renderAddCurrency() {
        return <InputNewCurrency addCurrency={this.addCurrency.bind(this)}/>;
    }

    render() {
        return (
            <div className="App">
                {this.renderInputBar()}
                {this.renderCurrencies()}
                {this.renderAddCurrency()}
            </div>
        );
    }
}

export default App;
