// IMPORTING LIBRARIES
import React, { useState, useEffect } from 'react';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { getMyInfo } from '../js/fetch_functions';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

export default () => {
	// TODO: user default value with json
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);
	// const [paintings, setPaintings] = useState([]);

	useEffect(() => {
		getMyInfo((resJson) => {
			switch (resJson.error) {
				case ERROR_CODE.OK:
					setUser(resJson.user);
					// setPaintings(resJson.paintings);
					setError(null);
					break;
				default:
					setError(resJson.error);
					break;
			}
			setLoading(false);
		});
	}, [])
	
	return (
		<>
			<h2>My Page</h2>
			{error
			? (
				<h1>{error}</h1>
			) : (
				<>
				{isLoading
				? (
					<h2>loading...</h2>
				) : (
					<div>
						<h5>username: {user.username}</h5>
						<h5>name: {user.name}</h5>
						<h5>email: {user.email}</h5>
						<h5>gender: {user.gender}</h5>
					</div>
				)}
				</>
			)}
			
		</>
	)
}