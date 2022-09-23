import axios from 'axios';

export const getChannelInfo = (channelId: string) => {
	return axios.get(`/chat/members/${channelId}`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};

export const addFriendToChannel = (channelId: string, friendId: string) => {
	return axios.post(`/chat/add/${friendId}/${channelId}`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}