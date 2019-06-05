import React from 'react';

class Expenses extends React.Component {
	constructor(props) {
		super();
		this.state = {
			amount: '',
			category: '',
			date: '',
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSelectChange = async (e) => {
		console.log("--handleSelectChange initiated");
		this.setState({category: e.target.value});
		console.log(e.target.value, "<<e.target.value<<");
		console.log(this.state , "<=== this.state in handleSelectChange()");
	}

	clearForm = () => {
		this.setState({
			amount: '',
			category: '',
			date: '',
		})
	}


	createExpense = async (e) => {

		e.preventDefault()

		console.log("--Expense entry creation has been initiated--");
		try {
			console.log(this.state, "<<< state");
			console.log(process.env.REACT_APP_BACKEND_URL + 'expense/user/' + this.props.activeUserId, "<<<the route");
			const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/user/' + this.props.activeUserId,  {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			this.clearForm();
			const parsedResponse = await entryResponse.json();
			console.log(parsedResponse, "<<< parsed entry resposne <<<");


		} catch(err) {
			console.log(err);
		}
	}





	render() {
		let expenses = this.props.expenses
		console.log(this.props.activeUserId, "<<<    activeUserId");
		// console.log(" ");
		// console.log(expenses, "<<<. expenses in render(). ");
		// console.log(this.props, "<<<<<. this.props in render() ");
		// console.log(" -- -- -- -- -- -- ");

		const expenseForm = (
			<div>
				<form id="expense-form" onSubmit={this.createExpense}>
					Date:
					<input type='text' name='date' value={this.state.date} onChange={this.handleChange}/>

					Category:
					<select value={this.state.category} onChange={this.handleSelectChange}>
						<option value="Zero 0 zed"> Zero </option>
						<option value="One 1 uno"> One </option>
						<option value="Two 2 dos"> Two </option>
					</select>

					Amount:
					<input type='text' name='amount' value={this.state.amount} onChange={this.handleChange}/>

					<button> Post the expense </button>
				</form>
			</div>
		)

		const expenseLog = this.props.expenses.map((entry) => {
			return (
				<li key={entry._id} > <p> {entry.date} </p> <p> {entry.category} </p> <p> {entry.amount} </p> </li>
			)
		})

		return (
			<div>
				<h4> Expense Log </h4>
				{expenseForm}
				<ul>
					{expenseLog}
				</ul>
			</div>
		)
	}
}


export default Expenses;