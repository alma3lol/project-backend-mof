# Project backend (MOF)

Created with [NestJS](https://nestjs.com) + [Prisma](https://prisma.io)

## Follow the steps bellow:

### 1. Create a database user with all permissions
```SQL
CREATE USER 'project'@'localhost' IDENTIFIED BY 'project';
GRANT ALL PRIVILEGES ON *.* TO 'project'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Create `.env` file with the following content
```conf
DATABASE_URL="mysql://project:project@localhost:3306/project"
```

### 3. Execute the following commands in terminal
```bash
npm install
npx prisma migrate dev
npm run start:dev
```