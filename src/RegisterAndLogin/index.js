import React from 'react';
import './index.css';

class RegisterAndLogin extends React.Component {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			showRegister: false,
			message: '',
			showMessage: false,
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	showMessage = () => {
		console.log(" ");
		this.setState({
			showMessage: true
		})
	}

	clearForm = () => {
		this.setState({
			email: '',
			password: '',
		})
	}

	showRegisterForm = () => {
		this.clearForm();
		this.setState({
			showRegister: true
		})
	}

	hideRegisterForm = () => {
		this.clearForm();
		this.setState({
			showRegister: false,
			showMessage: false,
		})
	}

	handleLogin = async (e) => {
		e.preventDefault();
		console.log('--handleLogin() initiated--');
		this.showMessage();
		try {
			const bodyToSend = {
				email: this.state.email,
				password: this.state.password
			}

		  	const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/login', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(bodyToSend),
				headers: {
				  	'Content-Type': 'application/json'
				}
		  	});
		  	this.clearForm();
		  	console.log(loginResponse, "<<--- loginResponse");
		  	const parsedResponse = await loginResponse.json();
		  	console.log(parsedResponse, "<=-=-= parsedResponse");
		  	if (parsedResponse.status === 200) {
				this.setState({
					showMessage: true,
					message: "Logging in...",
				})
				await this.props.setActiveUserEmailAndLogged(parsedResponse.data.email);
				this.props.setActiveUserId(parsedResponse.data._id);
			} else if (parsedResponse.status === 404) {
				console.log(parsedResponse.message, '<<< parsedResponse.message in handleLogin()');
				this.setState({
					showMessage: true,
					message: parsedResponse.message
				})
		  	}
		} catch(err) {
		  	console.log(err);
		}
  	}

	handleRegister = async (e) => {
		e.preventDefault();
		console.log('--handleRegister() has been initiated--');
		if (this.state.password.length >= 6) {
			try {
				await this.setState({
					message: "Creating account...",
					showMessage: true,
				})
				const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/register',  {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				this.clearForm();
				const parsedResponse = await registerResponse.json();
				console.log(parsedResponse, "<----  parsedResponse in handleRegister()");
				if(parsedResponse.status === 200) {
					await this.createDefaultCats(parsedResponse.data._id);
					this.props.setActiveUserEmailAndLogged(parsedResponse.data.email);
					this.props.setActiveUserId(parsedResponse.data._id);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log("--password was too short--");
			this.setState({
				showMessage: true,
				message: "You're password must be six characters in length or more"
			})
		}
	}

	createDefaultCats = async (id) => {
		const cats = [
			{
			name: 'Groceries'
			}, {
			name: "Eating out"
			}, {
			name: "Gasoline"
		}]
		const catsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + "category/user/" + id, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(cats),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsedCatsResponse = await catsResponse.json()
		console.log(parsedCatsResponse, "<<<< parsedCats in REg and Login .js");

	}

	render() {
		const Message = (
			<p className="message">
				{this.state.message}
			</p>
		)

		const noMessage = (
			<p className="noMessage"/>
		)

		const Login = (
			<div>
				<h3> Login </h3>
				<form id="login-form" onSubmit={this.handleLogin}>
					Email:
					<input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
					Password:
					<input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
					<button> Log in </button>
					{this.state.showMessage ? Message : noMessage}
				</form>
				<p> Don't have an account? Set one up now! It's free and easy. </p>
				<button onClick={this.showRegisterForm}> Sign up </button>
			</div>
		)

		const Registration = (
			<div>
				<h3 >Registration </h3>
				<form id="register-form" onSubmit={this.handleRegister}>
					<div className="logForm">
						Email:
						<input type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
					</div>

					<div className="logForm">
						Password:
						<input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
					<button type='sumbit'>Register</button>
					</div>
					{this.state.showMessage ? Message : noMessage}
				</form>
				<p> You have an account after all? </p>
				<button onClick={this.hideRegisterForm} > Login </button>
			</div>
		)

		return (
			<div>
				{ this.state.showRegister ? Registration : Login }
			</div>
		);
	}
}



export default RegisterAndLogin;