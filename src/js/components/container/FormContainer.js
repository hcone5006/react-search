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
    console.log('An essay was submitted: ' + this.state.customer_title);
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
      result = (<div>{this.state.searchResults.map(function(result, i){
        return <li key={i}>{result.name}<br/>{result.customer_number}<br/>{result.address} {result.date_of_birth}<br/>{result.customer_type}<br/>{result.phone_number}<br/></li>;
      })}</div>);
    } else if (this.state.searchResults && this.state.searchResults.length == 0) {
      result = (<div>No search results</div>);
    } else if (this.state.searchResults){
      result = (<ul>
        {this.state.searchResults.map(function(result, i){
          return <li key={i}>{result.name}<br/>{result.customer_number}<br/>{result.address} {result.date_of_birth}<br/>{result.customer_type}<br/>{result.phone_number}<br/></li>;
        })}
      </ul>);
    } else {
      result = (
        <div></div>
      )
    }

    return (
      <div>
        <form id="article-form" onSubmit={this.handleSubmit}>
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
        {result}
      </div>
    );

  }
}

export default FormContainer;

const wrapper = document.getElementById("create-article-form");
    wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;