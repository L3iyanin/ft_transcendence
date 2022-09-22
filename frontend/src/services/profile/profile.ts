import axios from 'axios';

export const getProfileInfo = (userId: string) => {
	return axios.get(`/users/${userId}/info`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};

export const getFriends = (userId: string) => {
	return axios.get(`/users/${userId}/friends`)
		.then(res => res.data)
		// .catch(err => console.error(`err`, err))
};

export const getAchivements = (userId: string) => {
	return axios.get(`/users/${userId}/achievements`)
		.then(res => res.data)
		// .catch(err => console.error(`err`, err))
};

export const addFriend = (userId: string) => {
	return axios.post(`/users/${userId}/add-friend`)
		.then(res => res.data)
		// .catch(err => console.error(`err`, err))
}

export const startChat = (userId: string) => {
	return axios.post(`/chat/start-dm/${userId}`)
		.then(res => res.data)
		// .catch(err => console.error(`err`, err))
}

export const blockUser = (userId: string) => {
	return axios.post(`/chat/block-dm/${userId}`)
		.then(res => res.data)
		// .catch(err => console.error(`err`, err))
}