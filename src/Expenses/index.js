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

	handleSelectChange = (e) => {
		this.setState({category: e.target.value});
	}


	createExpense() {

	}





	render() {
		let expenses = this.props.expenses
		console.log(expenses);
		console.log(this.props);

		// const expenseForm = (
		// 	<div>
		// 		<form id="expense-form" onSubmit={this.createExpense}>
		// 			Date:
		// 			<input type='text' name='date' value={this.state.date} onChange={this.handleChange}/>

		// 			Category:
		// 			<select value={this.state.category} onChange={this.handleSelectChange}/>
		// 				<option value="Zero 0 zed"> Zero </option>
		// 				<option value="One 1 uno"> One </option>
		// 				<option value="Two 2 dos"> Two </option>
		// 			</select>

		// 			Amount:
		// 			<input type='text' name='amount' value={this.state.amount} onChange={this.handleChange}/>

		// 			<button type='sumbit'> Post the expense </button>
		// 		</form>
		// 	</div>
		// )

		const expenseLog = this.props.expenses.map((entry) => {
			return (
				<li key={entry._id} > <p> {entry.date} </p> <p> {entry.category} </p> <p> {entry.amount} </p> </li>
			)
		})

		return (
			<div>
				<h4> Expense Log </h4>
				
				<ul>
					{expenseLog}
				</ul>
			</div>
		)
	}

}


export default Expenses;