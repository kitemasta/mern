import React, { useState, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export const LinksPage = () => {
	const { request, loading } = useHttp()
	const [links, setLinks] = useState([])

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request('/api/link')

			setLinks(fetched)
		} catch (e) {}
	}, [request])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	if (loading) {
		return <Loader />
	}

	return <>{links && <LinksList links={links} />}</>
}
