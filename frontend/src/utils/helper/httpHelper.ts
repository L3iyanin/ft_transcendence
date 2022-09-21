
export const isResNotOk = (res: any) => {
	if (!res.status)
		return false;
	return !(res.status >= 200 && res.status < 300);
}