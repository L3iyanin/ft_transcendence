import axios from 'axios';

export const getProfileInfo = (userId: string) => {
	return axios.get(`/users/${userId}/info`)
			.then(res => res.data)
			.catch(err => console.log(`err`, err))
};

export const getFriends = () => {
	return axios.get(`/users/my-info`)
		.then(res => res.data)
		.catch(err => console.log(`err`, err))
};