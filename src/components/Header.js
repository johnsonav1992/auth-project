import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import logo from '../assets/dm-logo-white.svg'
import AuthContext from '../store/authContext'

const Header = () => {
	const authCtx = useContext(AuthContext)
	const navigate = useNavigate()

	const styleActiveLink = ({ isActive }) => {
		return {
			color: isActive ? '#f57145' : '',
		}
	}

	return (
		<header className="header flex-row">
			<div className="flex-row">
				<img src={logo} alt="dm-logo" className="logo" />
				<h2>Social Mountain</h2>
			</div>
			<nav>
				{authCtx.token ? (
					<ul className="main-nav">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="profile">Profile</NavLink>
						</li>
						<li>
							<NavLink to="form">Add Post</NavLink>
						</li>
						<li>
							<button
								className="logout-btn"
								onClick={() => {
									authCtx.logout()
									navigate('/auth')
								}}
							>
								Logout
							</button>
						</li>
					</ul>
				) : (
					<ul className="main-nav">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/auth">Login or Sign Up</NavLink>
						</li>
					</ul>
				)}
			</nav>
		</header>
	)
}

export default Header
