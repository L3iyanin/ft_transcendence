import axios from 'axios';
import { ChannleTypesEnum } from '../../utils/constants/enum';

export const createChannel = (name: string, type: ChannleTypesEnum, password?: string) => {
	return axios.post(`/chat/create-channel`, { name, type, password })
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
};


export const getChannels = () => {
	return axios.get(`/chat`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}

export const getChannelMessages = (channelId: number) => {
	return axios.get(`/chat/${channelId}`)
			.then(res => res.data)
			// .catch(err => console.error(`err`, err))
}

export const joinChannel = (channelId: number, password?: string) => {
	return axios.post(`/chat/join-channel/${channelId}`, { password })
			.then(res => {
				return res.data
			})
			// .catch(err => console.error(`err`, err))
}