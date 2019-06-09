import React from 'react';



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

		const avgExp = this.props.expenseOldTot.toFixed(2) / this.props.expenses.length.toFixed(2)

		const avgWeeklyTot = []


		return (
			<div>
				Grand total: ${this.props.expenseOldTot.toFixed(2)}
				<p/>
				Average Expense: ${ avgExp.toFixed(2) }
			</div>

		)




	}




}






export default DataManip;