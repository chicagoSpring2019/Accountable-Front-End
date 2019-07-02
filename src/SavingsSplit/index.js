import React from 'react';
import './index.css';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class SavingsSplit extends React.Component {
	constructor(props) {
		super();
		this.state = {
			savingsGross: 0,
			benchmark: 0,
			percent: 0,
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const goalForm = (
			<div>
				<form id="goal-form" onSubmit={this.createGoal}>
					Name:
					<p>What are you saving for?</p>
					<input type='text' name='name' value={this.state.name} placeholder='Vacation' onChange={this.handleChange}/>
					Percent:
					<p>What percentage of your gross savings this month would you like to put towards this goal?</p>
					<input type='text' name='percent' value={this.state.percent} placeholder='15' onChange={this.handleChange}/>
					Goal:
					<p>Is there an amount you'd like to aim for with this goal?</p>
					<input type='text' name='date' value={this.state.date} placeholder='100' onChange={this.handleChange}/>
				</form>
			</div>
		)



	}




}

export default SavingsSplit;