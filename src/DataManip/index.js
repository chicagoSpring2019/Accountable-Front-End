import React from 'react';
import './index.css';




class DataManip extends React.Component {
	constructor(props) {
		super();
		this.state = {

		}

	}

	render() {

		const categoryList = this.props.categories.map((cat, i) => {
			return (
				<p key={i}> {cat.name} </p>
			)
		})

		const avgExp = this.props.expenseTot.toFixed(2) / this.props.expenses.length.toFixed(2)

		const avgWeeklyTot = []


		return (
			<div>
				<p className="figure">
					Grand total: {this.props.expenseTot.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 } ) }
				</p>
				<p className="figure">
					Average Expense: { avgExp === NaN ? 0 : avgExp.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 } ) } 
				</p>
			</div>

		)




	}




}






export default DataManip;