# Sinai - personal carbon footprint calculator

This is a personal carbon calculator based on the [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

# How to Setup

First you'll need [Node.js](https://nodejs.org/) installed and running on your machine. The second step is to setup the Environment variables in the `.env` file. You can just rename the `.env.example` as the only variable used for now is `URL` which already have a value.

After these steps, in the root folder of the directory, run the following commands:

1. Install PNPM globaly:

   ```
   npm install -g pnpm
   ```

2. Install the project dependencies:

   ```
   pnpm install
   ```

3. Now you should be ready to start the application:

   ```
   pnpm build && pnpm start
   ```

   - To start it in development mode (and auto-reload when changes are made), please use this instead:

     ```
     pnpm dev
     ```

   It should now be acessible at http://localhost:3000/

# Testing

There is an issue with NextJS Typescript and the test setup that I was not able to find a good solution for. In the `tsconfig.json file, NextJS uses `"jsx": "preserve"`, but for the tests to run correctly this value should be changed to "jsx": "react-jsx" first. Do this and then run:

```
pnpm test
```
