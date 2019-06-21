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


	// componentDidMount() {
	// 	this.setState({
	// 		optionsPlusAll: this.props.categories
	// 	})
	// 	console.log(this.state, "<<<<state in viewby cat");
	// 	console.log(this.props.categories);
	// }





	render() {
		let options = []
		console.log(this.props.categories, "<<< prop categories!!");
		options = this.props.categories;
		const optionsPlusAll = options.push({name: 'all'})
		console.log(optionsPlusAll, "<=== optionsPlusAll");
		// const optionsToInsert = optionsPlusAll.map((op, i) => {
		// 	return (
		// 		<option key={i} value={i} > {op.name} </option>
		// 	)
		// })


							// {optionsToInsert}

		const selector = (
			<div>
				<form>
					<p>View your expenses by Category
						<select onChange={this.handleSelectChange}>
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