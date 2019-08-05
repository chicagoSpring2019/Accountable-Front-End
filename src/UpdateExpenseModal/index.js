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
			message: '',
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
		this.hideMessage();
	}

	hideMessage = (e) => {
		e.preventDefault();
		this.setState({showMessage: false});
		this.closeModal();
	}

	showModalSetState = (e) => {
		e.preventDefault()
		this.setState({
			showModal: true,
			id: this.props.id,
			amount: this.props.amount,
			date: this.props.date.substring(2,10),
			category: this.props.categories[this.state.catIterator],
		})
	}

	updateExpense = async (e) => {
		e.preventDefault();
		if (this.state.date.length !== 8) {
			this.setState({
				message: "Please format the date correctly (yy-mm-dd)"
			})
		} else {
			console.log("--Expense update has been initiated--");
			this.setState({
				showModal: false,
				message: '',
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
				this.closeModal()
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

		const Message = (
			<p className="message">
				{this.state.Message}
			</p>
		)

		const noMessage = (
			<p className="noMessage"/>
		)
 
		return (
			<div className="UpdateExpenseButton">
				<button onClick={this.showModalSetState}> Update </button>
				<Modal open={this.state.showModal}>
	  				<Modal.Content>
	  					{this.state.Message === '' ? noMessage : Message}
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