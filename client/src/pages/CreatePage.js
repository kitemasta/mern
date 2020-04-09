import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
	const history = useHistory()
	const { request } = useHttp()
	const [link, setLink] = useState('')

	const pressHandler = async (event) => {
		if (event.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'POST', { from: link })
				history.push(`/detail/${data.link._id}`)
			} catch (e) {}
		}
	}

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input
						placeholder="Enter link"
						id="link"
						type="text"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
					<label htmlFor="link">Enter Link</label>
				</div>
			</div>
		</div>
	)
}
