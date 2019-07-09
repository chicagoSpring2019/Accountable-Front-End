import React from 'react';
import './index.css';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class SavingsSplit extends React.Component {
	constructor(props) {
		super();
		this.state = {
			savingsGross: 100,
			benchmark: 0,
			percent: 0,
			name: '',
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	createGoal = async (e) => {
		e.preventDefault()
		const bodyToSend = {
			benchmark: this.state.benchmark,
			name: this.state.name,
			percent: this.percent,
		}
		console.log("--Goal entry creation has been initiated--");
		try {
			const entryResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'goal/user/' + this.props.activeUserId,  {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(bodyToSend),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			this.clearForm();
			const parsedResponse = await entryResponse.json();
			console.log(parsedResponse);

			
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		const goalForm = (
			<div>
				<form id="goal-form" onSubmit={this.createGoal}>
					Name:
					<p>What are you saving for?</p>
					<input type='text' name='name' value={this.state.name} placeholder='Vacation' onChange={this.handleChange}/>
					<br/>
					Percent:
					<p>What percentage of your gross savings this month would you like to put towards this goal?</p>
					<input type='text' name='percent' value={this.state.percent} placeholder='15' onChange={this.handleChange}/>
					<br/>
					Goal:
					<p>Is there an amount you'd like to aim for with this goal?</p>
					<input type='text' name='benchmark' value={this.state.benchmark} placeholder='100' onChange={this.handleChange}/>
				</form>
			</div>
		)

		return (
			<div>
				{goalForm}
			</div>
		)



	}




}

export default SavingsSplit;