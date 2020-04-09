import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
	const { request, loading } = useHttp()
	const { id } = useParams()
	const [link, setLink] = useState(null)

	const getLink = useCallback(async () => {
		try {
			const data = await request(`/api/link/${id}`)
			setLink(data)
		} catch (e) {}
	}, [id, request])

	useEffect(() => {
		getLink()
	}, [getLink])

	if (loading) {
		return <Loader />
	}

	return <>{link && <LinkCard link={link} />}</>
}
