import React from 'react';
import './index.css'

class Expenses extends React.Component {
	constructor(props) {
		super();
		this.state = {
			amount: '',
			catIterator: '0',
			date: ''
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
			amount: '',
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
		console.log("<=== this.state in handleSelectChange()");

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
			for (let i = 0; i < 10; i++) {
			    console.log(fullDate.charAt(i));
			    cutDate.push(fullDate.charAt(i))
			}
			console.log(cutDate, "cutDate <<<<<");
			const cutDateSring = cutDate.join('');
			console.log(cutDateSring, "<=== string");
			return (
				<li className='entryBar' key={entry._id} > <p className='entrySquare'> {cutDateSring} </p> <p className='entrySquare'> {entry.category.name} </p> <p className='entrySquare'> {entry.amount} </p> </li>
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