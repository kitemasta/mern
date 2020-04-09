import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

export const Navbar = () => {
	const { logout } = useContext(AuthContext)
	const history = useHistory()
	const logoutHandler = (event) => {
		event.preventDefault()
		logout()
		history.push('/')
	}

	return (
		<nav>
			<div className="nav-wrapper" style={{ padding: '0 2rem' }}>
				<span className="brand-logo">Save Links</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/create">Create</NavLink>
					</li>
					<li>
						<NavLink to="/links">Links</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHandler}>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}
