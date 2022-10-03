npm install

npm run build

if [ ! -d "dist/imgs" ]
then
	mv public/imgs/ dist/
fi
