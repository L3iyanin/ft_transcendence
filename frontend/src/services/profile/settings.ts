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