import React from 'react';


class CategoryList extends React.Component {
	constructor(props){
		super();
		this.state = {
			categories: this.props,

		}
	}
	
	render() {
		let categories = this.props.categories
		console.log(categories, "<< categories in CategoryList.js");

		console.log(this.props, "<<<< this.props in CategoryList.js");
		const categoryList = categories.map((cat) => {
			return (
				<li key={cat._id} > {cat.name} </li> 
			)
		})

				//<ul>
				//	{categoryList}
				//</ul>

		return (
			<div>
				<button> Create new Category </button>
			</div>

		)
	}



}


export default CategoryList;