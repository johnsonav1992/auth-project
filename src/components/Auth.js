import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

const Auth = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [register, setRegister] = useState(true)
    const [message, setMessage] = useState('')


	const API_URL = 'https://socialmtn.devmountain.com'

	const submitHandler = e => {
		e.preventDefault()

		if (register) {
			axios
				.post(`${API_URL}/register`, {
					username,
					password,
				})
				.then(({ data }) => {
					console.log(data)
                    setMessage('User added!')
                    setTimeout(() => {
                        setMessage('')
                    }, 2000)
				})
                .catch(err => console.error(err))
		} else {
			axios
				.post(`${API_URL}/login`, {
					username,
					password,
				})
				.then(({ data }) => {
					console.log(data)
				})
                .catch(err => console.error(err))
		}

        setUsername('')
        setPassword('')
	}

	return (
		<main>
			<h1>Welcome!</h1>
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
					type="text"
					placeholder="password"
					value={password}
                    onChange={e => setPassword(e.target.value)}
				/>
				<button className="form-btn">
					{register ? 'Sign Up' : 'Login'}
				</button>
                <h3>{message}</h3>
			</form>
			<button
				className="form-btn"
				onClick={() => {
					setRegister(!register)
				}}
			>
				Need to {register ? 'Login' : 'Sign Up'}?
			</button>
			
		</main>
	)
}

export default Auth
