import React from 'react';
import { Button, Modal, Form, Label } from 'semantic-ui-react';

class UpdateExpenseModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			showModal: false,
			newName: '',
			editAmount: 0,
			editId: '',
			editDate: '',
			catIterator: '0',

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

	setCatModalStateFunction = async (e) => {
		e.preventDefault()
		this.setState({
			showModal: true,
		})
	}

	
	openUpdateFunction = async (e) => {
		e.preventDefault()
		this.setState({
			editId: e.currentTarget.dataset.id,
			editAmount: e.currentTarget.dataset.amount,
			editDate: e.currentTarget.dataset.date.substring(2,10),
			category: this.props.categories[this.state.catIterator],
		})
	}

	updateExpense = async (e) => {
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

		return (
			<div className="UpdateExpenseButton">
				<button onClick={this.setUpdateExpenseModalState}> Update !!!</button>
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
	       						<Button onClick={this.closeModals}>Cancel</Button>
	      					</Modal.Actions>
	    				</Form>
	  				</Modal.Content>
				</Modal>
			</div>
			
		)
	}
}

export default UpdateExpenseModal