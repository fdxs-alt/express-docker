# express-docker
### Techstack:
1. React
2. Express
3. Chakra-ui
4. mySql
5. Sequilize - ORM provider
6. Docker
7. Redis - session provider
8. Apollo Graphql - client & server
### Features:
1. Login/register/logout
2. Sessions with redis
3. Note crud. Note created as plain text but displayed as markdown
4. API Gateway created with Graphql
### How to run app:
1. Clone the repo
2. cd ./express-docker
3. Install all dependencies in all folders
4. In main dir mkdir env && cd env && touch users.env notes.env redis.env
5. Add following env vars into those .env files:  
    1. users.env: DATABASE_URL
    2. notes.env: DATABASE_URL
    3. redis.env: REDIS_SECRET
6. cd .. && docker-compose up
