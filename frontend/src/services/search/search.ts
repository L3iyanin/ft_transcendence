import axios from "axios";

export const getAllUsers = () => {
	return axios.get("/users/all").then((res) => res.data);
}