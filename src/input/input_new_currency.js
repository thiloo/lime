import React, { Component } from 'react';

class InputNewCurrency extends Component {
    constructor(){
        super();

        this.state = {currency: ''};
    }

    handleChange(e){
        this.setState({ currency:e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.addCurrency(this.state.currency.toUpperCase());
        this.setState({currency: ''});
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input placeholder="add new currency" onChange={this.handleChange.bind(this)} value={this.state.currency}></input>
            </form>
        );
    }
}

export default InputNewCurrency;