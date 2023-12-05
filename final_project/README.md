# Final Project at Gigarion

## Installation
1. Install pnpm
```bash
npm install -g pnpm
```
2. Install all the package
```bash
pnpm install
```
3. Initialize the database using Docker
- Pull the mysql image from docker hub
```bash
docker pull mysql:8.2.0
```
- Initialize a container
```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your password -d mysql:8.2.0
```
- Access the MYSQL shell
```bash
docker exec -it mysql bash
```
```bash
mysql -u root -p
#then enter your password
```
- Create new database
```sql
CREATE DATABASE 'final'; 
```
- Exit mysql using '\q' and bash using 'exit'
4. Migrate the database
```bash
pnpm db:run
```
5. Seed the pre-define role and permissions
```bash
pnpm seed
```
## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
#### Access the Swagger Documentaion
- You can access at http://localhost:3306/docs