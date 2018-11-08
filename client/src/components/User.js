import React, { Component } from 'react';

class User extends Component {

	constructor() {
		super();
		this.state = {
			users: []
		}
	}

	componentDidMount(){
		fetch('/api/users')
			.then(res => res.json())
			.then(users => this.setState({users}));
	}

	render() {
		return (
			<div>
				Hello World!
				<ul>
					{this.state.users.map(user => 
						<li key={user.id}>{user.username}</li>
					)}
				</ul>
			</div>
		)
	}
}

export default User;