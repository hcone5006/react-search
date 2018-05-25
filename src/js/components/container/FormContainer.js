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
                    <div key={i} id="single-result" className="col-sm-6 col-md-4">
                        <div className="card my-4 top-triangle">
                            <div className="card-header">
                                <i className="fas fa-user mr-2"></i><b>{result.name}</b>
                            </div>
                            <div className="card-body p-0 mb-1">
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
            result = (<div className="col-sm-9 my-4">No search results</div>);
        } else if (this.state.searchResults){
            result = this.state.searchResults.map(function(result, i){
                    return (
                    <div class="row">
                      <div className="col-6 col-sm-3 col-md-12 page-header d-md-none d-lg-none">
                        <div className="border-bottom py-3 grid">
                          <div>Name</div>
                          <div>ID</div>
                          <div>Address</div>
                          <div>Phone Number</div>
                          <div>Birth date</div>
                          <div>Acc type</div>
                        </div>
                      </div>
                      <div key={i} className="col-6 col-sm-9 col-md-12">
                        <div className="border-bottom py-3 grid">
                          <div className=""><i className="fas fa-user mr-2"></i><b>{result.name}</b></div>
                          <div className="">{result.customer_number}</div>
                          <div className="">{result.address}</div>
                          <div className="">{result.phone_number}</div>
                          <div className="">{result.date_of_birth}</div>
                          <div className="">{result.customer_type}</div>
                        </div>
                      </div>
                    </div>);
                });
        } else {
            result = (
                <div></div>
            )
        }

        return (
            <div>
                <div className="form-wrapper mb-4">
                    <form id="article-form" className="col-sm-12 col-md-6 py-3 border rounded" onSubmit={this.handleSubmit}>
                        <Input
                            text="Search customer details"
                            label="customer_title"
                            type="text"
                            id="customer_title"
                            value={customer_title}
                            handleChange={this.handleChange}
                        />
                    </form>
                </div>
                <div className="row">
                  <div className="col-sm-3 col-md-12 page-header py-2 d-sm-none d-none d-md-block">
                    <div className="grid">
                      <div>Name</div>
                      <div>ID</div>
                      <div>Address</div>
                      <div>Phone Number</div>
                      <div>Birth date</div>
                      <div>Acc type</div>
                    </div>
                  </div>
                </div>

                  {result}
                
            </div>
        );

    }
}

export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;