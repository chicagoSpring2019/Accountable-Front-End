import React from 'react';
import './index.css'

class Expenses extends React.Component {
	constructor(props) {
		super();
		this.state = {
			catIterator: '0',
			date: '',
			amount: '',

		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}


	handleSelectChange = async (e) => {
		console.log("--handleSelectChange initiated--");
		this.setState({
			catIterator: e.target.value
		});
	}


	clearForm = () => {
		this.setState({
			displayAmount: '',
			date: '',
			catIterator: '0',
		})
	}



	createExpense = async (e) => {
		e.preventDefault()
		const bodyToSend = {
			amount: this.state.amount,
			date: this.state.date,
			category: this.props.categories[this.state.catIterator],
		}
		console.log("--Expense entry creation has been initiated--");
		try {
			const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/user/' + this.props.activeUserId,  {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(bodyToSend),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			this.clearForm();
			const parsedResponse = await entryResponse.json();
			console.log(parsedResponse, "<<< parsed entry resposne <<<");
			this.props.retrieveExpensesAndCategories();
		} catch(err) {
			console.log(err);
		}
	}





	render() {

		console.log(this.state)
		const optionsToInsert = this.props.categories.map((op, i) => {
			return (
				<option key={i} value={i} > {op.name} </option>
			)
		})

		const expenseForm = (
			<div>
				<form id="expense-form" onSubmit={this.createExpense}>
					Date:
					<input type='text' name='date' value={this.state.date} placeholder='XXXX - XX - XX' onChange={this.handleChange}/>

					Category:
					<select onChange={this.handleSelectChange}>
						{optionsToInsert}
					</select>

					Amount:
					<input type='text' name='amount' value={this.state.amount} placeholder='XX . XX' onChange={this.handleChange}/>

					<button> Post the expense </button>
				</form>
			</div>
		)

		const expenseLog = this.props.expenses.map((entry) => {
			const fullDate = entry.date;
			const cutDate = [];
			for (let i = 2; i < 10; i++) {
				cutDate.push(fullDate.charAt(i))
			}
			const cutDateSring = cutDate.join('');
			const float = entry.amount.toFixed(2)
			return (
				 <tr key={entry._id}> 
					<td> {cutDateSring} </td> 
					<td> {entry.category.name} </td> 
					<td> ${float} </td> 
					<td> <button> Edit </button> </td>
					<td> <button> Delete </button> </td>
				 </tr>
			)
		})

		const sortedLog = expenseLog.sort()
				// <ul>
				// 	{expenseLog}
				// </ul>

		return (
			<div>
				<h4> Expense Log </h4>
				{expenseForm}
				<table>
					<thead>
						<tr>
							<th>DATE</th>
							<th>CATEGORY</th>
							<th>AMOUNT</th>
						</tr>
					</thead>
					<tbody>
						{sortedLog}
					</tbody>
				</table>
			</div>
		)
	}
}


export default Expenses;