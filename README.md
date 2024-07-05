# Node.js API Project Skeleton

This is a repository that provides a skeleton for a nodeJS API.

I got tired of always redoing the same stuff for my personal projects, so I decided to create this super opinionated skeleton.

It's configured with Express, TypeScript, ESLint, Prettier, and other tools to streamline the development process.

I will continually add new stuff. Hope it helps someone! :)

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Adds static typing to JavaScript, enhancing code quality and understandability.
- **Prisma**: Next-generation ORM for Node.js and TypeScript, making database access easy and type-safe.
- **ESLint**: Linting utility for JavaScript and TypeScript, ensuring code quality and consistency.
- **Prettier**: An opinionated code formatter, enforcing a consistent style across your codebase.
- **.env**: Loads environment variables from a `.env` file into `process.env`, managing configuration separately from code. [Read more](https://nodejs.org/en/blog/release/v20.6.0)
- **Path Aliases**: Custom path aliases using `module-alias` and `typescript` for cleaner and more manageable import paths.
- **Docker**: Containerize the application for easy deployment and scalable production runs.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the repo

- Run the clone script
  - Usage: `sh ./scripts/clone.sh <target-directory> <new-directory-name> `
  - Example: `sh ./scripts/clone.sh ../projects/example my-new-project `
  - You can also make the script executable by using `chmod +x ./scripts/clone.sh`

### Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. You can also create a `.env.prod` file for production settings.

### Build and Run with Docker Compose

Make sure Docker and Docker Compose are installed. Build and start the Docker containers: (this needs .env.prod)

`docker-compose up --build`

This command will build the Docker image and start the application.
Once the containers are running, you can access the API at http://localhost:3333.

### Stop the Containers

`docker-compose down`

#### Local Development

If you prefer to run the application locally without Docker, follow these steps:

`pnpm install`

#### Generate Prisma client:

`npx prisma generate`

#### Build the project:

`pnpm run build`

#### Start the application:

`pnpm run serve`

#### Running in Development Mode

To run the application in development mode with hot-reloading:

`pnpm run dev`
