import axios from 'axios';

export const auth42 = (code: string) => {
	return axios.get(`/auth/42?code=${code}`)
			.then(res => res.data)
		// .catch(err => console.log(err))
};
