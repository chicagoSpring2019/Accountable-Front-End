import React from 'react';
import './App.css';
import RegisterAndLogin from './RegisterAndLogin/index'
import Expenses from './Expenses/index'
import DataManip from './DataManip/index'
import ViewByCat from './ViewByCat/index'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			logged: false,
			activeUserEmail: null,
			activeUserId: null,
			categories: [],
			expenses: [],
			expenseOldTot: 0,
		}
	}



	loadTotal = () => {
		const expenses = this.state.expenses.map((ex, i) => {
			return (
				ex.amount
			)
		})
		let newNum = 0;
		for(let i = 0; i < expenses.length; i++ ) {
			newNum += expenses[i];			
		}
		this.setState({
			expenseOldTot: newNum
		})
	}


	setActiveUserEmailAndLogged = (email) =>	{
		try {
			this.setState({
				activeUserEmail: email,
				logged: true,
			})
		} catch(err) {
			console.log(err);
		}
	}

	setActiveUserId = async (id) => {
		try {
			this.setState({
				activeUserId: id
			})
			await this.retrieveExpensesAndCategories();
			this.loadTotal();
		} catch(err) {
			console.log(err);
		}
	}

	retrieveExpensesAndCategories = async () => {
		console.log("--retrieveExpensesAndCategories() has been initiated--");
		try {
			const expenseResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/user/' + this.state.activeUserId)
			const categoryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'category/user/' + this.state.activeUserId)
			const parsedExpenseResponse = await expenseResponse.json();
			const parsedCategoryResponse = await categoryResponse.json();
			this.setState({
				categories: parsedCategoryResponse.data,
				expenses: parsedExpenseResponse.data
			})
		} catch(err) {
			console.log(err);
		}
	}

	logOutFunction = async () => {
		console.log("--Log out has been initiated--");
		try {
			const logOutResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/logout')
			this.setState({
				activeUserEmail: null,
				activeUserId: null,				
				logged: false,
				categories: [],
				expenses: [],
			})
		} catch(err) {
			console.log(err);
		}
	}













	render() {
		const LogOut = (
			<div className="logOut">
				<button onClick={this.logOutFunction}> Log out </button>
			</div>
		)

  		return (
			<div className="App">
				<div className="main">
		  			<h1>  Accountable  </h1>
					{ this.state.logged ? LogOut : <RegisterAndLogin setActiveUserEmailAndLogged={this.setActiveUserEmailAndLogged} setActiveUserId={this.setActiveUserId} /> }
					{ this.state.logged ? <DataManip expenseOldTot={this.state.expenseOldTot} categories={this.state.categories} expenses={this.state.expenses} retrieveExpensesAndCategories={this.retrieveExpensesAndCategories}/> : null }
					{ this.state.logged ? <ViewByCat expenseOldTot={this.state.expenseOldTot} categories={this.state.categories} expenses={this.state.expenses} retrieveExpensesAndCategories={this.retrieveExpensesAndCategories}/> : null }
		  			{ this.state.logged ? <Expenses categories={this.state.categories} expenses={this.state.expenses} activeUserId={this.state.activeUserId} 
		  			retrieveExpensesAndCategories={this.retrieveExpensesAndCategories} loadTotal={this.loadTotal}  /> : null }
	
		  			<h6 class="spacer">© Gregory Gancarz - 2019</h6>
		  		</div>
			</div>
  		);
  	}
}

export default App;
