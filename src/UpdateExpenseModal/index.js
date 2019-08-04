import React from 'react';
import { Button, Modal, Form, Label } from 'semantic-ui-react';

class UpdateExpenseModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			showModal: false,
			amount: 0,
			id: '',
			date: '',
			catIterator: '0',
			showMessage: false,

		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSelectChange = async (e) => {
		this.setState({
			catIterator: e.target.value,
		});
	}

	closeModal = () => {
		this.setState({
			showModal: false,
		})
	}

	hideMessage = (e) => {
		e.preventDefault();
		this.setState({showMessage: false});
		this.closeModal();
	}

	showModalState = async (e) => {
		e.preventDefault()
		this.setState({
			showModal: true,
		})
		this.openUpdateFunction();
	}

	
	openUpdateFunction = async (e) => {
		// e.preventDefault()
		await this.setState({
			id: this.props.id,
			amount: this.props.amount,
			date: this.props.date.substring(2,10),
			category: this.props.categories[this.state.catIterator],
		})
		console.log(this.state, "<<<<< state and all updated stuff")
	}

	updateExpense = async (e) => {
		e.preventDefault();
		if (this.state.date.length !== 8) {
			this.setState({
				messageEdit: "Please format the date correctly (yy-mm-dd)"
			})
		} else {
			console.log("--Expense update has been initiated--");
			this.setState({
				showExpenseUpdateModal: false,
				messageEdit: '',
			})
			const properDate = '20'.concat(this.state.date)
			const properAmount = this.state.amount.replace(/[,$]/g, '');
			const bodyToSend = {
				amount: properAmount,
				date: properDate,
				category: this.props.categories[this.state.catIterator],
			}
			try {
				const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'expense/expense/' + this.state.id,  {
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
				this.closeModal()
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
 
		return (
			<div className="UpdateExpenseButton">
				<button onClick={this.showModalState}> Update </button>
				<Modal open={this.state.showModal}>
	  				<Modal.Content>
	  					{this.state.messageEdit === '' ? noMessage : MessageEdit}
	    				<Form onSubmit={this.updateExpense}>
	      					<Label>
	        					Update the expense:
	      					</Label>
	      					<Form.Input type='text' name='date' value={this.state.date.substring(0, 10)} onChange={this.handleChange}/>
	      					<select onChange={this.handleSelectChange}>
								{optionsToInsert}
							</select>
	      					<Form.Input type='text' name='amount' value={this.state.amount} onChange={this.handleChange}/>          					
	      					<Modal.Actions>
	       						<Button>Update the Expense</Button>
	       						<Button onClick={this.closeModal}>Cancel</Button>
	      					</Modal.Actions>
	    				</Form>
	  				</Modal.Content>
				</Modal>
			</div>
			
		)
	}
}

export default UpdateExpenseModal