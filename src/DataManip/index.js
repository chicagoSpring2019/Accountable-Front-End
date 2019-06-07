import React from 'react';



class DataManip extends React.Component {
	constructor(props) {
		super();
		this.state = {

		}

	}

	render() {



		return (
			<div>
				Grand total: ${this.props.expenseOldTot.toFixed(2)}
			</div>

		)




	}




}






export default DataManip;