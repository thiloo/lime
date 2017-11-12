import React, { Component } from 'react';
import './currency.css';

class Currency extends Component {
    calculate() {
        if(this.props.price === undefined) return <p></p>;

        return <p>{this.props.price * this.props.quantity}</p>;
    }

    changeCurrency(e){
        this.props.changeCurrency(e.target.innerHTML);
    }

    removeCurrency(e){
        console.log(e.target.id);
        this.props.removeCurrency(e.target.id);
    }

    render() {
        return(
            <div>
                <div className="flex">
                    <div className="red spacing pointer" onClick={this.removeCurrency.bind(this)}>
                        <b id={this.props.currency}>--</b>
                    </div>
                    <div className="spacing pointer">
                        <h2 onClick={this.changeCurrency.bind(this)}>{this.props.currency}</h2>
                    </div>
                    <div className="spacing">
                        {this.calculate()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Currency;
