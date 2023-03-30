# FRONTEND TASK APPLICATION

This project is an example with React for the frontend and Django for the backend.

## Dependencias

* React
* React-router
* Typescript
* Redux-Toolkit
* Tailwind

## Development

### `Requirements`

* [Node.js](https://nodejs.org/en/)
* [VS code](https://code.visualstudio.com/)

on Windows CMD is 'cd' the command:

In your terminal, cmd make a clone of the project:

```cmd
  git clone https://github.com/Rvjonh/TaskFrontend.git
```

```cmd
  cd TaskFrontend
```

Install the dependencies in the package.json with:

>this will install the required packages

```cmd
 npm install
```

> Copy and set the frontend variables (on Windows)

```cmd
  copy .env-copy .env
```

> Set the variables (it's the backend direction)

```env
# API route, in case you're using my backend

VITE_BACKEND_ENDPOINT=http://localhost:8000/api/v1
```

>This will put the frontend to work

```cmd
  npm run dev
```

After this you should start the backend server, or just use the frontend application.
