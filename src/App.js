import React from 'react';
import './App.css';
import RegisterAndLogin from './RegisterAndLogin/index'
import Expenses from './Expenses/index'
import DataManip from './DataManip/index'
import ViewByCat from './ViewByCat/index'
import SavingsSplit from './SavingsSplit/index'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			logged: false,
			activeUserEmail: null,
			activeUserId: null,
			categories: [],
			expenses: [],
			expenseTot: 0,
			queryCategory: 'All',
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
			expenseTot: newNum
		})
	}


	setActiveUser = async (email, id) =>	{
		try {
			this.setState({
				activeUserEmail: email,
				logged: true,
				activeUserId: id
			})
			await this.retrieveExpensesAndCategories();
			this.loadTotal();
		} catch(err) {
			console.log(err);
		}
	}



	retrieveExpensesAndCategories = async (iterator) => {
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

	retrieveExpensesByQuery = async (query) => {
		console.log("--retrieveExpensesByQuery() has been initiated--");
		try {
			this.setState({
				queryCategory: query,
			})
			// const expenseResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/user/' + this.state.activeUserId + '/' + query)
			// const parsedExpenseResponse = await expenseResponse.json();
			// this.setState({
			// 	expenses: parsedExpenseResponse.data
			// })
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
					{ this.state.logged ? LogOut : <RegisterAndLogin setActiveUser={this.setActiveUser} /> }
					{ this.state.logged ? <DataManip expenseTot={this.state.expenseTot} categories={this.state.categories} expenses={this.state.expenses} /> : null }
					{ this.state.logged ? <ViewByCat categories={this.state.categories} retrieveExpensesByQuery={this.retrieveExpensesByQuery} /> : null }
					{/*{ this.state.logged ? <SavingsSplit/> : null} */}
		  			{ this.state.logged ? <Expenses categories={this.state.categories} expenses={this.state.expenses} activeUserId={this.state.activeUserId} queryCategory={this.state.queryCategory}
		  			retrieveExpensesAndCategories={this.retrieveExpensesAndCategories} loadTotal={this.loadTotal}  /> : null }
	
		  			<h6 class="spacer">© Gregory Gancarz - 2019</h6>
		  		</div>
			</div>
  		);
  	}
}

export default App;
