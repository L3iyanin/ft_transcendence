
npm install

npx prisma migrate dev --name "init"

npm run --prefix prisma seed

npm run start