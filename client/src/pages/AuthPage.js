import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
	const { login } = useContext(AuthContext)
	const [form, setForm] = useState({
		email: '',
		password: '',
	})
	const message = useMessage()
	const { loading, error, request, clearError } = useHttp()

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	const changeHandler = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form })
			message(data.message)
		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			login(data.token, data.userId)
		} catch (e) {}
	}

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Reduce link</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Authentication</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Enter mail"
									id="email"
									name="email"
									type="text"
									className="yellow-input"
									value={form.email}
									onChange={changeHandler}
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field">
								<input
									placeholder="Enter password"
									id="password"
									name="password"
									type="password"
									className="yellow-input"
									value={form.password}
									onChange={changeHandler}
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							onClick={loginHandler}
							className="btn yellow darken-4"
							style={{ marginRight: 10 }}
							disabled={loading}
						>
							Log in
						</button>
						<button
							onClick={registerHandler}
							className="btn grey lighten-1 black-text"
							disabled={loading}
						>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
