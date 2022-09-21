import axios from 'axios';

export const getMyProfile = () => {
	return axios.get(`/users/my-info`)
			.then(res => res.data)
		// .catch(err => console.log(err))
};