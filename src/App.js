import React from 'react';
import './App.css';
import Register from './authComponents/register'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			logged: false,
			activeUser: null,
		}
	}

	setActiveUserAndLogged = (email)	=>	{
		console.log(email, "<<< the submitted email address in setActiveUser");
		try {
			this.setState({
				activeUser: email,
				logged: true
			})
		} catch(err) {
			console.log(err);
		}
	}

	render() {
  		return (
			<div className="App">
				<Register setActiveUserAndLogged={this.setActiveUserAndLogged}/>
		  		<h2>hello world</h2>
			</div>
  		);
  	}
}

export default App;
