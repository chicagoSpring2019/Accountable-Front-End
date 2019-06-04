import React from 'react';

class Register extends React.Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
		}
	}

	handleChange = (e) => {
    	this.setState({[e.target.name]: e.target.value});
  	}

  	handleRegister = async (e) => {
    	e.preventDefault();
    	console.log('--handleRegister() has been initiated--');
    	try {
    	  	const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/register',  {
    	    	method: 'POST',
    	    	credentials: 'include',
    	    	body: JSON.stringify(this.state),
    	    	headers: {
    	      		'Content-Type': 'application/json'
    	    	}
    	  	})
    	  	console.log(registerResponse, "<<== registerResponse");
    	  	const parsedResponse = await registerResponse.json();
    	  	console.log(parsedResponse, "<----  parsedResponse");
    	  	if(parsedResponse.status === 200){
    	    	console.log(parsedResponse.data, '<<< parsedResponse.data in handleRegister()');
    	    	this.props.setActiveUserAndLogged(parsedResponse.data.email);
    	  	}
    	} catch (err) {
    	  	console.log(err);
    	}
  	}

  	render() {
  		return (
  			<div>
            	<h3 >Register </h3>
            	<form onSubmit={this.handleRegister}>
            	    Email:
            	    <input type='text' name='email' onChange={this.handleChange}/>
            	    Password:
            	    <input type='password' name='password' onChange={this.handleChange}/>
            	    <button type='sumbit'>Register</button>
            	</form>
        	</div>
  		);
  	}

}



export default Register;