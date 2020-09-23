---
title: Initial setup
description: How to run the project locally when you clone it the first time.
---

## Environment

To successfully start a local version of the project, you will need.

- The latest version of [Docker](https://www.docker.com/get-started) (tested on Docker 19).
- The latest version of Node.js and npm (tested on Node 12 and npm 6).

## Initialization steps

If you have the environment specified above, you need to.

### 1. Install dependencies

To install all project dependencies, you can run `npm install` from the project's root directory. It contains post-install scripts that will install dependencies for the server and the client.

### 2. Use Docker to run a local database

Go to the `/server` directory and run `docker-compose up -d`. It should start a local PostgreSQL database. If you plan to use some database management tool, DB URL will be `postgresql://root:root@localhost:5432/codersboard-db`.

### 3. Set up local environment variables

In `/client` and `/server` folders, you can find files called `env.template`. Copy each of them and rename copies to `.env`. It will give you nearly complete environment variables setup.

### 4. Create a Cloudinary account

After setup from the previous point, the only empty key will be CLOUDINARY_URL in the `/server/.env`. To obtain the URL, you need to create a free [Cloudinary Account](https://cloudinary.com) and copy your URL by clicking the button shown below.

![How to obtain Cloudinary URL](/cloudinary-url.png)

### 5. Configure HTTPS locally

To make our local and production environment similar in terms of security, we decided always to run them with HTTPS. To configure it locally, you will need to [install mkcert](https://mkcert.dev) and run the following commands from the root directory

```bash
# Create .cert directory if it doesn't exist
mkdir -p .cert

# Generate the certificate (run from the root of this project)
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

### 6. Seed the database

For now, your app wouldn't look too lovely as you don't have any data in your database. To fill the DB, you need to run `npm run seed` from your project's root.

### 7. You are ready to go 🥳

As you completed the entire setup, you can start the app. To do it, use the `npm start:dev` from the `/server` directory and then (in a separate terminal) the `npm start` from the `/client` directory.
