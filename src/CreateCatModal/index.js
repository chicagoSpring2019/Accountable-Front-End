import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class CreateCatModal extends Component {
	state = { open: false }

	show = size => () => this.setState({ 
		size, open: true,
		newCatName: undefined, 
	})

	render() {
		const { open, size } = this.state

		return (
			<div>
				<Modal size={small} open={open} onClose={this.close}>
      				<Modal.Header>Create a new category</Modal.Header>
      				<Modal.Content>
        				<Form onSubmit={this.createCategory}>
          					<Form.Input type='text' name='newCatName' value={this.state.newCatName} onChange={this.handleChange}/>
          					<Modal.Actions>
           						<Button>Create new Category</Button>
           						<Button onClick={this.closeModals}>Cancel</Button>
          					</Modal.Actions>
        				</Form>
      				</Modal.Content>
    			</Modal>
    		</div>
		)
	}
}

export default CreateCatModal