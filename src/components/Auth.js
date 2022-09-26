import { useState, useContext } from 'react'
import axios from 'axios'

import AuthContext from '../store/authContext'

const Auth = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [register, setRegister] = useState(true)
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const [isFocused, setIsFocused] = useState(false)

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
				console.log(data)
				setMessage('User added!')
				setTimeout(() => {
					setMessage('')
				}, 2000)
				authCtx.login(data.token, data.exp, data.userId)
			})
			.catch(err => {
				console.error(err)
				if (register) {
					setError('Could not register - user already exists!')
				} else setError('Could not login!')
				setTimeout(() => {
					setError('')
				}, 2000)
			})

		setUsername('')
		setPassword('')
	}

	return (
		<main>
			<h1>{register ? 'Register for an Account' : 'Login'}</h1>
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
					{register ? 'Sign Up' : 'Login'}
				</button>
				{error && <p className='error-msg'>{error}</p>}
				<h3>{message}</h3>
			</form>
			<button
				className="form-btn"
				onClick={() => {
					setRegister(!register)
				}}
			>
				Need to {register ? 'Login? Click Here' : 'Sign Up? Click Here'}
			</button>
		</main>
	)
}

export default Auth
