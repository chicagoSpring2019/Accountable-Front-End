import React from 'react';
import './index.css';

class RegisterAndLogin extends React.Component {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			showRegister: false,
			message: '',		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
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
			showRegister: true,
			message:'',
		})
	}

	hideRegisterForm = () => {
		this.clearForm();
		this.setState({
			showRegister: false,
			message: '',
		})
	}

	handleLogin = async (e) => {
		e.preventDefault();
		console.log('--handleLogin() initiated--');
		if (this.state.password === '' || this.state.email === '') {
			this.setState({
				message: "You must input an email and password to login"
			})
		} else {
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
			  	const parsedResponse = await loginResponse.json();
			  	if (parsedResponse.status === 200) {
					this.setState({
						message: "Logging in...",
					})
					await this.props.setActiveUser(parsedResponse.data.email, parsedResponse.data._id);
				} else if (parsedResponse.status === 404) {
					this.setState({
						message: parsedResponse.message
					})
			  	}
			} catch(err) {
			  	console.log(err);
			}
		}
  	}

	handleRegister = async (e) => {
		e.preventDefault();
		console.log('--handleRegister() has been initiated--');
		if (this.state.password.length >= 6) {
			try {
				await this.setState({
					message: "Creating account...",
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
				if(parsedResponse.status === 200) {
					await this.createDefaultCats(parsedResponse.data._id);
					this.props.setActiveUser(parsedResponse.data.email, parsedResponse.data._id);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			console.log("--password was too short--");
			this.setState({
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
					<button className="button"> Log in </button>
					{this.state.message === '' ? noMessage : Message}
				</form>
				<p> Don't have an account? Set one up now! It's free and easy. </p>
				<button onClick={this.showRegisterForm}> Sign up </button>
			</div>
		)

		const Registration = (
			<div>
				<h3 >Registration </h3>
				<form id="register-form" onSubmit={this.handleRegister}>
					Email:
					<input type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
					Password:
					<input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
					<button className="button">Register</button>
					{this.state.message === '' ? noMessage : Message}
				</form>
				<p> You have an account after all? </p>
				<button className="button" onClick={this.hideRegisterForm} > Login </button>
			</div>
		)

		const Note = (
			<h4> Use <i>"email@test.com"</i> and <i>"password"</i> to login to an account with some already established data!</h4>
		)

		return (
			<div>
				{ this.state.showRegister ? Registration : Login }
				{ Note }
			</div>
		);
	}
}



export default RegisterAndLogin;