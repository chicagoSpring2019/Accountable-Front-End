import React from 'react';
import './index.css';

// send in categories inn props


class ViewByCat extends React.Component {
	constructor(){
		super();
		this.state = {
			options: [],
			catIterator: 0,


		}
	}



	handleSelectChange = async (e) => {
		console.log("--handleSelectChange initiated--");
		this.setState({
			catIterator: e.target.value
		});
	}

	



	render() {
		
		const optionsToInsert = this.props.categories.map((op, i) => {
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