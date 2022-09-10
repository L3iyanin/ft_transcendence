if [ ! -d "/ft_transcendence_frontend/node_modules" ]
then
	mv /node_modules /ft_transcendence_frontend/node_modules
	rm -rf /package.json
fi

npm start