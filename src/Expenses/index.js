import React from 'react';
import './index.css';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';



class Expenses extends React.Component {
	constructor(props) {
		super();
		this.state = {
			catIterator: '0',
			date: '',
			amount: '',
			showCatCreateModal: false,
			newName: '',
			showExpenseUpdateModal: false,
			editAmount: 0,
			editDate: '',
			editId: '',
			expenseTot: 0,
			messageNew: '',
			messageEdit: '',
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	clearForm = () => {
		this.setState({
			amount: '',
		})
	}

	deleteExpense = async (e) => {
		try {
			const deleteResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/expense/' + e.currentTarget.dataset.id, {
				method: 'DELETE',
				credentials: 'include',
			});
			const parsedResponse = await deleteResponse.json();
			await this.props.retrieveExpensesAndCategories();
			this.props.loadTotal();
		} catch(err) {
			console.log(err);
		}
	}


	createExpense = async (e) => {
		e.preventDefault()
		if (this.state.date.length !== 8) {
			this.setState({
				messageNew: "Please format the date correctly (yy-mm-dd)"
			})
		} else {
			this.setState({
				messageNew: ''
			})
			const properDate = '20'.concat(this.state.date)
			console.log(this.state.date, properDate)
			const bodyToSend = {
				amount: this.state.amount,
				date: properDate,
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
				await this.props.retrieveExpensesAndCategories();
				this.props.loadTotal();
				
			} catch(err) {
				console.log(err);
			}
		}
	}

	setCatModalStateFunction = async (e) => {
		e.preventDefault()
		this.setState({
			showCatCreateModal:true
		})
	}

	createCategory = async (e) => {
		e.preventDefault()
		const bodyToSend = [{
			name: this.state.newName,
		}]
		console.log("--Expense entry creation has been initiated--");
		try {
			const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'category/user/' + this.props.activeUserId,  {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(bodyToSend),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await entryResponse.json();
			this.props.retrieveExpensesAndCategories();
			this.setState({
				showCatCreateModal: false
			})
			this.props.loadCatList();
		} catch(err) {
			console.log(err);
		}
	}




	openUpdateFunction = async (e) => {
		e.preventDefault()
		this.setState({
			editId: e.currentTarget.dataset.id,
			editAmount: e.currentTarget.dataset.amount,
			editDate: e.currentTarget.dataset.date.substring(2,10),
			category: this.props.categories[this.state.catIterator],
			showExpenseUpdateModal: true,
		})
	}




	updateExpenseF = async (e) => {
		e.preventDefault();
		if (this.state.editDate.length !== 8) {
			this.setState({
				messageEdit: "Please format the date correctly (yy-mm-dd)"
			})
		} else {

			console.log("--Expense update has been initiated--");
			this.setState({
				showExpenseUpdateModal: false,
				messageEdit: '',
			})
			const properDate = '20'.concat(this.state.editDate)
			const properAmount = this.state.editAmount.replace(/[,$]/g, '');
			const bodyToSend = {
				amount: properAmount,
				date: properDate,
				category: this.props.categories[this.state.catIterator],
			}
			try {
				const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/expense/' + this.state.editId,  {
					method: 'PUT',
					credentials: 'include',
					body: JSON.stringify(bodyToSend),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const parsedResponse = await entryResponse.json();
				await this.props.retrieveExpensesAndCategories();
				this.props.loadTotal()
			} catch(err) {
				console.log(err);
			}
		}
	}














	render() {
		const optionsToInsert = this.props.categories.map((op, i) => {
			return (
				<option key={i} value={i} > {op.name} </option>
			)
		})

		const MessageNew = (
			<p className="message">
				{this.state.messageNew}
			</p>
		)

		const MessageEdit = (
			<p className="message">
				{this.state.messageEdit}
			</p>
		)

		const noMessage = (
			<p className="noMessage"/>
		)

		const ExpenseForm = (
			<div>
				{this.state.messageNew === '' ? noMessage : MessageNew}
				<form id="expense-form" onSubmit={this.createExpense}>
					Date:
					<input type='text' name='date' value={this.state.date} placeholder='yy-mm-dd' onChange={this.handleChange}/>

					Category:
					<select name='catIterator' onChange={this.handleChange}>
						{optionsToInsert}
					</select>

					Amount: $
					<input type='text' name='amount' value={this.state.amount} placeholder='' onChange={this.handleChange}/>

					<button>Post the expense</button>
				</form>
			</div>
		)

		const ExpenseLog = this.props.expenses.map((entry) => {
			const fullDate = entry.date;
			const cutDate = [];
			for (let i = 2; i < 10; i++) {
				cutDate.push(fullDate.charAt(i))
			}
			const cutDateSring = cutDate.join('');
			const float = entry.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 } ) 
			return (
				 <tr key={entry._id}> 
					<td className="dateBox"> {cutDateSring} </td> 
					<td> {entry.category.name} </td> 
					<td> {float} </td> 
					<td className="editButton"> <button data-id={entry._id} data-date={entry.date} data-amount={float} data-cat={entry.category.name} onClick={this.openUpdateFunction}> Edit </button> </td>
					<td className="editButton"> <button data-id={entry._id} onClick={this.deleteExpense}> Delete </button> </td>
				 </tr>
			)
		})

		const CreateCatModal = (

				<Modal open={this.state.showCatCreateModal}>
      				<Modal.Content>
        				<Form onSubmit={this.createCategory}>
          					<Label>
            					Create a new category:
          					</Label>
          					<Form.Input type='text' name='newName' value={this.state.newName} onChange={this.handleChange}/>
          					
          					<Modal.Actions>
           						<Button>Create new Category</Button>
          					</Modal.Actions>
        				</Form>
      				</Modal.Content>
    			</Modal>
			
		)



		const UpdateExpenseModal = (

			<Modal open={this.state.showExpenseUpdateModal}>
  				<Modal.Content>
  					{this.state.messageEdit === '' ? noMessage : MessageEdit}
    				<Form onSubmit={this.updateExpenseF}>
      					<Label>
        					Update the expense:
      					</Label>
      					<Form.Input type='text' name='editDate' value={this.state.editDate.substring(0, 10)} onChange={this.handleChange}/>
      					<select onChange={this.handleSelectChange}>
							{optionsToInsert}
						</select>
      					<Form.Input type='text' name='editAmount' value={this.state.editAmount} onChange={this.handleChange}/>          					
      					<Modal.Actions>
       						<Button>Update the modal</Button>
      					</Modal.Actions>
    				</Form>
  				</Modal.Content>
			</Modal>
			
		)

		return (
			<div>
				<form onSubmit={this.setCatModalStateFunction}>
					<button> Create new Category </button>
				</form>
				{CreateCatModal}
				{UpdateExpenseModal}
				{ExpenseForm}
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>DATE</th>
								<th className="catBox">CATEGORY</th>
								<th>AMOUNT</th>
								<th> Editing </th>
							</tr>
						</thead>
						<tbody>
							{ExpenseLog}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}



export default Expenses;