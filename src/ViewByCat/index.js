import React from 'react';
import './index.css';

// send in categories inn props


class ViewByCat extends React.Component {
	constructor(){
		super();
		this.state = {
			options: [],


		}
	}


	retrieval = async (e) => {
		e.preventDefault();


		let cats = [];
		cats = this.props.categories;

		console.log(this.props.categories);
		console.log(cats, "< felines@")
		const all = ({
						_id: 12345,
						name: 'All'
					});
		const categoriesPlusAll = cats.push(all);
		console.log(categoriesPlusAll, "<=== categoriesPlusAll")


		await this.setState({
			options: categoriesPlusAll,
		})




	}





	render() {
		
		const optionsToInsert = this.state.options.map((op, i) => {
			return (
				<div>
				<option key={i} value={i} > {op.name} </option>
				</div>
			)
		})


		const selector = (
			<div>
				<form>
					<p>View your expenses by Category
						<select onClick={this.retrieval} onChange={this.handleSelectChange}>
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