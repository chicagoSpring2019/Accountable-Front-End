import React from 'react';
import './index.css';

class ViewByCat extends React.Component {
	constructor(){
		super();
		this.state = {
			query: 0,
		}
	}


	handleChange = async (e) => {
		await this.setState({[e.target.name]: e.target.value});
		this.props.retrieveExpensesByQuery(this.state.query)
	}

	

	render() {
		const optionsToInsert = this.props.categories.map((op, i) => {
			return (
				<option key={i} value={op.name}> {op.name} </option>
			)
		})


		const selector = (
			<div>
				<form>
					<p>View your expenses by Category
						<select name='query' onChange={this.handleChange}>
							{optionsToInsert}
							<option key='All' value='All' > All </option>
						</select>
					</p>
				</form>
			</div>
		)




		return (
			<div>
				{selector}
			</div>
		);
	}
}



export default ViewByCat