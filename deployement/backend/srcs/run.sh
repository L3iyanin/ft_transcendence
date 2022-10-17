
npx prisma migrate dev --name "init"

npm run seed

npm run build

pm2-runtime /var/www/html/dist/src/main.js --name "backend"