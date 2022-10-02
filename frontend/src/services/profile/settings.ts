import axios from 'axios';

export const getProfileSettings = () => {
	return axios.get(`/users/my-info`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};

export const updateProfileSettings = (data: any) => {
	return axios.post(`/users/update-profile-image`, data)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}

export const updateUsername = (username: string) => {
	return axios.post(`/users/update-profile-info`, { name: username })
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}

export const enableTwoFactorAuth = () => {
	return axios.post(`users/generate2FA`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}

export const disableTwoFactorAuth = () => {
	return axios.post(`users/disable2Fa`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}