
if [ ! -d "/ft_transcendence_backend/node_modules" ]
then
	mv /node_modules /ft_transcendence_backend/node_modules
	rm -rf /package.json
fi

npm run start:dev