import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

class CreateCatModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			newCatName: undefined, 
			message: undefined,
			showMessage: false,
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	hideMessage = () => {
		this.setState({showMessage: false});
		this.props.closeModals();
	}

	createCategory = async (e) => {
		e.preventDefault()
		console.log(this.props.categories);
		if (!this.state.newCatName) {
			console.log("Please enter a valid name for the category.");
			this.setState({
				message: "Please enter a valid name for the category.",
				showMessage: true,
			})
			return;
		} else {
			const name = this.state.newCatName
			for(let i = 0; i < this.props.categories.length; i++ ) {
				console.log(this.props.categories[i].name)
				if (name === this.props.categories[i].name) {
					console.log(`The '${this.props.categories[i].name}' category already exists.`)
					this.setState({
						message: `The '${this.props.categories[i].name}' category already exists.`,
						showMessage: true,
					})
					return;
				}
			}
		}
		const bodyToSend = [{
			name: this.state.newCatName,
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
				newCatName: undefined,
				showMessage: false,
			})
			this.props.closeModals()
			this.props.loadCatList();
		} catch(err) {
			console.log(err);
		}
	}

	render() {

		const Message = (
			<p class="message"> {this.state.message} </p>
		)

		const noMessage = (
			<p className="noMessage"/>
		)

		return (
			<div>
				<Modal open={this.props.showCatCreateModal}>
      				<Modal.Header>Create a new category</Modal.Header>
      				<Modal.Content>
      					{ this.state.showMessage === true ? Message : noMessage }
        				<Form onSubmit={this.createCategory}>
          					<Form.Input type='text' name='newCatName' value={this.state.newCatName} onChange={this.handleChange}/>
          					{noMessage}
          					<Modal.Actions>
           						<Button>Create new Category</Button>
           						<Button onClick={this.hideMessage}>Cancel</Button>
          					</Modal.Actions>
        				</Form>
      				</Modal.Content>
    			</Modal>
    		</div>
		)
	}
}

export default CreateCatModal