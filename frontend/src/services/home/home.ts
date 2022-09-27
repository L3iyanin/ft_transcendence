import axios from 'axios';

export const getLeaderboard = () => {
	return axios.get(`/users/leaderboard`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};

export const getLiveMatches = () => {
	return axios.get(`/game/live-matches`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};

export const getLastMatches = (userId: number, countOfMatches: number = 10) => {
	return axios.get(`/game/last-matches/${countOfMatches}/${userId}`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};
