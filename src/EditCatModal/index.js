import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

class EditCatModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			newCatName: undefined, 
			message: undefined,
			showMessage: false,
			showModal: false,
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

	editCategory = async (e) => {
		e.preventDefault()
		const catToEdit = this.props.categories[this.state.catIterator]
		if (!this.state.newCatName) {
			console.log("Please enter a valid name for the category.");
			this.setState({
				message: "Please enter a valid name for the category.",
				showMessage: true,
			})
			return;
		} else if (this.state.newCatName === catToEdit.name) {
			console.log("The category already has the given name.");
			this.setState({
				message: "The category already has the given name.",
				showMessage: true,
			})
			return;
		} else {
			const name = this.state.newCatName
			for(let i = 0; i < this.props.categories.length; i++ ) {
				if (name === this.props.categories[i].name) {
					console.log(`The '${this.props.categories[i].name}' category name already exists.`)
					this.setState({
						message: `The '${this.props.categories[i].name}' category already exists.`,
						showMessage: true,
					})
					return;
				}
			}
		}
		const bodyToSend = [{
			name: this.state.newCatName
		}]
		console.log("--Category update has been initiated--");
		console.log(catToEdit, "<<<< catToEdit")
		try {
			const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'category/cat/' + catToEdit._id,  {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(bodyToSend),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await entryResponse.json();
			console.log(parsedResponse)
			this.props.retrieveExpensesAndCategories();
			this.setState({
				newCatName: undefined,
				showMessage: false,
			})
			this.closeModal()
			this.props.loadCatList();
		} catch(err) {
			console.log(err);
		}
	}

	render() {

		const Message = (
			<p className="message"> {this.state.message} </p>
		)

		const noMessage = (
			<p className="noMessage"/>
		)

		const optionsToInsert = this.props.categories.map((op, i) => {
			return (
				<option key={i} value={i} > {op.name} </option>
			)
		})

		return (
			<div className="CreateCatButton">
				<button onClick={this.setCatModalStateFunction} > Edit Category </button>
				<Modal open={this.state.showModal}>
      				<Modal.Header>Edit category</Modal.Header>
      				<Modal.Content>
      					{ this.state.showMessage === true ? Message : noMessage }
	        			<Form onSubmit={this.editCategory}>
	        				<select onChange={this.handleSelectChange}>
								{optionsToInsert}
							</select>
	          				<Form.Input type='text' name='newCatName' value={this.state.newCatName} onChange={this.handleChange}/>
	          				{noMessage}
	          				<Modal.Actions>
	           					<Button>Update the Category</Button>
	           					<Button onClick={this.hideMessage}>Cancel</Button>
	          				</Modal.Actions>
        				</Form>
      				</Modal.Content>
    			</Modal>
    		</div>
		)
	}
}

export default EditCatModal