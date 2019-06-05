import React from 'react';
import './App.css';
import RegisterAndLogin from './authComponents/registerAndLogin'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			logged: false,
			activeUserEmail: null,
			activeUserId: null,
		}
	}

	setActiveUserEmailAndLogged = (email) =>	{
		console.log(email, "<<< the submitted email address in setActiveUser");
		try {
			this.setState({
				activeUserEmail: email,
				logged: true,
			})
		} catch(err) {
			console.log(err);
		}
	}

	setActiveUserId = (id) => {
		console.log(id, "<< the submitted id in setActiveUserId");
		try {
			this.setState({
				activeUserId: id
			})
			this.retrieveExpensesAndCategories();
		} catch(err) {
			console.log(err);
		}
	}

	retrieveExpensesAndCategories = async () => {
		console.log("--retrieveExpensesAndCategories() has been initiated--");
		try {
			console.log(this.state.activeUserId, "<<<< this.state.activeUserId");
			const expenseResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/user/' + this.state.activeUserId)
			const categoryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'category/user/' + this.state.activeUserId)
			const parsedExpenseResponse = await expenseResponse.json();
			const parsedCategoryResponse = await categoryResponse.json();
			console.log(parsedCategoryResponse,"<+++ parsedCategoryResponse");
			console.log(parsedExpenseResponse, "<======= parsedExpenseResponse");
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
				activeUserEmail: null,
				activeUserId: null,				
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

				{ this.state.logged ? LogOut : <RegisterAndLogin setActiveUserEmailAndLogged={this.setActiveUserEmailAndLogged} setActiveUserId={this.setActiveUserId} /> }

		  		<h2>hello world</h2>
			</div>
  		);
  	}
}

export default App;
