import React from 'react';
import './index.css';

// send in categories inn props


class ViewByCat extends React.Component {
	constructor(){
		super();
		this.state = {
			optionsPlusAll: []
		}
	}


	componentDidMount() {
		this.setState({
			optionsPlusAll: this.props.categories
		})
		console.log(this.state, "<<<<state in viewby cat");
		console.log(this.props.categories);
	}





	render() {

		const optionsToInsert = this.state.optionsPlusAll.map((op, i) => {
			// optionsToInsert.push({name: 'all'})
			return (
				<option key={i} value={i} > {op.name} </option>
			)
		})



		const selector = (
			<div>
				<form>
					<p>View your expenses by Category
						<select onChange={this.handleSelectChange}>
							{optionsToInsert}
						</select>
					</p>
					<button>Filter</button>
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