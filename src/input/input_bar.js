import React, { Component } from 'react';

class InputBar extends Component {
    constructor() {
        super();

        this.state = { quantity: 1};
    }

    quantityChange(e){
        this.setState({ quantity: e.target.value });
    }

    quantitySubmit(e){
        e.preventDefault();
        this.props.setQuantity(this.state.quantity);
    }

    render() {
        return(
            <div>
                {this.props.chosenCurrency}
                <form onSubmit={this.quantitySubmit.bind(this)}>
                    <input type="text" onChange ={this.quantityChange.bind(this)} value={this.state.quantity}></input>
                    {/* <input type="submit" onSubmit={this.quantitySubmit.bind(this)}></input> */}
                </form>
            </div>
        );
    }
}

export default InputBar;
