import React from 'react';
import './App.css';
import RegisterAndLogin from './RegisterAndLogin/index'
import CategoryList from './CategoryList/index'
import Expenses from './Expenses/index'
import DataManip from './DataManip/index'

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
			expenseNewTot: 0,
		}
	}
	componentDidMount() {
		this.retrieveExpensesAndCategories().then(categories => {
			console.log();
			if(this.logged) {
				this.setState({
					categories: [...categories]
				})
			}
		})
		this.loadTotal();

	}

	loadTotal = () => {
		const expenses = this.state.expenses.map((ex, i) => {
			return (
				ex.amount
			)
		})
		console.log(expenses, "<--- expenses");
		let newNum = 0;
		for(let i = 0; i < expenses.length; i++ ) {
			newNum += expenses[i];			
		}
		this.setState({
			expenseOldTot: newNum
		})
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

	setActiveUserId = async (id) => {
		console.log(id, "<< the submitted id in setActiveUserId");
		try {
			this.setState({
				activeUserId: id
			})
			await this.retrieveExpensesAndCategories();
			this.loadTotal()
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
			console.log(parsedCategoryResponse.data,"<+++ parsedCategoryResponse");
			console.log(parsedExpenseResponse.data, "<======= parsedExpenseResponse");
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
			console.log(logOutResponse, "<<< logOutResponse <<<");
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

	addTotal = async (amount) => {
		console.log("--Additon to total--");
		await this.setState({
			expenseNewTot: this.state.expenseOldTot + amount,
		})
		this.setState({
			expenseOldTot: this.state.expenseNewTot
		})
	}

	subTotal = async (amount) => {
		console.log("--Subtraction from total---");
		await this.setState({
			expenseNewTot: this.state.expenseOldTot - amount,
		})
		this.setState({
			expenseOldTot: this.state.expenseNewTot
		})
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
		  		<h1> - ACCOUNTABLE - </h1>

		  		{ this.state.logged ? <Expenses categories={this.state.categories} expenses={this.state.expenses} activeUserId={this.state.activeUserId} 
		  		retrieveExpensesAndCategories={this.retrieveExpensesAndCategories} loadTotal={this.loadTotal} subTotal={this.subTotal} /> : null }

		  		{ this.state.logged ? <DataManip expenseOldTot={this.state.expenseOldTot} /> : null }

			</div>
  		);
  	}
}

export default App;
