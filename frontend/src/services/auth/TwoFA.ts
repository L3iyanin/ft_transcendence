import axios from 'axios';

export const send2FASecret = (secret: string, userId: string) => {
	return axios.post(`/auth/42/2fa`, {
		secret,
		userId,
	})
			// .then(res => res.data)
		// .catch(err => console.log(err))
};
