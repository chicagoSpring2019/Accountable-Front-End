import React from 'react';


class CategoryList extends React.Component {
	constructor(props){
		super();
		this.state = {
			categories: this.props,

		}
	}
	componentDidMount(){
		this.forceUpdateHandler()
	}
	forceUpdateHandler() {
		this.forceUpdate()
	}
	render() {
		let categories = this.props.categories
		console.log(categories);

		console.log(this.props);
		const categoryList = this.props.categories.map((cat) => {
			return (
				<li key={cat._id} > {cat} </li> 
			)
		})
		return (
			<div>
				<h4> Categories </h4>
				<ul>
					{categoryList}
				</ul>
			</div>

		)
	}



}


export default CategoryList;