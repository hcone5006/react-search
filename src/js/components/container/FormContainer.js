import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import customers from '../../../customers.json'; 

class FormContainer extends Component {
  constructor() {
    super();

    this.state = {
      list: customers,
      seo_title: "",
      searchResults: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: event.target.value,
      searchResults: this.state.list.filter(customer => 
        customer.name.indexOf(event.target.value) !== -1 ||
        // customer.customer_number.indexOf(event.target.value) !== -1 ||
        customer.address.indexOf(event.target.value) !== -1 ||
        customer.date_of_birth.indexOf(event.target.value) !== -1 ||
        customer.customer_type.indexOf(event.target.value) !== -1 ||
        customer.phone_number.indexOf(event.target.value) !== -1
      )
    });
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.seo_title);
    event.preventDefault();
  }

  render() {
    const { seo_title } = this.state;
    return (
      <div>
        <form id="article-form" onSubmit={this.handleSubmit}>
          <Input
            text="Customer search"
            label="seo_title"
            type="text"
            id="seo_title"
            value={seo_title}
            handleChange={this.handleChange}
          />
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>

        <ul>
          {this.state.searchResults.map(function(result, i){
            return <li key={i}>{result.name}<br/>{result.customer_number}<br/>{result.address} {result.date_of_birth}<br/>{result.customer_type}<br/>{result.phone_number}<br/></li>;
          })}
        </ul>

      </div>
    );

  }
}

export default FormContainer;

const wrapper = document.getElementById("create-article-form");
    wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;