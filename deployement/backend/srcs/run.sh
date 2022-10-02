
cd prisma && echo $(PWD) && npx prisma migrate dev --name "init" && cd ..

npm run --prefix prisma seed

npm run start