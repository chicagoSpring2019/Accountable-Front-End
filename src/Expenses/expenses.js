import React from 'react';

class Expenses extends React.Component {
	constructor(props) {
		super();
		this.state = {

		}
	}

	createExpense() {

	}





	render() {
		let expenses = this.props.expenses
		console.log(expenses);
		console.log(this.props);

		const expenseLog = this.props.expenses.map((entry, i) => {
			return (
				<li key={i} > <p> {entry.date} </p> <p> {entry.category} </p> <p> {entry.amount} </p> </li>
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