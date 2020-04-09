import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../context/auth.context'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { isAuthenticated, token } = useContext(AuthContext)
	const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setLoading(true)
		try {
			if (isAuthenticated) {
				headers['Authorization'] = `Bearer ${token}`
			}

			if (body) {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}

			const response = await fetch(url, { method, body, headers })
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || 'Something went wrong')
			}

			setLoading(false)

			return data
		} catch (e) {
			setLoading(false)
			setError(e.message)
			throw e
		}
	}, [])

	const clearError = useCallback(() => setError(null), [])

	return {
		loading,
		request,
		error,
		clearError,
	}
}
