import React from 'react';
import './index.css';

class ViewByCat extends React.Component {
	constructor(){
		super();
		this.state = {
			query: 0,
			catTot: 0,
			catAvg: 0,
			queryOccured: false,
		}
	}


	handleChange = async (e) => {
		await this.setState({[e.target.name]: e.target.value});
		await this.props.retrieveExpensesByQuery(this.state.query);
		this.getTotAndAvg();
	}

	getTotAndAvg = () => {
		let queried = [];
		const all = this.props.expenses
		for(let i = 0; i < all.length; i++ ) {
			if (all[i].category.name === this.state.query) {
				queried.push(all[i]);
			}
		}
		console.log(all, "<<< all <<<")
		let catTot = 0
		const length = queried.length
		for (let i = 0; i < length; i++ ) {
			catTot += queried[i].amount;
		}
		const catAvg = (catTot / queried.length)
		this.setState({
			catTot: catTot,
			catAvg: catAvg,
			queryOccured: true,
		})
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

		const avgAndTot = (
			<div className="ExpenseInfoByCat">
				<p>Category Total: {this.state.catTot.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 } ) } </p>
				<br/>
				<p>Average expense amount for category: {this.state.catAvg.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 } ) }</p>
			</div>
		)



		return (
			<div className="ViewByCat">
				{selector}

				<div className="ViewByCat">
					{ this.state.queryOccured ? avgAndTot : null }
				</div>
			</div>
		);
	}
}



export default ViewByCat