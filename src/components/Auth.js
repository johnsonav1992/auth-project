import { useState, useContext } from 'react'
import axios from 'axios'

import AuthContext from '../store/authContext'

const Auth = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [register, setRegister] = useState(false)
	const [error, setError] = useState('')

	const authCtx = useContext(AuthContext)

	const API_URL = 'http://localhost:4000'

	const submitHandler = e => {
		e.preventDefault()

		axios
			.post(register ? `${API_URL}/register` : `${API_URL}/login`, {
				username,
				password,
			})
			.then(({ data }) => {
				console.log('User added!')
				authCtx.login(data.token, data.sessionExp, data.userId)
			})
			.catch(err => {
				console.error(err)
				setError(err.response.data)
				setTimeout(() => {
					setError('')
				}, 2000)
			})

		setUsername('')
		setPassword('')
	}

	return (
		<main>
			<h1>{!register ? 'Login' : 'Register for an account'}</h1>
			<form className="form auth-form" onSubmit={submitHandler}>
				<input
					className="form-input"
					type="text"
					placeholder="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					className="form-input"
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button className="form-btn">
					{!register ? 'Login' : 'Register'}
				</button>
				{error && <p className='error-msg'>{error}</p>}
			</form>
			<button
				className="form-btn"
				onClick={() => {
					setRegister(!register)
				}}
			>
				Need to {!register ? 'Sign Up? Click Here' : 'Login? Click here'}
			</button>
		</main>
	)
}

export default Auth
