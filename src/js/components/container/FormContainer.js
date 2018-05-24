import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import customers from '../../../customers.json';

class FormContainer extends Component {
    constructor() {
        super();

        this.state = {
            list: customers,
            customer_title: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        console.log('You searched for: ' + this.state.customer_title);
        this.setState({
            searchResults: this.state.list.filter(customer =>
                customer.name.indexOf(this.state.customer_title) !== -1 ||
                customer.address.indexOf(this.state.customer_title) !== -1 ||
                customer.date_of_birth.indexOf(this.state.customer_title) !== -1 ||
                customer.customer_type.indexOf(this.state.customer_title) !== -1 ||
                customer.phone_number.indexOf(this.state.customer_title) !== -1
            )
        });
        event.preventDefault();
    }

    render() {
        const { customer_title } = this.state;

        var result;
        if (this.state.searchResults && this.state.searchResults.length == 1) {
            result = this.state.searchResults.map(function(result, i){
                return (
                    <div key={i} id="single-result" className="col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="fas fa-user"></i>{result.name}
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{result.customer_number}</li>
                                    <li className="list-group-item">{result.address}</li>
                                    <li className="list-group-item">{result.phone_number}</li>
                                    <li className="list-group-item">{result.date_of_birth}</li>
                                    <li className="list-group-item">{result.customer_type}</li>
                                </ul>
                            </div>
                        </div>
                    </div>);
            });
        } else if (this.state.searchResults && this.state.searchResults.length == 0) {
            result = (<div>No search results</div>);
        } else if (this.state.searchResults){
            result = this.state.searchResults.map(function(result, i){
                    return (
                    <div key={i} className="col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="fas fa-user"></i>{result.name}
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{result.customer_number}</li>
                                    <li className="list-group-item">{result.address}</li>
                                    <li className="list-group-item">{result.phone_number}</li>
                                    <li className="list-group-item">{result.date_of_birth}</li>
                                    <li className="list-group-item">{result.customer_type}</li>
                                </ul>
                            </div>
                        </div>
                    </div>);
                });
        } else {
            result = (
                <div className="row">test</div>
            )
        }

        return (
            <div>
                <div className="form-wrapper row">
                    <form id="article-form" className="col-sm-4" onSubmit={this.handleSubmit}>
                        <Input
                            text="Customer search"
                            label="customer_title"
                            type="text"
                            id="customer_title"
                            value={customer_title}
                            handleChange={this.handleChange}
                        />
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
                </div>

                {result}

            </div>
        );

    }
}

export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;