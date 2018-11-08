import React, { Component } from 'react';

class Customer extends Component {

	constructor() {
		super();
		this.state = {
			customers: []
		}
	}

	componentDidMount(){
		fetch('/api/customers')
			.then(res => res.json())
			.then(customers => this.setState({customers}));
	}

	render() {
		return (
			<div>
				Hello World!
				<ul>
					{this.state.customers.map(customer => 
						<li key={customer.id}>{customer.username}</li>
					)}
				</ul>
			</div>
		)
	}
}

export default Customer;