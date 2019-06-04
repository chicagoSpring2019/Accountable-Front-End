import React from 'react';
import './App.css';
import RegisterAndLogin from './authComponents/registerAndLogin'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			logged: false,
			activeUser: null,
		}
	}

	setActiveUserAndLogged = (email) =>	{
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

	logOutFunction = async () => {
		console.log("--Log out has been initiated--");
		try {
			const logOutResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/logout')
			console.log(logOutResponse, "<<< logOutResponse <<<");
			this.setState({
				activeUser: null,
				logged: false,
			})
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		const LogOut = (
			<div>
				<button onClick={this.logOutFunction}> Log out </button>
			</div>
		)

  		return (
			<div className="App">

				{this.state.logged ? LogOut : <RegisterAndLogin setActiveUserAndLogged={this.setActiveUserAndLogged}/> }

		  		<h2>hello world</h2>
			</div>
  		);
  	}
}

export default App;
